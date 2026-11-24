import { useEffect } from 'react'
import { ArrowRight, BriefcaseBusiness, FilePenLine, X } from 'lucide-react'
import FlightSummaryCard from './FlightSummaryCard'
import PassengerSummary from './PassengerSummary'

// "Booking Details Confirmed" popup (Figma: 501 wide, radius 20, padding 24, gap 20, about 808 tall).
// Opens after Continue on the Traveller Details page, so the user can check everything once more.
//   flight, search, passengers : the real values of this booking
//   onClose()   : X button, Escape key or a click on the dark background (the user goes back to edit)
//   onProceed() : "Proceed to Payment"
export default function BookingSummaryModal({ flight, search, passengers, onClose, onProceed }) {
  // Escape closes the popup, and the page behind it does not scroll while it is open
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    // The dark background scrolls if the screen is shorter than the popup. The popup itself never shrinks,
    // so its size always matches Figma. "m-auto" centres it (and keeps its top reachable on small screens).
    <div onClick={onClose} className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-900/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-summary-title"
        onClick={(e) => e.stopPropagation()} // clicking inside the popup must not close it
        className="relative m-auto flex w-[501px] max-w-full flex-col gap-5 rounded-[20px] bg-white p-6 shadow-2xl"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 text-slate-300 hover:text-slate-500">
          <X size={16} />
        </button>

        {/* icon, title, short text (Figma: 453 x 130) */}
        <header className="flex h-[130px] flex-col items-center pt-1 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-brand">
            <FilePenLine size={22} />
          </span>
          <h2 id="booking-summary-title" className="mt-5 text-base font-bold leading-[22px]">Booking Details Confirmed</h2>
          <p className="mt-1.5 max-w-[283px] text-xs leading-[13px] text-slate-400">
            Please review your booking details once again. You can proceed to payment to complete your booking.
          </p>
        </header>

        <FlightSummaryCard flight={flight} search={search} />
        <PassengerSummary passengers={passengers} />

        {/* baggage is the same for every flight for now (Figma: 453 x 39) */}
        <div className="flex items-center gap-3 border-t border-slate-100 pt-[10px]">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
            <BriefcaseBusiness size={15} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium leading-4">Baggage &amp; Add-ons</p>
            <p className="text-xs leading-3 text-slate-400">Checked Baggage (15kg) + Cabin (7kg)</p>
          </div>
          <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-[13px] leading-4 text-emerald-600">Included</span>
        </div>

        {/* Figma: 20px space above the button, 51.5px high */}
        <button
          type="button"
          onClick={onProceed}
          className="mt-5 flex h-[51.5px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-navy text-sm font-semibold text-white transition hover:brightness-110"
        >
          Proceed to Payment <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
