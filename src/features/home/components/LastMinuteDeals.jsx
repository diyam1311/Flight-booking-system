import { Plane, Clock3, ChevronDown, Armchair } from 'lucide-react'
import { deals } from '../data/homeData'
import doodleS from '../assets/doodle-s.png'

function DealCard({ d }) {
  // Figma card: 604 x ~360, radius 20, border #E2E8F0, shadow 0 20 40 5%
  return (
    <article className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)] md:p-7">
      <header className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-orange-100 bg-orange-50 text-brand"><Plane size={16} /></span>
          <div>
            <p className="text-[13px] font-bold leading-4 text-brand">{d.airline}</p>
            <p className="text-[10px] text-slate-400">{d.plane}</p>
          </div>
        </div>
        <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">{d.seats}</span>
      </header>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-5 md:mt-[34px] md:h-[124px] md:px-6">
        <div>
          <p className="text-[26px] font-bold leading-8 text-brand">{d.from}</p>
          <p className="text-[10px] font-bold">{d.fromCity}</p>
          <p className="mt-1 text-[11px] font-bold">{d.dep}</p>
          <p className="text-[9px] text-slate-400">{d.depDate}</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
            <Clock3 size={10} className="text-brand" /> {d.duration}
          </span>
          <div className="flex w-full items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-navy" />
            <span className="h-px flex-1 bg-brand/60" />
            <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-white"><Plane size={10} /></span>
            <span className="h-px flex-1 bg-slate-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
          <span className="text-[9px] font-bold text-brand">NON-STOP DIRECT</span>
        </div>
        <div className="text-right">
          <p className="text-[26px] font-bold leading-8 text-brand">{d.to}</p>
          <p className="text-[10px] font-bold">{d.toCity}</p>
          <p className="mt-1 text-[11px] font-bold">{d.arr}</p>
          <p className="text-[9px] text-slate-400">{d.arrDate}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6 md:mt-[37px] md:pt-7">
        <span className="flex items-center gap-2 text-[10px] font-bold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100"><Armchair size={13} /></span> {d.cabin}
        </span>
        <span className="text-[9px] text-slate-400">from <b className="ml-1 text-[22px] text-brand">{d.price}</b></span>
        <button className="flex items-center gap-1 text-[10px] font-bold">Flight Details <ChevronDown size={12} /></button>
      </div>
    </article>
  )
}

export default function LastMinuteDeals() {
  return (
    <section className="relative flex flex-col gap-8">
      {/* Orange doodle straddling the top-right corner of the banner (Figma) */}
      <img src={doodleS} alt="" aria-hidden className="pointer-events-none absolute -right-[52px] -top-[31px] z-10 hidden w-[72px] min-[1440px]:block" />

      {/* Banner: radius 28, padding 40, border #E2E8F0, shadow 0 20 45 4% */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.04)] md:flex-row md:items-center md:p-10">
        <div className="max-w-[590px]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wide text-brand">
            <span className="h-1 w-1 rounded-full bg-brand" /> Expiring departures
          </span>
          <h2 className="mt-3 text-[32px] font-bold leading-10 text-brand">
            Last <i className="font-serif font-medium text-navy">minute</i> deals
          </h2>
          <p className="mt-3 text-[15px] leading-6 text-slate-500">
            Book your seat on the most sought-after flights, connecting you to top destinations. Experience comfort, convenience, and great service as you embark on your next journey!
          </p>
        </div>
        {/* Button 168.5 x 50, radius 12, navy with 60% orange border */}
        <button className="flex shrink-0 items-center gap-2.5 rounded-xl border border-[#EA580C]/60 bg-navy px-8 py-[14px] text-[13px] font-semibold text-white">
          Book Now <Plane size={14} />
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {deals.map((d, i) => <DealCard key={i} d={d} />)}
      </div>
    </section>
  )
}
