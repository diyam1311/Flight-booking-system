import { Plane } from 'lucide-react'
import { popularRoutes } from '../data/homeData'

export default function PopularRoutes() {
  return (
    <section className="mt-12 lg:mt-[25px]">
      <h2 className="mb-2 text-sm font-semibold leading-[26px]">Popular Daily Routes</h2>
      {/* Figma: 4 cards, 292 x 74, gap 24, radius 12, padding 16 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popularRoutes.map((r) => (
          <a key={r.from + r.to} href="#" className="flex h-[74px] items-center justify-between rounded-xl border border-[#E0E3E5]/60 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-50 text-emerald-700"><Plane size={16} /></span>
              <div>
                <p className="text-[13px] font-bold">{r.from} → {r.to}</p>
                <p className="text-[10px] text-slate-400">{r.flights} daily flights</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-emerald-800">{r.price}</p>
              <p className="text-[10px] text-slate-400">one-way</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
