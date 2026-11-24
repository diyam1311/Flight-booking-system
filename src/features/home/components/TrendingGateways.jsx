import { gateways } from '../data/homeData'

function Card({ g }) {
  // 12-column grid on desktop: big cards span 6, small cards span 3 (cards are 320px tall)
  return (
    <article className={`group relative h-[260px] overflow-hidden rounded-xl bg-slate-300 lg:h-[320px] ${g.size === 'lg' ? 'lg:col-span-6' : 'lg:col-span-3'}`}>
      {/* ADD IMAGE HERE → public/images/gateways/<name>.jpg (path is set in data/homeData.js) */}
      <img src={g.image} alt={g.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">{g.region}</p>
          <h3 className="text-lg font-bold">{g.name}</h3>
          <p className="truncate text-[11px] text-white/70">{g.note}</p>
        </div>
        {g.size === 'lg' ? (
          <div className="shrink-0 rounded-xl bg-black/55 px-4 py-2.5 text-center backdrop-blur">
            <p className="text-[10px] text-white/80">Fares from</p>
            <p className="text-lg font-bold text-emerald-300">{g.price}</p>
          </div>
        ) : (
          <p className="shrink-0 text-base font-bold text-emerald-300">{g.price}</p>
        )}
      </div>
    </article>
  )
}

export default function TrendingGateways() {
  // Figma: section padding 60 top / 97 bottom, heading row 64, gaps 16, grid gaps 24 x 16
  return (
    <section className="pb-6 lg:pb-[97px] lg:pt-[60px]">
      <div className="flex flex-wrap items-end justify-between gap-2 lg:h-16">
        <div>
          <h2 className="text-3xl font-bold leading-9 text-brand">Trending Gateways</h2>
          <p className="mt-1 text-[13px] text-slate-500">Direct daily flights to seasonal domestic favorites with exclusive early-bird perks.</p>
        </div>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold"><span className="h-1.5 w-1.5 rounded-full bg-emerald-700" /> Lowest Fare Guarantee</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-12">
        {gateways.map((g) => <Card key={g.name} g={g} />)}
      </div>
    </section>
  )
}
