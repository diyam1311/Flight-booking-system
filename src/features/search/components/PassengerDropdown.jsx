import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { MAX_PASSENGERS } from '../data/searchOptions'

const ROWS = [
  { key: 'adults', name: 'Adults', note: 'Age 12+' },
  { key: 'children', name: 'Children', note: 'Age 2–11' },
  { key: 'infants', name: 'Infants', note: 'Under 2' },
]

// Button + small box with  -  1  +  counters.
// format: turns the total into the button text (the homepage and the results page word it differently).
// className: text size / colour of the button.
export default function PassengerDropdown({
  pax,
  setPax,
  format = (total) => `Passenger Details (${total})`,
  className = 'text-[11px] font-medium',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  const total = pax.adults + pax.children + pax.infants

  // Rules: at most 9 people, and at least 1 adult (so an infant always has an adult)
  const canAdd = total < MAX_PASSENGERS
  const canRemove = (key) => pax[key] > (key === 'adults' ? 1 : 0)
  const change = (key, amount) => setPax({ ...pax, [key]: pax[key] + amount })

  const counterButton = 'h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400'

  return (
    <div ref={ref} className="sm:relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={`flex items-center gap-1.5 ${className}`}>
        {format(total)} <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute left-4 z-30 mt-2 w-80 max-w-[calc(100%-2rem)] rounded-[20px] bg-white p-5 text-slate-900 shadow-xl ring-1 ring-black/5 sm:left-0 sm:top-full sm:max-w-none">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Passenger selection</p>
          {ROWS.map(({ key, name, note }) => (
            <div key={key} className="flex items-center justify-between border-b border-slate-100 py-3 text-sm last-of-type:border-0">
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-[11px] text-slate-400">{note}</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => change(key, -1)} disabled={!canRemove(key)} aria-label={`Remove ${name}`} className={counterButton}>-</button>
                <span className="w-3 text-center">{pax[key]}</span>
                <button type="button" onClick={() => change(key, 1)} disabled={!canAdd} aria-label={`Add ${name}`} className={counterButton}>+</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setOpen(false)} className="ml-auto block rounded-xl bg-[#0B132B] px-6 py-2.5 text-sm font-semibold text-white">Apply</button>
        </div>
      )}
    </div>
  )
}
