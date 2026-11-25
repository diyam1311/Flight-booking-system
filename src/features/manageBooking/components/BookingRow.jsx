import { Plane } from 'lucide-react'
import { findCity } from '@/features/search/data/searchOptions'
import { ticketDate } from '@/features/ticket/utils/ticketView'
import { getBookingStatus } from '../utils/bookingStatus'
import { STATUS_STYLES } from '../data/manageBookingData'
import CityThumb from './CityThumb'
import { passengerText, time12 } from '../utils/bookingText'

// One booking of the Recents list (Figma: 917 x 68.5, radius 12, border 0.74px, padding 12).
//   booking : a saved booking (see ticketService)     onOpen(booking) : "View / Manage"
// "Booking Reference" is booking.id, the same ID that the confirmed popup and the e-ticket show.
export default function BookingRow({ booking, onOpen }) {
  const { flight, search, passengers } = booking
  const status = getBookingStatus(booking)

  return (
    <li className="flex flex-wrap items-center gap-y-3 rounded-xl border-[0.74px] border-[#E5E7EB] bg-white p-3 shadow-[0_0.74px_1.48px_rgba(0,0,0,0.05)] lg:h-[68.48px] lg:flex-nowrap">
      {/* small picture of the city you leave from (Figma: 49 x 44.5) */}
      <CityThumb code={flight.fromCode} />

      {/* route: from -> to */}
      <div className="flex w-full min-w-0 sm:min-w-[260px] sm:flex-1 items-center justify-between gap-2 sm:gap-4">
        <Place code={flight.fromCode} date={ticketDate(search.depart)} time={time12(flight.depTime)} />
        <span className="flex flex-1 items-center text-navy" aria-hidden="true">
          <span className="h-px flex-1 border-t border-dotted border-slate-300" />
          <Plane size={13} className="mx-2 shrink-0 fill-current" />
          <span className="h-px flex-1 border-t border-dotted border-slate-300" />
        </span>
        <Place code={flight.toCode} date={ticketDate(search.depart)} time={time12(flight.arrTime)} />
      </div>

      <Info label="Booking Reference" className="lg:w-[150px]"><span data-testid="recent-booking-id">{booking.id}</span></Info>
      <Info label="Passengers" className="lg:w-[100px]">{passengerText(passengers)}</Info>
      <Info label="Status" className="lg:w-[110px]">
        <span className={`rounded-full border px-2 py-0.5 text-[7px] font-bold ${STATUS_STYLES[status]}`}>{status}</span>
      </Info>

      <button
        type="button"
        onClick={() => onOpen(booking)}
        className="ml-auto flex h-[22px] w-[94px] shrink-0 items-center justify-center rounded border border-navy text-[9px] font-semibold text-navy hover:bg-slate-50 lg:ml-4"
      >
        View / Manage
      </button>
    </li>
  )
}

function Place({ code, date, time }) {
  return (
    <div className="w-[35%] max-w-[100px] shrink-0">
      <p className="text-[10px] font-bold leading-[14px]">{findCity(code)?.city ?? code} ({code})</p>
      <p className="text-[8px] leading-[11px] text-slate-400">{date}</p>
      <p className="text-[9px] font-bold leading-[13px]">{time}</p>
    </div>
  )
}

// small grey label with a value under it; a thin line on its left (Figma)
function Info({ label, className = '', children }) {
  return (
    <div className={`flex shrink-0 flex-col items-center justify-center gap-0.5 border-l border-slate-200 px-3 text-center lg:h-[44px] ${className}`}>
      <p className="text-[7px] leading-[10px] text-slate-400">{label}</p>
      <p className="text-[10px] font-bold leading-[14px]">{children}</p>
    </div>
  )
}
