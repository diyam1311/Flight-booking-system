import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { MAX_PASSENGERS } from '@/features/search/data/searchOptions'
import { PATHS } from '@/config/paths'
import worldMap from '@/assets/images/world-map.png'
import PassengerForm from '../components/PassengerForm'
import TextField from '../components/TextField'
import BookingSummaryModal from '../components/summary/BookingSummaryModal'
import useTravellerForm from '../hooks/useTravellerForm'
import { getSavedTravellers, saveTravellers } from '../services/bookingService'

// It opens when "Select Flight" is clicked on the results page, which sends { search, flight } in the router state.
export default function TravellerDetailsPage() {
  const { state } = useLocation()

  // Opened /traveller-details directly (no flight chosen) -> back to the homepage
  if (!state?.search || !state?.flight) return <Navigate to={PATHS.home} replace />

  return <TravellerDetailsForm search={state.search} flight={state.flight} />
}

// Split in two so the form's hooks only run when there really is a flight to book.
function TravellerDetailsForm({ search, flight }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const form = useTravellerForm(search)
  const { passengers, contact, errors } = form

  const [saved, setSaved] = useState([]) // saved travellers of this user
  const [submitting, setSubmitting] = useState(false)
  const [showSummary, setShowSummary] = useState(false) // the "Booking Details Confirmed" popup

  useEffect(() => {
    let stopped = false // so we do nothing if the user already left this page
    getSavedTravellers(user).then((list) => { if (!stopped) setSaved(list) })
    return () => { stopped = true }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.validate()) {
      // jump to the first box with a problem (after React has drawn the error messages)
      setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0)
      return
    }

    setSubmitting(true)
    try {
      // remember the passengers whose "Save this traveller" box is ticked (with the email + mobile of this booking)
      setSaved(await saveTravellers(user, passengers.filter((p) => p.save), contact))
      setShowSummary(true) // let the user check everything once more
    } finally {
      setSubmitting(false)
    }
  }

  // "Proceed to Payment": open the payment page (step 3) and send it this booking
  const proceedToPayment = () => navigate(PATHS.payment, { state: { search, flight, passengers, contact } })

  return (
    <main className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-full max-w-[1440px] overflow-hidden">
        <img src={worldMap} alt="" className="absolute right-0 top-[505px] hidden w-[532px] lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-8 md:px-6 lg:pb-[125px] lg:pt-[68px] xl:px-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back to search results"
            className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-600 hover:text-navy"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold leading-7">Passenger Details</h1>
            <p className="mt-px text-xs leading-[13px] text-slate-500">Names must match the government ID exactly.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 rounded-[40px] bg-white px-5 py-8 sm:px-10 lg:px-[58px] lg:pb-[76px] lg:pt-[33px]">
          <div className="flex flex-col gap-8">
            {passengers.map((p, i) => (
              <div key={p.key} className={i > 0 ? 'border-t border-slate-100 pt-8' : ''}>
                <PassengerForm
                  passenger={p}
                  number={i + 1}
                  errors={errors.passengers[p.key] ?? {}}
                  // hide people already picked for another passenger of this booking
                  savedTravellers={saved.filter((s) => s.id === p.savedId || !passengers.some((other) => other.savedId === s.id))}
                  onChange={form.editPassenger}
                  onTitle={form.setTitle}
                  onPick={form.pickSavedTraveller}
                  onClear={form.clearPassenger}
                  onRemove={form.removePassenger}
                />
              </div>
            ))}
          </div>

          {/* + Add Another Passenger (Figma: 288 x 38) */}
          <button
            type="button"
            onClick={form.addPassenger}
            disabled={!form.canAddPassenger}
            className="mt-7 flex h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-navy/60 text-sm font-medium text-navy transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:w-[288px]"
          >
            <Plus size={14} /> Add Another Passenger
          </button>
          {!form.canAddPassenger && <p className="mt-2 text-xs text-slate-400">You can book up to {MAX_PASSENGERS} passengers at a time.</p>}

          {/* Contact (Email + Mobile 288 wide, gap 14) and the Continue button (324 x 38) */}
          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-[14px] sm:flex-row">
              <div className="w-full sm:w-[288px]">
                <TextField id="contact-email" type="email" label="Email" placeholder="you@example.com"
                  value={contact.email} onChange={(e) => form.editContact('email', e.target.value)} error={errors.contact.email} />
              </div>
              <div className="w-full sm:w-[288px]">
                <TextField id="contact-mobile" type="tel" inputMode="tel" label="Mobile Number" placeholder="+91 9876543210"
                  value={contact.mobile} onChange={(e) => form.editContact('mobile', e.target.value)} error={errors.contact.mobile} />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex h-[38px] w-full items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:brightness-110 disabled:opacity-70 lg:w-[324px]"
            >
              {submitting ? 'Saving…' : <>Continue <ArrowRight size={14} /></>}
            </button>
          </div>
        </form>
      </div>

      {showSummary && (
        <BookingSummaryModal
          flight={flight}
          search={search}
          passengers={passengers}
          onClose={() => setShowSummary(false)}
          onProceed={proceedToPayment}
        />
      )}
    </main>
  )
}
