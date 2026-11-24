import { useNavigate } from 'react-router-dom'
import { Plane, CalendarCheck, Info, ArrowRight } from 'lucide-react'
import useSearchForm from '@/features/search/hooks/useSearchForm'
import PassengerDropdown from '@/features/search/components/PassengerDropdown'
import SearchFieldsRow from '@/features/search/components/SearchFieldsRow'
import { TRIP_TYPES, CABIN_CLASSES } from '@/features/search/data/searchOptions'
import { PATHS } from '@/config/paths'

// The big search box on the homepage. All its state and rules live in useSearchForm.
export default function SearchCard() {
  const navigate = useNavigate()
  const searchForm = useSearchForm()
  const { form, setTrip, setCabin, setPax, getSearch } = searchForm

  const handleSearch = () => {
    // Open the "Searching Flights..." page. If the user is not logged in, ProtectedRoute sends them
    // to /login first and brings them back here (with this search) right after they log in.
    navigate(PATHS.searching, { state: { search: getSearch() } })
  }

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Flights / Manage Booking / Flight Status – row height 45, padding-x 12, gap 4 */}
      <div className="flex h-[45px] items-stretch gap-1 px-3 text-xs font-medium text-white/80">
        <button className="flex min-w-[135px] items-center justify-center gap-2 rounded-t-xl bg-brand px-[22px] text-white"><Plane size={14} /> Flights</button>
        <button type="button" onClick={() => navigate(PATHS.manageBooking)} className="hidden items-center gap-2 px-[22px] hover:text-white sm:flex"><CalendarCheck size={14} /> Manage Booking</button>
        <button className="hidden items-center gap-2 px-[22px] sm:flex"><Info size={14} /> Flight Status</button>
      </div>

      {/* Card: 1200 x 255, radius 20, shadow 0 8 40 8% */}
      <div className="relative rounded-[20px] bg-white p-5 pb-20 shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:h-[255px] lg:px-[37px] lg:pb-0 lg:pt-[37px]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex rounded-xl bg-slate-100 p-1.5 text-xs font-medium">
            {TRIP_TYPES.map((t) => (
              <button key={t} type="button" onClick={() => setTrip(t)}
                className={`rounded-lg py-3 ${form.trip === t ? 'bg-brand px-8 text-white' : 'px-5'}`}>{t}</button>
            ))}
          </div>
          <PassengerDropdown pax={form.pax} setPax={setPax} />
          <select value={form.cabin} onChange={(e) => setCabin(e.target.value)} aria-label="Cabin class" className="bg-transparent pr-6 text-[11px] font-medium outline-none">
            {CABIN_CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* From | To | Departure | Return + calendar */}
        <SearchFieldsRow variant="home" searchForm={searchForm} className="mt-6 lg:mt-[30px]" />

        {/* Button 206.12 x 54.5, hangs 22px below the card, 29px from the right */}
        <button type="button" onClick={handleSearch}
          className="absolute bottom-4 right-5 flex h-[54.5px] w-[206.12px] items-center justify-center gap-2 rounded-lg bg-navy text-[13px] font-medium text-white transition hover:brightness-110 lg:-bottom-[22px] lg:right-[29px]">
          Search Flights <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
