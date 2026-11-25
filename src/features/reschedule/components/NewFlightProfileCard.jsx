import { Plane } from 'lucide-react'
import { CARD } from '../utils/styles'

// Small "NEW FLIGHT PROFILE" card under the chat status.   flight : { title, text }
export default function NewFlightProfileCard({ flight }) {
  return (
    <section className={`${CARD} flex items-center gap-4 p-4`}>
      <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-lg bg-[#EFF4FF] text-navy"><Plane size={18} fill="currentColor" /></span>
      <div className="min-w-0">
        <h2 className="text-[11px] tracking-widest text-sky-800">NEW FLIGHT PROFILE</h2>
        <p className="text-base font-bold leading-6 text-navy">{flight.title}</p>
        <p className="text-[11px] text-slate-500">{flight.text}</p>
      </div>
    </section>
  )
}
