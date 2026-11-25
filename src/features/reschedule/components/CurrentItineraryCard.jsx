import { ArrowRight, RotateCcw, Ticket } from 'lucide-react'
import { CARD } from '../utils/styles'

const Label = ({ children }) => <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">{children}</p>

// "Current Itinerary Modification" card (Figma: 1240 x 192; dark header 52, white body 140, padding 24).
//   itinerary : see MOCK_OFFER.itinerary in data/rescheduleMock.js
export default function CurrentItineraryCard({ itinerary }) {
  const { status, route, airline, departure, seat, reference } = itinerary
  return (
    <section className={`${CARD} overflow-hidden`}>
      <header className="flex min-h-[52px] flex-wrap items-center justify-between gap-2 bg-navy px-4 py-3 text-white sm:px-6 xl:py-0">
        <h2 className="flex items-center gap-2 text-sm font-semibold"><Ticket size={18} className="shrink-0" /> Current Itinerary Modification</h2>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFE4E6] px-3 py-1 text-[10px] font-semibold text-[#DC2626]"><RotateCcw size={10} /> {status}</span>
      </header>

      {/* 4 equal columns on a big screen, 2 on a tablet, 1 on a phone */}
      <div className="grid gap-x-4 gap-y-5 p-4 sm:grid-cols-2 sm:p-6 xl:h-[140px] xl:grid-cols-4 xl:items-center xl:gap-0">
        <div>
          <Label>Route &amp; Airline</Label>
          <p className="mt-1 flex items-center gap-1 text-xl font-bold leading-6 text-navy">{route.from} <ArrowRight size={16} /> {route.to}</p>
          <p className="mt-1 text-xs text-slate-500">{airline}</p>
        </div>
        <div>
          <Label>Original Departure</Label>
          <p className="mt-1 text-base font-semibold leading-6">{departure.date}</p>
          <p className="mt-1 text-xs text-slate-500">{departure.time}</p>
        </div>
        <div>
          <Label>Seat &amp; Passenger</Label>
          <p className="mt-1 text-base font-semibold leading-6">{seat.title}</p>
          <p className="mt-1 text-xs text-slate-500">{seat.note}</p>
        </div>
        <div className="rounded-xl bg-[#EFF4FF] px-4 py-3 sm:col-span-2 xl:col-span-1 xl:w-[274px] xl:justify-self-end">
          <Label>Portal Reference</Label>
          <p className="mt-1 text-base font-bold leading-6 text-navy">{reference.pnr}</p>
          <p className="mt-0.5 text-[10px] font-medium text-brand">{reference.note}</p>
        </div>
      </div>
    </section>
  )
}
