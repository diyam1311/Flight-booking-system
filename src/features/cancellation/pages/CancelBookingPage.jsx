import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react'
import { PATHS, bookingDetailsPath } from '@/config/paths'
import BookingDetailsCard from '../components/BookingDetailsCard'
import CancelStatusCard from '../components/CancelStatusCard'
import CancellationOptions from '../components/CancellationOptions'
import CancellationReason from '../components/CancellationReason'
import ConfirmCancelModal from '../components/ConfirmCancelModal'
import FareSummaryCard from '../components/FareSummaryCard'
import { useCancelBooking } from '../hooks/useCancelBooking'

// "Cancel Booking" page (Figma frame 1440 wide). Navbar + Footer come from MainLayout.
// Opens from "Cancellation" in the menu of the My Booking page: /cancel/:bookingId
// Left: booking, how to cancel, why. Right: what was paid, the red button, the status.
// All data comes from the booking itself + services/cancellationService.js (demo now, the real backend later).
export default function CancelBookingPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const cancel = useCancelBooking(bookingId)
  const [asking, setAsking] = useState(false) // the "Are you sure?" popup is open
  const [showProblem, setShowProblem] = useState(false)

  if (cancel.booking === undefined) return <main className="min-h-[600px]" />
  if (cancel.booking === null) return <Navigate to={PATHS.manageBooking} replace /> // no such booking -> back to the search box

  const { booking, cancellation } = cancel
  const done = Boolean(cancellation)

  const askToCancel = () => {
    if (cancel.problem) return setShowProblem(true)
    setShowProblem(false)
    setAsking(true)
  }
  const confirm = async () => {
    const cancelled = await cancel.submit()
    setAsking(false)
    if (cancelled) navigate(PATHS.home, { replace: true })
  }

  return (
    <main className="px-4 pb-12 pt-5">
      <div className="mx-auto max-w-[1240px]">
        <Link to={bookingDetailsPath(booking.id)} className="inline-flex items-center gap-3 text-xs hover:text-navy"><ArrowLeft size={18} /> Back To My Booking</Link>

        <div className="mt-6 max-w-[652px]">
          <h1 className="text-[32px] font-semibold leading-10 sm:text-[44px] sm:leading-[54px]">Cancel Booking</h1>
          <p className="text-base leading-[22px] text-slate-700">Select your cancellation option and provide the reason for cancellation.</p>
        </div>

        <div className="mt-5 flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-[30px]">
          {/* left column: 927 wide */}
          <div className="flex min-w-0 flex-col gap-[30px] xl:w-[927px] xl:shrink-0">
            <BookingDetailsCard booking={booking} />
            <div className="xl:mt-5">
              <CancellationOptions mode={cancel.mode} onModeChange={cancel.setMode} passengers={booking.passengers} keys={cancel.passengerKeys} onTogglePassenger={cancel.togglePassenger} disabled={done} />
            </div>
            <CancellationReason reason={cancel.reason} onReasonChange={cancel.setReason} disabled={done} />
          </div>

          {/* right column: 283 wide */}
          <aside className="flex min-w-0 flex-col gap-6 xl:w-[283px] xl:shrink-0">
            <FareSummaryCard booking={booking} />
            <div>
              <button type="button" onClick={askToCancel} disabled={done} className="flex h-10 w-full items-center justify-between rounded-lg bg-[#E00000] px-4 text-xs font-semibold text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
                <Trash2 size={14} />
                {done ? (cancellation.mode === 'full' ? 'Booking Cancelled' : 'Passenger Cancelled') : 'Cancel Booking'}
                <ArrowRight size={14} />
              </button>
              {showProblem && cancel.problem && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{cancel.problem}</p>}
              {cancel.error && <p role="alert" className="mt-2 text-xs font-medium text-red-600">{cancel.error}</p>}
            </div>
            <CancelStatusCard booking={booking} cancellation={cancellation} />
          </aside>
        </div>
      </div>

      {asking && <ConfirmCancelModal title={cancel.mode === 'full' ? 'Cancel this booking?' : 'Cancel the selected passengers?'} busy={cancel.busy} onConfirm={confirm} onClose={() => setAsking(false)} />}
    </main>
  )
}
