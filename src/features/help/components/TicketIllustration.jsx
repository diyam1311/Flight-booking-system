// Small drawing of two boarding passes for the "Manage your booking" banner.
// It is a plain SVG, so no image file is needed. To use your own picture, replace this component with an <img>.
export default function TicketIllustration() {
  return (
    <svg viewBox="0 0 138 100" className="h-[100px] w-[138px]" aria-hidden="true">
      {/* shadow on the floor */}
      <ellipse cx="66" cy="90" rx="46" ry="2.5" fill="#000" opacity="0.07" />
      {/* red ticket behind */}
      <g transform="rotate(-10 66 46)">
        <rect x="10" y="30" width="112" height="44" rx="4" fill="#F0542D" />
      </g>
      {/* main ticket */}
      <g transform="rotate(-12 66 44)">
        <rect x="14" y="20" width="110" height="46" rx="4" fill="#F4F6FB" />
        <rect x="14" y="20" width="110" height="8" rx="3" fill="#2C4F8A" />
        <rect x="14" y="58" width="110" height="8" rx="3" fill="#2C4F8A" />
        {/* plane */}
        <g transform="translate(38 32) scale(0.62)" fill="#2C4F8A">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
        </g>
        {/* text lines */}
        <rect x="20" y="34" width="14" height="2.5" rx="1.2" fill="#B8C0CF" />
        <rect x="20" y="40" width="14" height="2.5" rx="1.2" fill="#B8C0CF" />
        <rect x="20" y="46" width="10" height="2.5" rx="1.2" fill="#B8C0CF" />
        {/* ticket stub */}
        <rect x="100" y="34" width="14" height="10" rx="2" fill="#C3C8D2" />
        <rect x="100" y="47" width="14" height="8" rx="2" fill="#C3C8D2" />
      </g>
    </svg>
  )
}
