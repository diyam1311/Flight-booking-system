import airlines from '../assets/airlines.svg'

// Static strip (as in Figma): 1592 x 48, centred so it bleeds past both edges.
export default function AirlineStrip() {
  return (
    <div className="relative mb-8 mt-2 h-12 overflow-hidden lg:mb-[58px] lg:mt-5">
      <img loading="lazy" decoding="async" src={airlines} alt="Partner airlines" className="absolute left-1/2 top-0 h-12 w-auto max-w-none -translate-x-1/2" />
    </div>
  )
}
