import { Calendar } from 'lucide-react'
import { formatDay, formatWeekday } from '@/utils/dates'

// One date box (DEPARTURE or RETURN). Clicking it asks the parent to open the calendar.
// faded: look "switched off" (Return date on a one way trip).  dayClass: text size of the date.
export default function DateField({ label, value, faded, dayClass = 'text-lg', onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${formatDay(value)}. Open calendar`}
      className={`block w-full text-left ${faded ? 'opacity-40' : ''}`}
    >
      <span className="flex items-center justify-between text-[10px] font-medium tracking-widest text-slate-400">
        {label} <Calendar size={12} />
      </span>
      <span className={`block font-semibold ${dayClass}`}>{formatDay(value)}</span>
      <span className="block text-[10px] text-slate-400">{formatWeekday(value)}</span>
    </button>
  )
}
