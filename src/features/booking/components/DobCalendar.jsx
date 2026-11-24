import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WEEKDAYS, monthCells, parseISO, todayISO } from '@/utils/dates'

const MONTHS = Array.from({ length: 12 }, (_, m) => new Date(2000, m, 1).toLocaleDateString('en-GB', { month: 'long' }))
const FIRST_YEAR = 1900

// A small calendar made for birth dates: pick the MONTH and YEAR from drop-downs (no endless scrolling),
// then click the day. Days in the future cannot be picked.
export default function DobCalendar({ value, startDate, onPick }) {
  const now = new Date()
  const thisYear = now.getFullYear()
  const thisMonth = now.getMonth()

  const first = parseISO(value || startDate)
  const [view, setView] = useState({ year: first.getFullYear(), month: first.getMonth() })

  // Show another month / year (never before 1900 and never after this month)
  const goTo = (year, month) => {
    if (month < 0) { year -= 1; month = 11 }
    if (month > 11) { year += 1; month = 0 }
    if (year < FIRST_YEAR || year > thisYear) return
    if (year === thisYear && month > thisMonth) month = thisMonth
    setView({ year, month })
  }

  const atStart = view.year === FIRST_YEAR && view.month === 0
  const atEnd = view.year === thisYear && view.month === thisMonth

  const today = todayISO()
  const years = Array.from({ length: thisYear - FIRST_YEAR + 1 }, (_, i) => thisYear - i) // newest first
  const selectClass = 'h-8 cursor-pointer rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold outline-none focus:border-brand'
  const arrowClass = 'grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent'

  return (
    <div className="w-[300px] max-w-[calc(100vw-2rem)] p-4">
      {/* < Month  Year > */}
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={() => goTo(view.year, view.month - 1)} disabled={atStart} aria-label="Previous month" className={arrowClass}>
          <ChevronLeft size={16} />
        </button>
        <select aria-label="Month" value={view.month} onChange={(e) => goTo(view.year, Number(e.target.value))} className={`${selectClass} flex-1`}>
          {MONTHS.map((name, m) => <option key={name} value={m}>{name}</option>)}
        </select>
        <select aria-label="Year" value={view.year} onChange={(e) => goTo(Number(e.target.value), view.month)} className={`${selectClass} w-[72px]`}>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <button type="button" onClick={() => goTo(view.year, view.month + 1)} disabled={atEnd} aria-label="Next month" className={arrowClass}>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center text-[11px] text-slate-400">
        {WEEKDAYS.map((day) => <span key={day} className="py-1">{day}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
        {monthCells(view.year, view.month).map((iso, i) => {
          if (!iso) return <span key={`empty-${i}`} />
          const selected = iso === value
          return (
            <button
              key={iso}
              type="button"
              disabled={iso > today}
              onClick={() => onPick(iso)}
              aria-pressed={selected}
              className={`mx-auto grid h-8 w-8 place-items-center rounded-full font-medium disabled:cursor-not-allowed disabled:text-slate-300 ${
                selected ? 'bg-navy text-white' : 'hover:bg-slate-100 disabled:hover:bg-transparent'
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
