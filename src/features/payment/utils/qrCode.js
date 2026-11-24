// A small QR code generator, so the page needs no extra package.
//   makeQrCode("any text") -> grid of true / false  (true = dark square), ready to be drawn.
// It makes standard QR codes (byte mode, error correction level M, versions 1-10 = up to 213 characters),
// so phone cameras and UPI apps can scan them.

// Level M data for versions 1..10: error-correction bytes per block, and number of blocks
const EC_BYTES_PER_BLOCK = [0, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26]
const BLOCKS = [0, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5]

export function makeQrCode(text) {
  const bytes = Array.from(new TextEncoder().encode(text))

  // 1. the smallest version (size) that can hold the text
  let version = 1
  while (version <= 10 && dataBytesOf(version) < bytes.length + (version < 10 ? 2 : 3)) version++
  if (version > 10) throw new Error('Text is too long for this QR generator')

  // 2. text -> data bytes -> add error-correction bytes
  const codewords = addErrorCorrection(toDataBytes(bytes, version), version)

  // 3. draw the fixed patterns, place the bytes, then pick the best of the 8 masks
  const size = version * 4 + 17
  const grid = Array.from({ length: size }, () => Array(size).fill(false))
  const fixed = Array.from({ length: size }, () => Array(size).fill(false)) // true = not for data
  drawFixedPatterns(grid, fixed, version)
  placeData(grid, fixed, codewords)

  let best = null
  for (let mask = 0; mask < 8; mask++) {
    const candidate = grid.map((row) => row.slice())
    applyMask(candidate, fixed, mask)
    drawFormat(candidate, mask)
    const score = penalty(candidate)
    if (!best || score < best.score) best = { candidate, score }
  }
  return best.candidate
}

// ---- sizes ----
function rawModules(version) {
  let n = (16 * version + 128) * version + 64
  if (version >= 2) {
    const align = Math.floor(version / 7) + 2
    n -= (25 * align - 10) * align - 55
  }
  if (version >= 7) n -= 36
  return n
}
const dataBytesOf = (version) => Math.floor(rawModules(version) / 8) - EC_BYTES_PER_BLOCK[version] * BLOCKS[version]

// ---- data bytes: mode (0100) + length + text + end + padding ----
function toDataBytes(bytes, version) {
  const bits = []
  const push = (value, length) => { for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1) }
  push(0b0100, 4)
  push(bytes.length, version < 10 ? 8 : 16)
  bytes.forEach((b) => push(b, 8))

  const capacity = dataBytesOf(version) * 8
  push(0, Math.min(4, capacity - bits.length))
  push(0, (8 - (bits.length % 8)) % 8)
  for (let pad = 0xec; bits.length < capacity; pad ^= 0xec ^ 0x11) push(pad, 8)

  const data = []
  for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2))
  return data
}

// ---- error correction (Reed-Solomon) ----
function multiply(x, y) {
  let z = 0
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d)
    z ^= ((y >>> i) & 1) * x
  }
  return z
}

function remainder(data, degree) {
  const divisor = Array(degree).fill(0)
  divisor[degree - 1] = 1
  let root = 1
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      divisor[j] = multiply(divisor[j], root)
      if (j + 1 < degree) divisor[j] ^= divisor[j + 1]
    }
    root = multiply(root, 0x02)
  }
  const result = Array(degree).fill(0)
  data.forEach((b) => {
    const factor = b ^ result.shift()
    result.push(0)
    divisor.forEach((coef, i) => { result[i] ^= multiply(coef, factor) })
  })
  return result
}

// splits the data into blocks, adds error bytes to each, then mixes the blocks together
function addErrorCorrection(data, version) {
  const blocks = BLOCKS[version]
  const ecLength = EC_BYTES_PER_BLOCK[version]
  const raw = Math.floor(rawModules(version) / 8)
  const shortBlocks = blocks - (raw % blocks)
  const shortLength = Math.floor(raw / blocks)

  const parts = []
  let start = 0
  for (let i = 0; i < blocks; i++) {
    const length = shortLength - ecLength + (i < shortBlocks ? 0 : 1)
    const block = data.slice(start, start + length)
    start += length
    parts.push({ block, ec: remainder(block, ecLength) })
  }

  const result = []
  for (let i = 0; i <= shortLength - ecLength; i++) parts.forEach(({ block }) => { if (i < block.length) result.push(block[i]) })
  for (let i = 0; i < ecLength; i++) parts.forEach(({ ec }) => result.push(ec[i]))
  return result
}

