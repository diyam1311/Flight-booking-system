import { Plane } from 'lucide-react'
import { fullName } from '@/features/booking/utils/format'
import { AIRLINE_LOGOS } from '@/features/flights/data/mockFlights'
import { BAGGAGE_ALLOWANCE } from '../data/ticketData'
import Barcode from './Barcode'

// Left part: flight + passenger facts. Right part (after the dashed line): barcode.
// The two half circles on the dashed line are the "tear-off" notches (they use the page colour).
//   view : texts of the flight (utils/ticketView.js)      passenger : one passenger of the booking
export default function BoardingPass({ view, passenger, bookingId, gate }) {
  const logo = AIRLINE_LOGOS[view.airline] ?? { logoText: view.airline.slice(0, 2).toUpperCase(), logoColor: 'bg-navy' }

  const facts = [
    ['Passenger Name', fullName(passenger)],
    ['Booking Reference', bookingId],
    ['Seat Number', passenger.seat],
    ['Baggage Allowance', BAGGAGE_ALLOWANCE],
    ['Boarding Time', view.boardingTime],
    ['Ticket Number', passenger.ticketNumber],
    ['Gate No.', gate],
  ]

  return (
    // The ticket always keeps its Figma size (850 x 262.66). Only on screens narrower than 850 it can be dragged sideways.
    // overflow-y-hidden: the notches stick out above / below the ticket, they must not make a vertical scrollbar.
    <div className="max-w-full overflow-x-auto overflow-y-hidden">
      <article className="relative h-[262.66px] w-[850px] shrink-0 overflow-hidden bg-white" aria-label={`Boarding pass of ${fullName(passenger)}`}>
        <span className="absolute inset-y-0 left-0 w-2 bg-black" />

        {/* airline */}
        <div className="absolute left-[28px] top-[14px] flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-[10px] text-[11px] font-bold text-white ${logo.logoColor}`}>{logo.logoText}</span>
          <div>
            <p className="text-sm font-bold leading-5">{view.airline}</p>
            <p className="text-[11px] leading-[14px] text-slate-400">{view.flightCode}</p>
          </div>
        </div>

        {/* DEL 09:20 ...... 2h 15m ...... BOM 11:35 (the row is 630 wide, between x = 28 and x = 658) */}
        <div className="absolute left-[28px] top-[70px] flex h-[59px] w-[630px] items-center justify-between">
          <Place code={view.fromCode} time={view.depTime} airport={view.fromAirport} />

          <div className="flex w-[66px] flex-col items-center gap-1.5">
            <span className="text-[11px] leading-4 text-slate-600">{view.duration}</span>
            <span className="flex h-[17px] w-full items-center">
              <span className="flex-1 border-t border-dotted border-sky-600" />
              <Plane size={13} className="mx-0.5 rotate-45 fill-sky-600 text-sky-600" />
              <span className="flex-1 border-t border-dotted border-sky-600" />
            </span>
            <span className="text-[11px] font-semibold leading-4 text-sky-600">{view.stops}</span>
          </div>

          <Place code={view.toCode} time={view.arrTime} airport={view.toAirport} />
        </div>

        <span className="absolute left-2 top-[142px] h-px w-[673px] bg-slate-200" />

        {/* facts: 4 columns of 150, 2 rows */}
        <dl className="absolute left-[28px] top-[155px] grid grid-cols-[150px_150px_150px_150px] gap-y-[30px]">
          {facts.map(([label, value]) => (
            <div key={label} className="min-w-0 pr-3">
              <dt className="text-[9px] leading-[14px]">{label}</dt>
              <dd className="mt-1 break-words text-[11px] font-bold leading-4">{value}</dd>
            </div>
          ))}
        </dl>

        {/* tear-off line, notches and barcode */}
        <span className="absolute bottom-9 left-[681px] top-9 border-l border-dashed border-slate-300" />
        <span className="absolute -top-9 left-[645px] h-[72px] w-[72px] rounded-full bg-page" />
        <span className="absolute -bottom-9 left-[645px] h-[72px] w-[72px] rounded-full bg-page" />
        <div className="absolute left-[754px] top-[44px]"><Barcode value={passenger.ticketNumber} /></div>
      </article>
    </div>
  )
}

// "DEL  09:20  Indira Gandhi International Airport"
function Place({ code, time, airport }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[22px] font-bold leading-7">{code}</span>
      <div className="w-[150px]">
        <p className="text-xs font-bold leading-4">{time}</p>
        <p className="text-[11px] leading-[15px] text-slate-400">{airport}</p>
      </div>
    </div>
  )
}
