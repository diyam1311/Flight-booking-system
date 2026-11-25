import { Check } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PATHS } from '@/config/paths'

const STEPS = ['Flight Selected', 'Passenger Details', 'Payment & Confirmation']

function completedSteps(pathname, booking) {
  if (!booking?.search || ![PATHS.travellerDetails, PATHS.payment].includes(pathname)) return []
  const flights = booking.results
    ? { to: PATHS.searchResults, state: booking.results }
    : { to: PATHS.searching, state: { search: booking.search } }
  return pathname === PATHS.payment ? [flights, { to: PATHS.travellerDetails, state: booking }] : [flights]
}

export default function BookingStepper({ current }) {
  const { state, pathname } = useLocation()
  const navigate = useNavigate()
  const destinations = completedSteps(pathname, state)
  const progress = `Step ${current} of ${STEPS.length}`
  return (
    <>
      {destinations.length ? (
        <select aria-label="Booking steps" value={current} className="min-w-0 max-w-24 bg-transparent text-xs font-semibold text-navy xl:hidden"
          onChange={event => {
            const { to, state } = destinations[event.target.selectedIndex]
            navigate(to, { state })
          }}>
          {destinations.map((destination, i) => <option key={destination.to} value={i + 1}>{STEPS[i]}</option>)}
          <option value={current} disabled>{progress}</option>
        </select>
      ) : <p className="text-xs font-semibold text-navy xl:hidden">{progress}</p>}

      <ol className="hidden items-center gap-[22px] text-xs xl:flex" aria-label="Booking steps">
        {STEPS.map((label, i) => {
          const step = i + 1
          const done = step < current
          const isCurrent = step === current
          const destination = destinations[i]
          const StepLabel = destination ? Link : 'span'
          return (
            <li key={label} className="flex items-center gap-[22px]" aria-current={isCurrent ? 'step' : undefined}>
              <StepLabel {...destination} className={`flex shrink-0 items-center gap-2 whitespace-nowrap ${destination ? 'rounded hover:underline focus-visible:outline-navy' : ''}`}>
                {done && <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand"><Check size={11} strokeWidth={3} /></span>}
                {isCurrent && <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">{step}</span>}
                {/* the current step already shows its number in the circle */}
                <span className={isCurrent ? 'font-bold text-navy' : 'text-slate-400'}>{isCurrent ? label : `${step}. ${label}`}</span>
              </StepLabel>
              {/* line to the next step: navy when it leads into the current step, faded orange otherwise */}
              {step < STEPS.length && <span className={`h-0.5 w-[47px] ${step + 1 === current ? 'bg-navy' : 'bg-brand/20'}`} />}
            </li>
          )
        })}
      </ol>
    </>
  )
}
