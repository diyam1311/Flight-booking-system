import { BadgeCheck, Headset, Check } from 'lucide-react'
import { trust } from '../data/homeData'

const icons = [BadgeCheck, Headset, Check]
const colors = ['text-brand', 'text-navy', 'text-emerald-700']

export default function TrustStrip() {
  // Figma: 1240 x 54, radius 16, padding 16/24, border #E2E8F0, space-around
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:justify-around">
      {trust.map((t, i) => {
        const Icon = icons[i]
        return (
          <div key={t} className="flex items-center gap-8">
            <span className="flex items-center gap-2"><Icon size={15} className={colors[i]} /> {t}</span>
            {i < trust.length - 1 && <span className="hidden h-1 w-1 rounded-full bg-slate-300 md:block" />}
          </div>
        )
      })}
    </div>
  )
}
