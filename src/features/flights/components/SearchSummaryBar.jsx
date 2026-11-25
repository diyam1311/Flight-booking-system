import { ArrowRight } from 'lucide-react'
import useSearchForm from '@/features/search/hooks/useSearchForm'
import OptionSelect from '@/features/search/components/OptionSelect'
import PassengerDropdown from '@/features/search/components/PassengerDropdown'
import SearchFieldsRow from '@/features/search/components/SearchFieldsRow'
import { TRIP_TYPES, CABIN_CLASSES } from '@/features/search/data/searchOptions'

// "01 Passenger" / "03 Passengers"
const passengerText = (total) => `${String(total).padStart(2, '0')} ${total === 1 ? 'Passenger' : 'Passengers'}`

// "Economy" -> "Economy Class" ("All Class" stays as it is)
const cabinText = (cabin) => (cabin === 'All Class' ? cabin : `${cabin} Class`)

// The search box at the top of the results page (Figma "QUICK BOOKING": 1200 x 161, radius 16).
// It starts with what the user searched for and everything in it can be changed.
// onSearch runs with the NEW search when the Search Flights button is clicked.
export default function SearchSummaryBar({ search, onSearch }) {
  const searchForm = useSearchForm(search)
  const { form, setTrip, setCabin, setPax, getSearch } = searchForm

  return (
    <div className="relative rounded-2xl bg-white px-5 pb-20 pt-5 shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:h-[161px] lg:px-[37px] lg:pb-0">
      {/* Trip type | Passengers | Cabin class */}
      <div className="flex flex-wrap items-center gap-x-[30px] gap-y-1 text-xs font-medium text-slate-700 lg:h-5 lg:pl-[10px]">
        <OptionSelect label="Trip type" value={form.trip} options={TRIP_TYPES} onChange={setTrip} />
        <PassengerDropdown pax={form.pax} setPax={setPax} format={passengerText} className="text-xs font-medium" />
        <OptionSelect label="Cabin class" value={form.cabin} options={CABIN_CLASSES} onChange={setCabin} format={cabinText} alignEnd />
      </div>

      {/* From | To | Departure | Return + calendar */}
      <SearchFieldsRow variant="results" searchForm={searchForm} className="mt-4 lg:mt-2" />

      {/* Button 206.12 x 54, hangs 22px below the card, 29px from the right */}
      <button
        type="button"
        onClick={() => onSearch(getSearch())}
        className="absolute bottom-4 right-5 flex h-[54px] w-[206.12px] items-center justify-center gap-2 rounded-lg bg-navy text-[13px] font-medium text-white transition hover:brightness-110 lg:-bottom-[22px] lg:right-[29px]"
      >
        Search Flights <ArrowRight size={16} />
      </button>
    </div>
  )
}
