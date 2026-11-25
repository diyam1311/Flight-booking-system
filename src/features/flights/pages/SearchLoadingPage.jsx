import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Plane } from 'lucide-react'
import UserMenu from '@/features/auth/components/UserMenu'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'
import logo from '@/assets/logos/logo.svg'
import { searchFlights } from '../services/flightService'

// "Searching Flights..." screen (Figma frame 1440 x 768).
// It calls the search service, then opens the results page.
export default function SearchLoadingPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const search = useLocation().state?.search // sent by the Search Flights button

  const [progress, setProgress] = useState(5) // progress bar, 0 - 100
  const [failed, setFailed] = useState(false)

  // 1) Ask the service for flights, then show the results page
  useEffect(() => {
    if (!search) return
    let stopped = false // so we do nothing if the user already left this page
    searchFlights(search)
      .then((result) => {
        if (!stopped) navigate(PATHS.searchResults, { replace: true, state: { search, ...result } })
      })
      .catch(() => {
        if (!stopped) setFailed(true)
      })
    return () => { stopped = true }
  }, [search, navigate])

  // 2) Move the progress bar a little every 0.1 second (it waits at 90% until the flights arrive)
  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => Math.min(p + 3, 90)), 100)
    return () => clearInterval(timer)
  }, [])

  // Opened /searching directly (no search details) -> back to the homepage
  if (!search) return <Navigate to={PATHS.home} replace />

  return (
    <div className="min-h-screen bg-white">
      {/* Header: 1440 x 85.3, padding 20 / 104, logo on the left and the user on the right */}
      <header className="border-b-[0.3px] border-black/10">
        <div className="mx-auto flex h-[85.3px] max-w-[1440px] items-center justify-between px-4 md:px-10 xl:px-[104px]">
          <Link to={PATHS.home}><img src={logo} alt="Mobiyantra" className="h-7 w-auto sm:h-[36.36px]" /></Link>
          <UserMenu user={user} onLogout={logout} />
        </div>
      </header>

      {/* Container: 527 x 359, starts 204px from the top of the frame (header 85 + 119) */}
      <main className="mx-auto mt-16 flex min-h-[359px] w-full max-w-[527px] flex-col items-center px-4 text-center md:mt-[119px] md:px-0">
        {/* Spinning ring with a plane in the middle */}
        <div className="relative mt-[15px] h-20 w-20">
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-slate-200 border-t-navy" />
          <Plane size={28} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 fill-navy text-navy" />
        </div>

        <h1 className="mt-[21px] text-[30px] font-bold leading-9 text-navy">
          {failed ? 'Something went wrong' : 'Searching Flights...'}
        </h1>
        <p className="mt-2 text-base leading-6 text-slate-600">
          {failed
            ? 'We could not load the flights right now. Please try again.'
            : `Finding the best fares for ${search.from.city} (${search.from.code}) → ${search.to.city} (${search.to.code})`}
        </p>

        {failed ? (
          <Link to={PATHS.home} className="mt-[45px] rounded-lg bg-navy px-6 py-3 text-[13px] font-medium text-white">
            Back to home
          </Link>
        ) : (
          <>
            {/* Progress bar: 333 wide, 4 high */}
            <div className="mt-[45px] h-1 w-[333px] max-w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-navy transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-6 text-xs leading-3 text-slate-400">Please wait, this will only take a moment.</p>
          </>
        )}
      </main>
    </div>
  )
}
