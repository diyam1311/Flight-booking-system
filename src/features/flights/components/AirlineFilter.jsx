import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import CheckOption from './CheckOption'

const VISIBLE_AT_FIRST = 5

// Search box + airline tick boxes. "Show more" opens the rest of the list.
//  airlines: [{ name, count }]    selected: ['IndiGo', ...]    onToggle: runs with the airline name
export default function AirlineFilter({ airlines, selected, onToggle }) {
  const [query, setQuery] = useState('')
  const [showAll, setShowAll] = useState(false)

  const matches = airlines.filter((a) => a.name.toLowerCase().includes(query.trim().toLowerCase()))
  const searching = query.trim() !== ''

  // Short list at first; a ticked airline always stays visible
  const shown = searching || showAll
    ? matches
    : matches.filter((a, i) => i < VISIBLE_AT_FIRST || selected.includes(a.name))

  return (
    <>
      <div className="relative">
        <Search size={11} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search airlines"
          aria-label="Search airlines"
          className="h-8 w-full rounded-md border border-slate-200 pl-7 pr-2 text-[11px] outline-none placeholder:text-slate-400 focus:border-navy"
        />
      </div>

      <div className="mt-2">
        {shown.map((a) => (
          <CheckOption key={a.name} label={a.name} count={a.count} checked={selected.includes(a.name)} onChange={() => onToggle(a.name)} />
        ))}
        {matches.length === 0 && <p className="py-2 text-[11px] text-slate-400">No airline found</p>}
      </div>

      {!searching && matches.length > VISIBLE_AT_FIRST && (
        <button type="button" onClick={() => setShowAll(!showAll)} className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-brand">
          {showAll ? 'Show less' : 'Show more'} <ChevronDown size={10} className={showAll ? 'rotate-180' : ''} />
        </button>
      )}
    </>
  )
}
