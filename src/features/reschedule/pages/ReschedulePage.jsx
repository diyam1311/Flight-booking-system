import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PATHS } from '@/config/paths'
import ConfirmStep from '../components/ConfirmStep'
import RescheduleHeader from '../components/RescheduleHeader'
import RescheduleStepper from '../components/RescheduleStepper'
import SelectFlightStep from '../components/SelectFlightStep'
import VerificationStep from '../components/VerificationStep'
import { useRescheduleChat } from '../hooks/useRescheduleChat'
import { useRescheduleFlow } from '../hooks/useRescheduleFlow'

// "Reschedule / Change Flight" page (Figma frames 1440 wide). Navbar + Footer come from MainLayout.
// Opens from "Reschedule" in the menu of the My Booking page: /reschedule/:bookingId
// One page, 3 steps - the part under the step bar is replaced as the user moves on:
//   1 Select Flight  ->  "Select & Chat With Us"  ->  2 Airline Verification (chat)  ->  3 Confirmation
// All data comes from services/rescheduleService.js (demo data now, the real backend later).
export default function ReschedulePage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const flow = useRescheduleFlow(bookingId)
  const chat = useRescheduleChat(flow.session) // lives here so the chat is still there when the user comes back from step 3

  // every new step starts at the top of the page
  useEffect(() => { window.scrollTo({ top: 0 }) }, [flow.step])

  const goToPayment = () => {
    const flight = flow.session?.selectedFlight
    const date = flow.session?.selectedDate
    if (!flight || !flow.quote) return
    navigate(PATHS.payment, {
      state: {
        reschedulePayment: { bookingId, sessionId: flow.session.id, quote: flow.quote },
        flight: {
          code: flight.flightNo,
          fromCode: flight.from.code,
          toCode: flight.to.code,
          airline: flight.airline,
          baseFare: flight.baseFare,
        },
        search: { departureDate: date?.long, origin: flight.from.code, destination: flight.to.code },
        passengers: [{ firstName: flow.offer?.itinerary?.passengerName || 'Passenger', lastName: '' }],
        contact: {},
      },
    })
  }

  return (
    <main className="pb-12 pt-7">
      <RescheduleHeader onBack={() => navigate(-1)} />
      <RescheduleStepper current={flow.step} onStepClick={flow.goBackTo} />

      <div className="mx-auto mt-12 min-h-[600px] max-w-[1240px] px-4 xl:px-0">
        {flow.error && <p role="alert" className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{flow.error}</p>}

        {flow.step === 1 && flow.offer && (
          <SelectFlightStep offer={flow.offer} dateId={flow.dateId} onDateChange={flow.setDateId} flights={flow.flights} onSelectFlight={flow.selectFlight} busy={flow.busy} />
        )}
        {flow.step === 2 && <VerificationStep session={flow.session} chat={chat} onNext={flow.viewFinalQuote} busy={flow.busy} />}
        {flow.step === 3 && <ConfirmStep quote={flow.quote} onConfirm={goToPayment} onReturnToChat={flow.goToChat} busy={flow.busy} />}
      </div>
    </main>
  )
}
