import { useState } from 'react'
import { ChevronDown, Clock, Hourglass, IndianRupee, Plane, ShieldCheck } from 'lucide-react'
import { ARRIVAL_SLOTS, DEPARTURE_SLOTS, DURATION_OPTIONS, REFUND_OPTIONS, countFlights, getAirlines } from '../utils/filterRules'
import FilterSection from './FilterSection'
import CheckOption from './CheckOption'
import AirlineFilter from './AirlineFilter'

const rupees = (amount) => `₹${amount.toLocaleString('en-IN')}`

// Left filter box (Figma: 280 wide, radius 16, padding 20). It only shows choices and reports clicks;
// the real filtering happens in useFlightFilters (see SearchResultsPage).
//  flights:  ALL flights of the search (used for the numbers in brackets)
//  filters:  what is ticked now     bounds: the two ends of the price slider
//  onToggle(group, id) / onPriceChange(amount) / onClear(): tell the page what the user did
export default function FilterSidebar({ flights, filters, bounds, activeCount, onToggle, onPriceChange, onClear }) {
  const [openOnPhone, setOpenOnPhone] = useState(false) // on phones the filters start folded

  // tick boxes for one group, e.g. options('refund', REFUND_OPTIONS)
  const options = (group, list) =>
    list.map((o) => (
      <CheckOption
        key={o.id}
        label={o.label}
        hint={o.hours}
        count={countFlights(flights, o)}
        checked={filters[group].includes(o.id)}
        onChange={() => onToggle(group, o.id)}
      />
    ))

  return (
    <aside className="w-full rounded-2xl border border-[#E2E8F0]/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:w-[280px] lg:shrink-0">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold leading-[18px]">
          <button
            type="button"
            onClick={() => setOpenOnPhone(!openOnPhone)}
            aria-expanded={openOnPhone}
            className="flex items-center gap-2 lg:pointer-events-none"
          >
            Filters
            {activeCount > 0 && <span className="rounded-full bg-brand px-1.5 text-[10px] font-semibold text-white">{activeCount}</span>}
            <ChevronDown size={14} className={`transition lg:hidden ${openOnPhone ? 'rotate-180' : ''}`} />
          </button>
        </h2>
        <button type="button" onClick={onClear} className="text-[10px] font-semibold text-brand">Clear All</button>
      </div>

      <div className={`mt-6 ${openOnPhone ? 'block' : 'hidden'} lg:block`}>
        <FilterSection title="Airlines" icon={Plane}>
          <AirlineFilter airlines={getAirlines(flights)} selected={filters.airlines} onToggle={(name) => onToggle('airlines', name)} />
        </FilterSection>

        <FilterSection title="Price Range" icon={IndianRupee}>
          {/* Slider for the highest price the user wants to pay */}
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            aria-label="Maximum price"
            className="w-full accent-brand"
          />
          <div className="mt-1 flex justify-between text-[10px] text-slate-400">
            <span>{rupees(bounds.min)}</span>
            <span>{rupees(bounds.max)}</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-700">Up to <b>{rupees(filters.maxPrice)}</b></p>
        </FilterSection>

        <FilterSection title="Departure Time" icon={Clock}>{options('departure', DEPARTURE_SLOTS)}</FilterSection>
        <FilterSection title="Arrival Time" icon={Clock}>{options('arrival', ARRIVAL_SLOTS)}</FilterSection>
        <FilterSection title="Refundability" icon={ShieldCheck}>{options('refund', REFUND_OPTIONS)}</FilterSection>
        <FilterSection title="Flight Duration" icon={Hourglass}>{options('duration', DURATION_OPTIONS)}</FilterSection>
      </div>
    </aside>
  )
}
