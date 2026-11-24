import { Users } from 'lucide-react'
import { PASSENGER_TYPES } from '@/features/booking/data/bookingOptions'
import { fullName } from '@/features/booking/utils/format'

// "Passenger Details" card (Figma: 446 x 271.6, radius 10, border 0.3px, padding 16, gap 9).
// Every passenger is what the user typed on the traveller page, plus the seat and ticket number made for the booking.
export default function PassengerPanel({ passengers }) {
  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[9px] rounded-[10px] border-[0.3px] border-black/20 bg-white p-4 lg:h-[271.6px]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold"><Users size={15} className="text-navy" /> Passenger Details</h2>
        <span className="text-[11px] text-slate-500">Total Passengers: {passengers.length}</span>
      </div>

      <ul className="flex flex-col gap-3 overflow-y-auto">
        {passengers.map((p, i) => (
          <li key={p.ticketNumber} className="rounded-lg border border-slate-100 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="flex min-w-0 items-center gap-3 text-sm font-semibold">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-[11px] text-brand">{i + 1}</span>
                <span className="truncate">{fullName(p)}</span>
              </p>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-brand">{PASSENGER_TYPES[p.type].label}</span>
            </div>
            <dl className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
              <Field label="Seat" value={p.seat} />
              <Field label="Ticket Number" value={p.ticketNumber} />
              <Field label="Type" value={PASSENGER_TYPES[p.type].label} />
            </dl>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Field({ label, value }) {
  return (
    <div className="border-l border-slate-100 first:border-l-0">
      <dt className="text-[10px] text-slate-400">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
