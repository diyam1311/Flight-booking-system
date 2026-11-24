import { Plane } from 'lucide-react'
import { formatDay, formatLong } from '@/utils/dates'

// Light-blue flight box of the booking popup (Figma: 453 x 265.5, radius 23, padding 18.6 / 30.3).
// flight : the flight that was selected      search : what the user searched (cities, date, cabin)
export default function FlightSummaryCard({ flight, search }) {
  // "All Class" is only a search filter, a booked flight always has a real class
  const cabin = search.cabin === 'All Class' ? 'Economy' : search.cabin

  return (
    <section className="flex h-[265.5px] flex-col justify-between rounded-[23px] bg-[#EFF5FD]/70 px-[30px] py-[19px]">
      {/* airline + cabin class  ......  travel date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-[17px] font-bold leading-6 text-navy">{flight.airline}</p>
          <span className="h-1 w-1 rounded-full bg-sky-500" />
          <span className="rounded-full border border-sky-200 bg-white px-2.5 py-[3px] text-[11px] leading-[14px] text-sky-500">{cabin}</span>
        </div>
        <p className="text-xs text-slate-400">{formatLong(search.depart)}</p>
      </div>

      {/* DEL  - - - plane - - -  BOM */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[28px] font-bold leading-9">{flight.fromCode}</p>
          <p className="text-xs leading-4 text-slate-400">{search.from.city}</p>
          <p className="mt-3 text-base font-medium leading-5">{flight.depTime}</p>
        </div>

        <div className="flex w-[130px] flex-col items-center pt-2">
          <span className="text-xs leading-4 text-slate-400">{flight.duration}</span>
          <div className="flex h-3 w-full items-center">
            <span className="flex-1 border-t border-dashed border-sky-500" />
            <Plane size={11} className="mx-1 rotate-45 fill-sky-500 text-sky-500" />
            <span className="flex-1 border-t border-dashed border-sky-500" />
          </div>
          <span className="text-xs font-medium leading-4 text-emerald-500">{flight.stops}</span>
        </div>

        <div className="text-right">
          <p className="text-[28px] font-bold leading-9">{flight.toCode}</p>
          <p className="text-xs leading-4 text-slate-400">{search.to.city}</p>
          <p className="mt-3 text-base font-medium leading-5">{flight.arrTime}</p>
        </div>
      </div>

      {/* Date | Duration | Status */}
      <div className="grid grid-cols-3 text-center">
        <Fact label="Date" value={formatDay(search.depart)} />
        <Fact label="Duration" value={flight.duration} className="border-x border-slate-200" />
        {/* no live flight tracking yet, so every flight is shown as on time */}
        <Fact label="Status" value="On Time" valueClass="text-emerald-500" />
      </div>
    </section>
  )
}

function Fact({ label, value, className = '', valueClass = '' }) {
  return (
    <div className={className}>
      <p className="text-xs leading-4 text-slate-400">{label}</p>
      <p className={`mt-1 text-[13px] font-medium leading-4 ${valueClass}`}>{value}</p>
    </div>
  )
}
