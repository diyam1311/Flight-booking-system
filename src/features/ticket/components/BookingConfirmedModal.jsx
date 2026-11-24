import { useEffect, useState } from 'react'
import { ArrowLeft, Check, Copy, Download } from 'lucide-react'
import { SUPPORT_EMAIL } from '../data/ticketData'

// "Booking Confirmed!" popup (Figma: 550 wide, about 547 high, radius 8, border 1, padding 16).
// It opens when the payment is done. The user cannot close it, he has to pick one of the two buttons.
//   booking : the new booking (its ID is shown)
//   onGoHome() : "Go to Home"        onDownload() : "Download Ticket" (opens the e-ticket page)
export default function BookingConfirmedModal({ booking, onGoHome, onDownload }) {
  const [copied, setCopied] = useState(false)

  // the page behind the popup does not scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(booking.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // the browser blocked the clipboard: nothing to do, the ID is still on the screen
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-900/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-confirmed-title"
        className="m-auto w-[550px] max-w-full rounded-lg border border-[#C4C6D2]/60 bg-white p-4 shadow-2xl"
      >
        {/* animated radar with a tick (128 x 128) */}
        <div aria-hidden className="relative mx-auto h-[128px] w-[128px]">
          {[0, 0.66, 1.33].map((delay) => (
            <span key={delay} style={{ animationDelay: `${delay}s` }} className="absolute inset-0 animate-radar rounded-full border-2 border-teal-300 bg-teal-100/60" />
          ))}
          <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal-300 text-white">
            <Check size={18} strokeWidth={3} />
          </span>
        </div>

        <h2 id="booking-confirmed-title" className="mt-1 pt-5 text-center text-[28px] font-bold leading-9">Booking Confirmed!</h2>

        <div className="mx-auto mt-2 max-w-[448px] text-center">
          <p className="text-sm leading-5 text-slate-700">Thank you for booking with <span className="font-bold text-navy">Mobiyantra</span></p>
          <p className="mx-auto mt-1 max-w-[360px] text-xs leading-[19px] text-slate-400">
            Your e-ticket, passenger manifest, and invoice have been dispatched to your email. Please check your inbox.
          </p>
        </div>

        {/* the booking ID (448 x 85.33) */}
        <div className="mx-auto mt-[29px] h-[85.33px] w-[448px] max-w-full rounded-2xl border border-[#C4C6D2]/60 bg-[#EFF4FF] px-5 py-[19px] text-center">
          <p className="text-xs font-medium uppercase leading-4 tracking-[0.05em] text-slate-600">Booking ID / Reference PNR</p>
          <p className="mt-1 flex h-[25.33px] items-center justify-center gap-2 text-xs font-bold">
            {booking.id}
            <button type="button" onClick={copyId} aria-label="Copy booking ID" className="text-slate-500 hover:text-navy">
              {copied ? <Check size={13} /> : <Copy size={13} />}
            </button>
          </p>
        </div>

        {/* two buttons, 217 x 44 each, 14 apart */}
        <div className="mx-auto mt-[34px] flex w-[448px] max-w-full gap-[14px]">
          <button
            type="button"
            onClick={onGoHome}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-orange-600 bg-white text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
          >
            <ArrowLeft size={14} /> Go to Home
          </button>
          <button
            type="button"
            onClick={onDownload}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-navy text-sm font-semibold text-white transition hover:brightness-110"
          >
            <Download size={14} /> Download Ticket
          </button>
        </div>

        <p className="mt-[25px] pb-[22px] text-center text-xs leading-4 text-slate-500">
          Need help? <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-navy">Contact our support</a>
        </p>
      </div>
    </div>
  )
}
