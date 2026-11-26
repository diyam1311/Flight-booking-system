import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { PATHS, eTicketPath } from '@/config/paths'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { fullName } from '@/features/booking/utils/format'
import PriceSummaryCard from '../components/PriceSummaryCard'
import ScanToPayCard from '../components/ScanToPayCard'
import SuggestedUpi from '../components/SuggestedUpi'
import PaymentMethods from '../components/PaymentMethods'
import ProcessingModal from '../components/ProcessingModal'
import BookingConfirmedModal from '@/features/ticket/components/BookingConfirmedModal'
import { createBooking } from '@/features/ticket/services/ticketService'
import { confirmReschedule } from '@/features/reschedule/services/rescheduleService'
import usePaymentForm from '../hooks/usePaymentForm'
import { getPriceBreakdown } from '../utils/pricing'

// How long the "Processing your payment..." popup stays (demo: there is no real payment yet)
const PROCESSING_MS = 3500
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// "Payment" page (Figma frame 1441 wide). Header + Footer come from PaymentLayout.
// It opens after "Proceed to Payment" in the booking popup, which sends { search, flight, passengers, contact }.
// When the payment is done the booking is saved (new random booking ID) and the "Booking Confirmed" popup opens.
export default function PaymentPage() {
  const { state } = useLocation()

  // Opened /payment directly (no booking yet) -> back to the homepage
  if (!state?.reschedulePayment && (!state?.flight || !state?.passengers)) return <Navigate to={PATHS.home} replace />

  return <PaymentContent search={state.search} flight={state.flight} passengers={state.passengers} contact={state.contact} reschedulePayment={state.reschedulePayment} />
}

// Split in two so the hooks only run when there really is a booking to pay for.
function PaymentContent({ search, flight, passengers, contact, reschedulePayment }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const breakdown = reschedulePayment
    ? { fare: reschedulePayment.quote.ledger.total, seat: 0, fee: 0, discount: 0, total: reschedulePayment.quote.ledger.total }
    : getPriceBreakdown(flight, passengers.length)
  const travellerCount = passengers?.length || 1
  const form = usePaymentForm(fullName(passengers[0])) // the card name starts as the first passenger's name
  const [processing, setProcessing] = useState(false)
  const [booking, setBooking] = useState(null) // set when the payment is done
  const [rescheduleConfirmation, setRescheduleConfirmation] = useState(null)

  // Shows the processing popup, then saves the booking (every passenger gets own ticket) and opens the confirmed popup
  const startPayment = async () => {
    if (processing) return
    setProcessing(true)
    try {
      await wait(PROCESSING_MS)
      if (reschedulePayment) {
        const result = await confirmReschedule({
          bookingId: reschedulePayment.bookingId,
          sessionId: reschedulePayment.sessionId,
          paymentAmount: breakdown.total,
        })
        setRescheduleConfirmation(result)
      } else {
        setBooking(await createBooking(user, { search, flight, passengers, contact, breakdown }))
      }
    } finally {
      setProcessing(false)
    }
  }

  // "Proceed to Pay" and the other pay buttons. The card / bank details are checked first.
  const payWithForm = () => form.validate() && startPayment()
  // Instant UPI needs no details
  const payWithUpi = () => startPayment()

  // "replace": the back button must not lead to the payment page again (it could be paid twice)
  const goHome = () => navigate(PATHS.home, { replace: true })
  const openETicket = () => navigate(eTicketPath(booking.id), { replace: true })

  return (
    <main className="px-4 pb-4 pt-10 xl:pt-[76px]">
      {/* Figma: left column 425, 21 between the columns, right column 788.53 (the right one starts 2px lower) */}
      <div className="mx-auto flex w-[1238px] max-w-full flex-col gap-4 xl:flex-row xl:gap-[21px]">
        <div className="flex w-full shrink-0 flex-col gap-6 xl:w-[425px]">
          <PriceSummaryCard breakdown={breakdown} travellerCount={travellerCount} onPay={payWithForm} />
          <ScanToPayCard total={breakdown.total} note={`${reschedulePayment ? 'Reissue' : 'Flight'} ${flight.fromCode}-${flight.toCode} ${flight.code}`} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-10 xl:w-[788.53px] xl:flex-none xl:pt-[2px]">
          <SuggestedUpi total={breakdown.total} onPay={payWithUpi} />
          <PaymentMethods form={form} total={breakdown.total} />
        </div>
      </div>

      {processing && <ProcessingModal />}
      {booking && <BookingConfirmedModal booking={booking} onGoHome={goHome} onDownload={openETicket} />}
      {rescheduleConfirmation && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4">
          <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-navy">Reschedule payment complete</h2>
            <p className="mt-3 text-sm text-slate-600">Your reissue payment of ₹{breakdown.total.toLocaleString('en-IN')} was submitted for booking {rescheduleConfirmation.bookingId}.</p>
            <button type="button" onClick={goHome} className="mt-6 rounded-xl bg-navy px-6 py-3 font-semibold text-white">Done</button>
          </section>
        </div>
      )}
    </main>
  )
}
