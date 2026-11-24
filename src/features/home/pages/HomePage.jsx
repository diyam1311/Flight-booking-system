import Hero from '../components/Hero'
import PopularRoutes from '../components/PopularRoutes'
import TrendingGateways from '../components/TrendingGateways'
import AirlineStrip from '../components/AirlineStrip'
import LastMinuteDeals from '../components/LastMinuteDeals'
import TrustStrip from '../components/TrustStrip'
import worldMap from '@/assets/images/world-map.png'
import doodleLoop from '../assets/doodle-loop.png'

export default function HomePage() {
  return (
    <main className="relative">
      {/* Decorative layer, positioned on the 1440px Figma frame (centred on wider screens) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-[1440px]">
        {/* dotted world map: 532px wide, flush with the right edge */}
        <img src={worldMap} alt="" className="absolute right-0 top-[642px] hidden w-[532px] lg:block" />
        {/* orange loop arrow left of "Popular Daily Routes" (x 3, y 803 in Figma) */}
        <img src={doodleLoop} alt="" className="absolute left-[3px] top-[727px] hidden w-[72px] min-[1440px]:block" />
      </div>

      <Hero />
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-6 px-4 md:px-6 lg:gap-[37px] xl:px-0">
        <PopularRoutes />
        <TrendingGateways />
      </div>
      <AirlineStrip />
      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-4 md:px-6 xl:px-0">
        <LastMinuteDeals />
        <TrustStrip />
      </div>
    </main>
  )
}
