import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowRight, BadgePercent } from 'lucide-react'
import { PATHS } from '@/config/paths'
import SearchSummaryBar from '../components/SearchSummaryBar'
import FilterSidebar from '../components/FilterSidebar'
import FlightCard from '../components/FlightCard'
import useFlightFilters from '../hooks/useFlightFilters'
import { SORT_OPTIONS, sortFlights } from '../utils/sortFlights'

// "Your Search Results" page (Figma frame 1440 wide). Navbar + Footer come from MainLayout.
// The search details and flights arrive from the loading page through the router state.
export default function SearchResultsPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [sortBy, setSortBy] = useState('Recommended')
  const allFlights = state?.flights ?? []
  const { filters, bounds, filteredFlights, activeCount, toggle, setMaxPrice, clearAll } = useFlightFilters(allFlights)

  // Opened /search-results directly (nothing was searched) -> back to the homepage
  if (!state?.search) return <Navigate to={PATHS.home} replace />
  const { search, total } = state

  // The bar sends the NEW search (changed cities / dates / passengers...) -> loading page -> fresh results
  const searchAgain = (newSearch) => navigate(PATHS.searching, { state: { search: newSearch } })
  // Open the Traveller Details page for the chosen flight (it needs the search too, for the passenger count and travel date)
  const selectFlight = (flight) => navigate(PATHS.travellerDetails, { state: { search, flight, results: state } })

  const visibleFlights = sortFlights(filteredFlights, sortBy)

  return (
    <main className="pb-2">
      {/* Title (742 wide) + search summary bar (1200 wide) */}
      <section className="mx-auto max-w-[1200px] px-4 pt-[47px] md:px-6 xl:px-0">
        <div className="max-w-[742px]">
          <h1 className="text-[32px] font-bold leading-10 text-navy md:text-[40px]">Your Search Results</h1>
          <p className="mt-6 text-base leading-6 text-slate-700">
            We found the best flights for your journey. Compare your options and choose what works best for you.
          </p>
        </div>
        <div className="mt-[19px]">
          <SearchSummaryBar search={search} onSearch={searchAgain} />
        </div>
      </section>

      {/* Results area: 1238 wide */}
      <section className="mx-auto mt-14 max-w-[1238px] px-4 md:px-6 lg:mt-[70px] xl:px-0">
        {/* "Showing x of y flights" + sort */}
        <div className="flex min-h-[50px] flex-wrap gap-2 items-center justify-between pb-[10px] text-xs text-slate-500">
          <p>
            Showing <b className="text-slate-900">{visibleFlights.length}</b> of <b className="text-slate-900">{total}</b> flights
          </p>
          <label className="flex items-center gap-2">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 w-[175px] rounded-md border border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 outline-none"
            >
              {SORT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        </div>

        {/* Promotional banner: 1238 x 101, radius 16, padding 20, orange fades in from the left */}
        <div className="mt-[17px] flex min-h-[101px] flex-wrap gap-3 items-center justify-between rounded-2xl border border-brand/70 bg-gradient-to-r from-brand/5 via-brand/10 via-70% to-brand p-5">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white"><BadgePercent size={20} /></span>
            <div>
              <p className="text-sm font-bold leading-[18px]">Best Deals for Your Trip</p>
              <p className="mt-0.5 text-xs text-slate-600">Get up to 15% off on select flights. Limited time offer!</p>
            </div>
          </div>
          {/* TODO: link to the offers page later */}
          <button type="button" className="flex shrink-0 items-center gap-1.5 rounded-md bg-white px-4 py-2 text-[11px] font-bold text-brand">
            View Offers <ArrowRight size={12} />
          </button>
        </div>

        {/* Filters (280) + flight cards (932), gap 26 */}
        <div className="mt-[22px] flex flex-col gap-[26px] lg:flex-row lg:items-start">
          <FilterSidebar
            flights={allFlights}
            filters={filters}
            bounds={bounds}
            activeCount={activeCount}
            onToggle={toggle}
            onPriceChange={setMaxPrice}
            onClear={clearAll}
          />
          <div className="flex w-full min-w-0 flex-col gap-[17px] lg:flex-1">
            {visibleFlights.length === 0 ? (
              <div className="rounded-2xl border border-[#E2E8F0]/80 bg-white px-6 py-14 text-center shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <p className="text-base font-bold">No flights match your filters</p>
                <p className="mt-1 text-xs text-slate-500">Try removing some filters to see more flights.</p>
                <button type="button" onClick={clearAll} className="mt-5 rounded-lg bg-navy px-5 py-2.5 text-xs font-semibold text-white">
                  Clear all filters
                </button>
              </div>
            ) : (
              visibleFlights.map((flight) => <FlightCard key={flight.id} flight={flight} onSelect={selectFlight} />)
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
