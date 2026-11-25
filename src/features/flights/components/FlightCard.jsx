import { ArrowRight, ChevronDown, Plane } from 'lucide-react'

// One flight (Figma card: 932 x 259.5, radius 16, padding 20).
// `flight` comes from flightService.js. onSelect runs when "Select Flight" is clicked.
export default function FlightCard({ flight, onSelect }) {
  return (
    <article className="flex flex-col rounded-2xl border border-[#E2E8F0]/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:h-[259.5px]">
      <div className="flex flex-1 flex-col gap-6 md:flex-row md:justify-between lg:gap-0">
        {/* LEFT: airline, then departure -> route -> arrival */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <span className={`grid h-9 w-9 place-items-center rounded-lg text-[11px] font-bold text-white ${flight.logoColor}`}>
              {flight.logoText}
            </span>
            <div>
              <p className="text-sm font-bold leading-[18px]">{flight.airline}</p>
              <p className="text-[10px] leading-3 text-slate-400">{flight.code}</p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-start gap-y-4 lg:mt-[48px] lg:flex-nowrap">
            {/* departure */}
            <div className="w-[29%] sm:w-[115px] shrink-0">
              <p className="text-2xl font-bold leading-7">{flight.depTime}</p>
              <p className="mt-1 text-[10px] font-bold leading-[14px]">{flight.fromCode}</p>
              <p className="mt-[3px] text-[10px] leading-[13px] text-slate-400">{flight.fromAirport}</p>
            </div>

            {/* route: duration, dashed line with a plane, stops (274 wide) */}
            <div className="flex min-w-0 flex-1 flex-col items-center px-2 lg:ml-3 lg:max-w-[274px] min-[1440px]:ml-[111px] lg:px-0 lg:pt-[9px]">
              <span className="text-[10px] leading-[14px] text-slate-500">{flight.duration}</span>
              <div className="mt-px flex h-3 w-full items-center">
                <span className="flex-1 border-t border-dashed border-sky-500" />
                <Plane size={11} className="mx-1 rotate-45 fill-sky-500 text-sky-500" />
                <span className="flex-1 border-t border-dashed border-sky-500" />
              </div>
              <span className="mt-px text-[10px] font-semibold leading-3 text-sky-600">{flight.stops}</span>
            </div>

            {/* arrival */}
            <div className="w-[29%] sm:w-[115px] shrink-0 lg:ml-[27px]">
              <p className="text-2xl font-bold leading-7">{flight.arrTime}</p>
              <p className="mt-1 text-[10px] font-bold leading-[14px]">{flight.toCode}</p>
              <p className="mt-[3px] text-[10px] leading-[13px] text-slate-400">{flight.toAirport}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: tag, price, Select Flight button */}
        <div className="ml-auto flex w-[160px] shrink-0 flex-col items-end">
          {flight.tag ? (
            <span className="inline-flex h-5 items-center rounded-full bg-emerald-50 px-4 text-[10px] font-semibold text-emerald-600 lg:mt-2.5">
              {flight.tag}
            </span>
          ) : (
            <span className="hidden h-5 lg:mt-2.5 lg:block" /> // keeps the price in the same place when there is no tag
          )}
          <p className="text-[22px] font-bold leading-7 lg:mt-[25px]">₹ {flight.price.toLocaleString('en-IN')}</p>
          <button
            type="button"
            onClick={() => onSelect(flight)}
            className="mt-4 flex h-[38px] w-[160px] items-center justify-center gap-1.5 rounded-lg bg-brand text-[11px] font-semibold text-white transition hover:brightness-110"
          >
            Select Flight <ArrowRight size={12} />
          </button>
          <p className="mt-[18px] text-[10px] leading-3 text-slate-400">per person</p>
        </div>
      </div>

      {/* TODO: open the flight details here later */}
      <button type="button" className="mt-3 flex items-center gap-1 self-end text-[10px] font-medium text-slate-600">
        View details <ChevronDown size={10} />
      </button>
    </article>
  )
}
