import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { MAX_PASSENGERS } from '../data/searchOptions'

const ROWS = [
  { key: 'adults', name: 'Adults', note: 'Age 12+' },
  { key: 'children', name: 'Children', note: 'Age 2-12' },
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

  const counterButton = 'h-6 w-6 rounded-full border disabled:cursor-not-allowed disabled:opacity-30'

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className={`flex items-center gap-1.5 ${className}`}>
        {format(total)} <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute left-0 top-8 z-20 w-60 rounded-xl bg-white p-4 text-slate-900 shadow-xl ring-1 ring-black/5">
          {ROWS.map(({ key, name, note }) => (
            <div key={key} className="flex items-center justify-between py-2 text-sm">
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
          <p className="mt-1 text-[10px] text-slate-400">Up to {MAX_PASSENGERS} passengers. Infant needs an adult.</p>
          <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full rounded-lg bg-navy py-2 text-xs font-semibold text-white">Apply</button>
        </div>
      )}
    </div>
  )
}
