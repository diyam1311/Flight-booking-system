import { CalendarDays, PlaneTakeoff } from 'lucide-react'
import { findCity } from '@/features/search/data/searchOptions'
import { TERMINALS } from '@/features/ticket/data/ticketData'
import { bookingTimestamp, ticketDate } from '@/features/ticket/utils/ticketView'

// "DEL" + "09:20" + the airport name (Figma: the airport text is 2 lines)
function Place({ code, time, airport }) {
  return (
    <div className="min-w-0 xl:w-[258px]">
      <p className="text-base font-bold leading-6">{code}</p>
      <p className="text-xs leading-5 text-slate-400">{time}</p>
      <p className="max-w-[170px] text-xs leading-[14px] text-slate-400">{airport}</p>
    </div>
  )
}

const airportText = (code) => `${findCity(code)?.airport.split(',')[0] ?? code}, Terminal ${(TERMINALS[code] ?? '').replace('T', '')}`

// "Booking Details" card (Figma: 927 x 179.42, radius 10, padding 24 / 27).  Everything comes from the booking.
export default function BookingDetailsCard({ booking }) {
  const { flight, search } = booking
  return (
    <section className="flex flex-col gap-6 rounded-[10px] bg-white px-4 py-6 sm:px-[27px] xl:min-h-[179.42px]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="flex items-center gap-3 text-xl font-medium leading-7"><PlaneTakeoff size={22} className="text-brand" /> Booking Details</h2>
        <div className="flex gap-6 text-[11px] font-semibold leading-4 text-[#1F4E9C]">
          <p>Booking Reference<br /><span className="block text-right">{booking.id}</span></p>
          <p><span className="flex items-center gap-1"><CalendarDays size={14} /> Booking Date</span><span className="block">{bookingTimestamp(booking.bookedAt)}</span></p>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-x-8 gap-y-4 xl:flex-nowrap xl:gap-x-0">
        {/* airline */}
        <div className="flex items-start gap-5 xl:w-[216px]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#0A1B9E] text-[8px] font-bold text-white">{flight.airline}</span>
          <div>
            <p className="text-base font-bold leading-6">{flight.airline}</p>
            <p className="text-xs leading-5 text-slate-400">{flight.code}</p>
            <p className="text-xs leading-5 text-slate-400">{search.cabin}</p>
          </div>
        </div>

        {/* from - line - to */}
        <div className="relative">
          <Place code={flight.fromCode} time={flight.depTime} airport={airportText(flight.fromCode)} />
          {/* dotted line + duration (only on a big screen; below that the same text is under the row) */}
          <div className="absolute left-[92px] top-1 hidden w-[133px] text-center xl:block">
            <p className="text-[10px] leading-3 text-slate-600">{flight.duration}</p>
            <span className="block border-t border-dotted border-sky-500" />
            <p className="text-[10px] font-semibold leading-3 text-sky-700">{flight.stops}</p>
          </div>
        </div>
        <Place code={flight.toCode} time={flight.arrTime} airport={airportText(flight.toCode)} />

        <p className="flex items-center gap-2 text-xs xl:ml-auto xl:self-center"><CalendarDays size={14} /> {ticketDate(search.depart)}</p>
      </div>
      <p className="-mt-3 text-[10px] text-slate-600 xl:hidden">{flight.duration} · {flight.stops}</p>
    </section>
  )
}
