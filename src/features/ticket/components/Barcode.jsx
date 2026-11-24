import { barcodeBars } from '../utils/barcode'

// The picture of a barcode on the boarding pass (Figma: 64 x 181). It is only decoration, it cannot be scanned.
export default function Barcode({ value, width = 64, height = 181 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Ticket number ${value}`}>
      {barcodeBars(value, height).map((bar) => (
        <rect key={bar.top} x="0" y={bar.top} width={width} height={bar.height} fill="#0F172A" />
      ))}
    </svg>
  )
}
