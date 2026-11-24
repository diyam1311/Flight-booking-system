// Draws a QR code made by makeQrCode() (utils/qrCode.js) as a crisp image, with a white border around it.
export default function QrCode({ grid, className = '' }) {
  const size = grid.length
  const border = 1 // empty white squares around the code (the white card around it adds more space, so scanners can still find it)

  return (
    <svg
      viewBox={`${-border} ${-border} ${size + border * 2} ${size + border * 2}`}
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label="Payment QR code"
    >
      <rect x={-border} y={-border} width={size + border * 2} height={size + border * 2} fill="#fff" />
      {grid.map((cells, row) =>
        cells.map((dark, col) => dark && <rect key={`${row}-${col}`} x={col} y={row} width="1" height="1" fill="#000" />)
      )}
    </svg>
  )
}
