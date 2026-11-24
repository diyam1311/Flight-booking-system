import { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { WEEKDAYS, formatShort, monthCells, monthTitle, parseISO } from '@/utils/dates'

// One month: weekday names + the day buttons.
function MonthGrid({ monthStart, depart, ret, showRange, minDate, onPick }) {
  const cells = monthCells(monthStart.getFullYear(), monthStart.getMonth())

  return (
    <div>
      <p className="mb-3 text-center text-[11px] font-semibold text-navy">{monthTitle(monthStart)}</p>
      <div className="grid grid-cols-7 text-center text-[10px] font-medium text-slate-500">
        {WEEKDAYS.map((day) => <span key={day} className="py-1.5">{day}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {cells.map((iso, i) => {
          if (!iso) return <span key={`empty-${i}`} />
          const disabled = iso < minDate
          const isEnd = iso === depart || (showRange && iso === ret) // first / last day of the trip
          const inRange = showRange && iso > depart && iso < ret
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onPick(iso)}
              aria-label={formatShort(iso)}
              className={`mx-auto h-9 w-9 rounded-full text-[11px] transition ${
                disabled
                  ? 'cursor-not-allowed text-slate-300'
                  : isEnd
                    ? 'bg-navy font-semibold text-white'
                    : inRange
                      ? 'bg-page text-slate-900'
                      : 'text-slate-900 hover:bg-slate-100'
              }`}
            >
              {Number(iso.slice(8))}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Two-month calendar (one month on phones).
//  selecting: 'depart' | 'return'  (which date the user is choosing right now)
//  minDate:   days before this one are greyed out
//  onPick:    runs with the clicked date, e.g. "2026-07-03"
export default function CalendarPopup({ selecting, depart, ret, oneWay, minDate, onPick }) {
  const focus = parseISO(selecting === 'return' ? ret : depart)
  const [monthStart, setMonthStart] = useState(new Date(focus.getFullYear(), focus.getMonth(), 1))

  const now = new Date()
  const canGoBack = monthStart > new Date(now.getFullYear(), now.getMonth(), 1)
  const goToMonth = (change) => setMonthStart(new Date(monthStart.getFullYear(), monthStart.getMonth() + change, 1))
  const nextMonthStart = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1)

  const hint = oneWay
    ? 'Book round trip for great savings'
    : selecting === 'depart' ? 'Select your departure date' : 'Select your return date'

  // Only draw the highlighted "trip" range for round trips
  const monthProps = { depart, ret, showRange: !oneWay, minDate, onPick }

  return (
    <div className="absolute inset-x-0 top-full z-30 mt-2 rounded-xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5 lg:left-auto lg:w-[731px]">
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3 text-[11px] text-slate-500">
        <Calendar size={12} />
        <b className="text-slate-800">{formatShort(selecting === 'return' ? ret : depart)}</b>
        <span>-</span>
        <span>{hint}</span>
      </div>

      <div className="relative px-5 pb-6 pt-4 md:px-8">
        <button
          type="button"
          onClick={() => goToMonth(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full text-navy hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => goToMonth(1)}
          aria-label="Next month"
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-navy hover:bg-slate-100"
        >
          <ChevronRight size={16} />
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <MonthGrid monthStart={monthStart} {...monthProps} />
          <div className="hidden md:block">
            <MonthGrid monthStart={nextMonthStart} {...monthProps} />
          </div>
        </div>
      </div>
    </div>
  )
}
