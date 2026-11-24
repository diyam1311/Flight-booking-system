import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { toISO } from '@/utils/dates'
import { BOX_CLASS, ERROR_CLASS, LABEL_CLASS, borderClass } from './TextField'
import { formatDob } from '../utils/format'
import DobCalendar from './DobCalendar'

// "12 Oct 1990 v" box. Clicking it opens the birth-date calendar below it.
// startAge: roughly how old this passenger is (adult 30, child 6 ...) so the calendar opens near the right year.
export default function DateOfBirthField({ id, label, value, onChange, error, startAge = 30 }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  const today = new Date()
  const startDate = toISO(new Date(today.getFullYear() - startAge, today.getMonth(), 1))

  return (
    <div ref={ref} className="group relative" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <label htmlFor={id} className={LABEL_CLASS}>{label}</label>
      <button
        id={id}
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
        className={`${BOX_CLASS} flex items-center justify-between text-left ${open ? 'border-brand' : borderClass(error)}`}
      >
        <span className={value ? '' : 'text-slate-400'}>{value ? formatDob(value) : 'Select date'}</span>
        <ChevronDown size={14} className="text-slate-500" />
      </button>

      {open && (
        <div role="dialog" aria-label="Choose date of birth" className="absolute left-0 top-[62px] z-20 rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.12)]">
          <DobCalendar value={value} startDate={startDate} onPick={(iso) => { onChange(iso); setOpen(false) }} />
        </div>
      )}
      {error && <p role="alert" className={ERROR_CLASS}>{error}</p>}
    </div>
  )
}