// ---- drawing ----
function drawFixedPatterns(grid, fixed, version) {
  const size = grid.length
  const set = (r, c, dark) => { if (r >= 0 && c >= 0 && r < size && c < size) { grid[r][c] = dark; fixed[r][c] = true } }

  // timing lines
  for (let i = 0; i < size; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0) }

  // three big corner squares (with their white border)
  const finder = (cr, cc) => {
    for (let dr = -4; dr <= 4; dr++) for (let dc = -4; dc <= 4; dc++) {
      set(cr + dr, cc + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 2 && Math.max(Math.abs(dr), Math.abs(dc)) !== 4)
    }
  }
  finder(3, 3); finder(3, size - 4); finder(size - 4, 3)

  // small squares in the middle of bigger codes
  const count = Math.floor(version / 7) + 2
  const step = version === 1 ? 0 : Math.ceil((version * 4 + 4) / (count * 2 - 2)) * 2
  const positions = version === 1 ? [] : [6]
  for (let pos = version * 4 + 10; positions.length < count && version > 1; pos -= step) positions.splice(1, 0, pos)
  positions.forEach((r, i) => positions.forEach((c, j) => {
    if ((i === 0 && j === 0) || (i === 0 && j === count - 1) || (i === count - 1 && j === 0)) return
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) set(r + dr, c + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1)
  }))

  // version number (version 7 and up) and the always-dark square
  if (version >= 7) {
    let rem = version
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25)
    const bits = (version << 12) | rem
    for (let i = 0; i < 18; i++) {
      const dark = ((bits >>> i) & 1) !== 0
      const a = size - 11 + (i % 3)
      const b = Math.floor(i / 3)
      set(a, b, dark); set(b, a, dark)
    }
  }
  set(size - 8, 8, true)

  // reserve the format-info places (written after the mask is chosen)
  for (let i = 0; i < 9; i++) { fixed[8][i] = true; fixed[i][8] = true }
  for (let i = 0; i < 8; i++) { fixed[8][size - 1 - i] = true; fixed[size - 1 - i][8] = true }
}

// bytes go in a zig-zag, two columns at a time, from the bottom-right corner
function placeData(grid, fixed, codewords) {
  const size = grid.length
  let bit = 0
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const c = right - j
        const r = ((right + 1) & 2) === 0 ? size - 1 - vert : vert
        if (!fixed[r][c] && bit < codewords.length * 8) {
          grid[r][c] = ((codewords[bit >>> 3] >>> (7 - (bit & 7))) & 1) !== 0
          bit++
        }
      }
    }
  }
}

const MASKS = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
]

function applyMask(grid, fixed, mask) {
  grid.forEach((row, r) => row.forEach((_, c) => { if (!fixed[r][c] && MASKS[mask](r, c)) grid[r][c] = !grid[r][c] }))
}

// format info = error level M (00) + mask number, protected by its own error bits
function drawFormat(grid, mask) {
  const size = grid.length
  let rem = mask
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537)
  const bits = ((mask << 10) | rem) ^ 0x5412
  const bit = (i) => ((bits >>> i) & 1) !== 0

  for (let i = 0; i <= 5; i++) grid[i][8] = bit(i)
  grid[7][8] = bit(6); grid[8][8] = bit(7); grid[8][7] = bit(8)
  for (let i = 9; i < 15; i++) grid[8][14 - i] = bit(i)
  for (let i = 0; i < 8; i++) grid[8][size - 1 - i] = bit(i)
  for (let i = 8; i < 15; i++) grid[size - 15 + i][8] = bit(i)
  grid[size - 8][8] = true
}

// lower is better: penalises long runs, 2x2 blocks, finder-like patterns and uneven dark/light balance
function penalty(grid) {
  const size = grid.length
  let score = 0
  const lines = []
  for (let i = 0; i < size; i++) {
    lines.push(grid[i])
    lines.push(grid.map((row) => row[i]))
  }
  lines.forEach((line) => {
    let run = 1
    for (let i = 1; i <= size; i++) {
      if (i < size && line[i] === line[i - 1]) run++
      else { if (run >= 5) score += run - 2; run = 1 }
    }
    const text = line.map((d) => (d ? '1' : '0')).join('')
    score += 40 * ((text.match(/(?=10111010000|00001011101)/g) || []).length)
  })
  for (let r = 0; r < size - 1; r++) for (let c = 0; c < size - 1; c++) {
    if (grid[r][c] === grid[r][c + 1] && grid[r][c] === grid[r + 1][c] && grid[r][c] === grid[r + 1][c + 1]) score += 3
  }
  const dark = grid.flat().filter(Boolean).length
  score += Math.floor(Math.abs((dark * 20) / (size * size) - 10)) * 10
  return score
}
