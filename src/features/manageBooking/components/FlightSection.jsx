import { useState } from 'react'
import { Building2, CalendarDays, ChevronDown, Clock, Plane } from 'lucide-react'
import { findCity } from '@/features/search/data/searchOptions'
import { ticketDate } from '@/features/ticket/utils/ticketView'
import { BAGGAGE_ALLOWANCE, TERMINALS } from '@/features/ticket/data/ticketData'
import { time12 } from '../utils/bookingText'

// Flight part of the My Booking page: route row (Figma 903 x 70), date row, and the airline row that opens (883 x 70).
export default function FlightSection({ booking }) {
  const { flight, search } = booking
  const [open, setOpen] = useState(false)
  const from = findCity(flight.fromCode)
  const to = findCity(flight.toCode)

  return (
    <section className="flex flex-col gap-4">
      {/* route: from - plane - to */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl px-[10px] py-4 lg:h-[70px] lg:flex-nowrap lg:gap-8">
        <Place city={from?.city ?? flight.fromCode} code={flight.fromCode} airport={`${(from?.airport ?? '').split(',')[0]} ${TERMINALS[flight.fromCode] ?? ''}`} />
        <span className="flex min-w-[100px] flex-1 items-center text-navy lg:max-w-[147px]" aria-hidden="true">
          <span className="h-px flex-1 border-t border-dotted border-slate-300" />
          <Plane size={14} className="mx-2 shrink-0 fill-current" />
          <span className="h-px flex-1 border-t border-dotted border-slate-300" />
        </span>
        <Place right city={to?.city ?? flight.toCode} code={flight.toCode} airport={`${(to?.airport ?? '').split(',')[0]} ${TERMINALS[flight.toCode] ?? ''}`} />
      </div>

      {/* date, time, duration, stops */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 text-xs leading-4 text-slate-600">
        <span className="flex items-center gap-2"><CalendarDays size={12} /> {ticketDate(search.depart)}</span>
        <span className="flex items-center gap-2"><Clock size={12} /> {time12(flight.depTime)} – {time12(flight.arrTime)}</span>
        <span className="flex items-center gap-2"><Clock size={12} /> {flight.duration}</span>
        <span className="ml-auto rounded-full bg-orange-100 px-3 py-1 text-[11px] font-medium text-brand">{flight.stops}</span>
      </div>

      {/* airline row (click to see more) */}
      <div className="rounded-lg bg-[#E2ECFC]">
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-6 py-4 text-left lg:h-[70px]">
          <span className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy text-white"><Plane size={16} /></span>
            <span>
              <span className="block text-[13px] font-bold leading-4">{flight.airline} <span className="font-normal text-slate-500">{flight.airline} {flight.code}</span></span>
              <span className="block text-[11px] leading-4 text-slate-500">{search.cabin}{flight.aircraft ? ` · ${flight.aircraft}` : ''}</span>
            </span>
          </span>
          <ChevronDown size={16} className={`shrink-0 transition ${open ? 'rotate-180' : ''}`} />
        </button>

        {open && (
          <dl className="grid grid-cols-2 gap-4 px-6 pb-4 text-xs sm:grid-cols-4">
            <Detail label="Flight" value={flight.code} />
            <Detail label="Terminal" value={`${TERMINALS[flight.fromCode] ?? '-'} → ${TERMINALS[flight.toCode] ?? '-'}`} />
            <Detail label="Gate" value={booking.gate} />
            <Detail label="Baggage" value={BAGGAGE_ALLOWANCE} />
          </dl>
        )}
      </div>
    </section>
  )
}

function Place({ city, code, airport, right }) {
  return (
    <div className={`flex items-center gap-3 ${right ? 'flex-row-reverse text-right' : ''}`}>
      <span className="grid h-[33px] w-[33px] shrink-0 place-items-center rounded-md bg-slate-100 text-slate-500"><Building2 size={15} /></span>
      <div>
        <p className="text-sm font-bold leading-5">{city} ({code})</p>
        <p className="max-w-[320px] text-[11px] leading-4 text-slate-500">{airport}</p>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] text-slate-500">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  )
}
