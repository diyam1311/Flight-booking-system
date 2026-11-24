// The barcode of the e-ticket is only a picture (it cannot be scanned).
// The thickness of its bars comes from the characters of the ticket number, so every ticket looks different.
// -> [{ top: 0, height: 4 }, { top: 7, height: 3 }, ...]  (bars lying on top of each other, from top to bottom)
export function barcodeBars(value, totalHeight) {
  const bars = []
  let top = 0
  for (let i = 0; top < totalHeight; i++) {
    const code = value.charCodeAt(i % value.length) + i * 7
    const height = Math.min(2 + (code % 4), totalHeight - top) // bar: 2 to 5 high
    bars.push({ top, height })
    top += height + 2 + (code % 3) // space after the bar: 2 to 4
  }
  return bars
}
