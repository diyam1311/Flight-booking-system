import { ArrowRightLeft, BriefcaseBusiness, Clock, Plane, UserRound } from 'lucide-react'
import { CARD } from '../utils/styles'

// One end of the flight on the ticket: big time, city, terminal, date.
function Place({ place, right }) {
  return (
    <div className={`min-w-0 ${right ? 'text-right' : ''}`}>
      <p className="text-4xl font-extrabold leading-none text-navy sm:text-5xl">{place.time}</p>
      <p className="mt-2 text-sm font-semibold sm:text-base">{place.city}</p>
      <p className="text-xs text-sky-700 sm:text-[13px]">{place.terminal}</p>
      <p className="mt-1 text-[11px] font-bold">{place.date}</p>
    </div>
  )
}

// Small white square with an icon + 3 lines of text (passenger, baggage).
function InfoItem({ icon: Icon, label, title, note }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white text-navy"><Icon size={18} /></span>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-sm font-bold leading-5">{title}</p>
        <p className="text-xs text-slate-500">{note}</p>
      </div>
    </div>
  )
}

// The new e-ticket (Figma: 716 x 504; blue top line, padding 24).   ticket : see MOCK_QUOTE.ticket
export default function TicketCard({ ticket }) {
  const { surrendered } = ticket
  return (
    <section className={`${CARD} flex flex-col gap-6 overflow-hidden pb-6 xl:min-h-[504px] xl:justify-between`}>
      <div className="h-2 bg-gradient-to-r from-navy to-sky-400" />

      <div className="flex flex-col gap-6 px-4 sm:px-6">
        {/* airline + fare name */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#EFF4FF] p-4">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-white text-navy"><Plane size={24} /></span>
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold leading-7 text-navy">{ticket.airline} <span className="rounded bg-navy px-1.5 py-0.5 text-[10px] text-white">{ticket.flightNo}</span></h2>
              <p className="text-[13px] text-slate-500">{ticket.aircraft}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wide text-sky-800">{ticket.fareName}</p>
            <p className="mt-1 text-[13px] text-slate-500">{ticket.status}</p>
          </div>
        </div>

        {/* times + line */}
        <div className="grid grid-cols-2 items-center gap-3 sm:grid-cols-[auto_1fr_auto] sm:gap-6">
          <Place place={ticket.from} />
          {/* the line between the airports needs room: hidden on a phone */}
          <div className="mx-auto hidden w-full max-w-[270px] flex-col items-center gap-2 sm:flex">
            <p className="flex items-center gap-1 text-xs font-medium"><Clock size={13} className="text-sky-700" /> {ticket.duration}</p>
            <div className="flex w-full items-center">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-navy" />
              <span className="h-0.5 flex-1 bg-[#DCE7F8]" />
              <Plane size={18} className="mx-1 shrink-0 rotate-45 text-navy" fill="currentColor" />
              <span className="h-0.5 flex-1 bg-[#DCE7F8]" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-navy" />
            </div>
            <p className="text-center text-xs text-slate-500"><span className="text-sky-700">•</span> {ticket.path}</p>
          </div>
          <Place place={ticket.to} right />
        </div>

        {/* passenger + baggage */}
        <div className="grid gap-4 rounded-xl bg-[#EFF4FF] p-4 sm:grid-cols-2">
          <InfoItem icon={UserRound} label="Passenger" title={ticket.passenger.name} note={ticket.passenger.type} />
          <InfoItem icon={BriefcaseBusiness} label="Baggage Allowance" title={ticket.baggage.allowance} note={ticket.baggage.note} />
        </div>

        {/* the old ticket */}
        <div className="flex gap-4 rounded-xl bg-[#E4EEFD] p-4">
          <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D3E2FA] text-red-600 sm:grid"><ArrowRightLeft size={16} /></span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold">{surrendered.title}</h3>
              <span className="rounded bg-white px-2 py-0.5 text-[11px] font-medium text-red-600">{surrendered.tag}</span>
            </div>
            <p className="mt-1 text-xs leading-5 text-slate-500">{surrendered.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
