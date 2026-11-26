import { ArrowRight, Info, MessageSquareText, Plane, ShieldCheck } from 'lucide-react'
import { CARD } from '../utils/styles'

// One end of the flight: big time, "DEL · Delhi", airport. `right` aligns it to the right edge.
function Place({ time, place, right }) {
  return (
    <div className={`min-w-0 ${right ? 'text-right' : ''}`}>
      <p className="text-2xl font-bold leading-8 text-navy sm:text-[32px] sm:leading-10">{time}</p>
      <p className="text-sm font-semibold">{place.code} · {place.city}</p>
      {/* the long airport name needs room: hidden on a phone */}
      <p className="hidden text-xs text-slate-500 sm:block">{place.airport}</p>
    </div>
  )
}

// One flight the user can move to (Figma: 1240 x 280, padding 24, gap 16, radius 12).
//   flight : see MOCK_FLIGHTS in data/rescheduleMock.js      onSelect() : "Select & Chat With Us"
export default function FlightOptionCard({ flight, onSelect, busy }) {
  const { from, to, fare } = flight
  return (
    <article className={`${CARD} flex flex-col gap-4 p-4 sm:p-6 xl:h-[280px] xl:justify-between`}>
      {/* airline + small tags */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#0A1B9E] text-[8px] font-bold text-white">IndiGo</span>
          <div>
            <h3 className="text-base font-semibold leading-5">{flight.airline} <span className="text-[10px] font-bold text-slate-600">{flight.flightNo}</span></h3>
            <p className="text-xs text-slate-500">{flight.aircraft} · {flight.slot}</p>
          </div>
        </div>
        <ul className="flex flex-wrap gap-2">
          {flight.tags.map((tag) => <li key={tag} className="rounded-full bg-[#EFF4FF] px-3 py-1 text-[10px] font-semibold text-navy">{tag}</li>)}
        </ul>
      </div>

      {/* times + line between the two airports (the line is 373 wide in Figma) */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
        <Place time={flight.depTime} place={from} />
        <div className="mx-auto flex w-full max-w-[373px] flex-col items-center gap-1">
          <span className="text-[10px] font-semibold">{flight.duration}</span>
          <div className="flex w-full items-center">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
            <span className="h-0.5 flex-1 bg-[#DCE7F8]" />
            <Plane size={16} className="mx-1 shrink-0 rotate-45 text-sky-800" fill="currentColor" />
            <span className="h-0.5 flex-1 bg-[#DCE7F8]" />
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
          </div>
          <span className="text-[9px] font-semibold text-sky-800">{flight.stops}</span>
        </div>
        <Place time={flight.arrTime} place={to} right />
      </div>

      {/* fare status + button */}
      <div className="flex flex-col gap-3 rounded-xl bg-[#F5F8FE] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-2">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-sky-800" />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-5 text-[#0B4A8F]">{fare.title}</p>
            <p className="flex items-center gap-1 text-xs text-slate-500"><Info size={11} className="shrink-0" /> {fare.note}</p>
            {Number.isFinite(Number(flight.baseFare)) && <p className="mt-1 text-xs font-semibold text-navy">Base fare: ₹{Number(flight.baseFare).toLocaleString('en-IN')}</p>}
          </div>
        </div>
        <button type="button" onClick={onSelect} disabled={busy} className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-navy px-5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60">
          <MessageSquareText size={14} /> {fare.action} <ArrowRight size={14} />
        </button>
      </div>
    </article>
  )
}
