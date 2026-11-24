import heroImg from '../assets/hero.jpg'
import SearchCard from './SearchCard'

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1388px] px-4 pt-6 md:px-6">
      {/* Hero image: 1340 x 549, radius 20 */}
      <div className="relative h-[380px] overflow-hidden rounded-[20px] md:h-[549px]">
        {/* Figma flips this photo left-to-right (mirror), sky on top */}
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[center_7%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent" />
        <div className="relative px-6 pt-10 text-white md:pl-[77px] md:pt-[98px]">
          <h1 className="text-4xl font-medium leading-tight md:text-[76px] md:leading-[82px]">
            Fly Anywhere<br />across <span className="text-brand">India.</span>
          </h1>
          <p className="mt-[5px] text-xs text-white/70 md:text-[15px] md:leading-[27px]">
            Lowest fares · Zero hidden fees · Instant confirmation
          </p>
        </div>
      </div>

      {/* Tabs + search card start 181px above the bottom edge of the image (Figma) */}
      <div className="relative z-10 -mt-24 md:-mt-[181px]">
        <SearchCard />
      </div>
    </section>
  )
}
