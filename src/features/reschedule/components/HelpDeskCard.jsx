import { LifeBuoy } from 'lucide-react'
import { CARD } from '../utils/styles'

// "Assistance Needed?" strip under the fare breakdown.   desk : { reference, phone }
export default function HelpDeskCard({ desk }) {
  return (
    <section className={`${CARD} flex items-center justify-between gap-3 p-4`}>
      <div className="flex min-w-0 items-center gap-3">
        <LifeBuoy size={22} className="shrink-0 text-navy" />
        <div className="min-w-0">
          <h2 className="text-[13px] font-bold">Assistance Needed?</h2>
          <p className="truncate text-[11px] text-slate-500">Desk Reference: {desk.reference}</p>
        </div>
      </div>
      <a href={`tel:${desk.phone.replace(/\s/g, '')}`} className="shrink-0 rounded-lg bg-[#EFF4FF] px-4 py-2 text-xs font-semibold text-navy hover:bg-[#E3ECFC]">Call Desk</a>
    </section>
  )
}
