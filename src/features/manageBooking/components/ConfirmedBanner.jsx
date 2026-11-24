import { useState } from 'react'
import { Check, CircleCheck, Copy } from 'lucide-react'
import { ticketDate } from '@/features/ticket/utils/ticketView'

// Dark blue banner of the My Booking page (Figma: 1242 x 92, radius 20, padding 24 / 16, gap 48, navy).
// Shows the booking reference (the same ID the e-ticket shows) and the day the booking was made.
export default function ConfirmedBanner({ booking }) {
  const [copied, setCopied] = useState(false)

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(booking.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* the browser blocked copying: nothing to do */
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-[20px] bg-navy px-4 py-6 text-white lg:h-[92px] lg:flex-row lg:items-center lg:gap-12 lg:py-0">
      <div className="flex items-center gap-3">
        <CircleCheck size={34} className="shrink-0 text-emerald-300" />
        <div>
          <p className="text-base font-bold leading-5">Booking Confirmed</p>
          <p className="text-[11px] leading-4 text-white/70">Your flight is confirmed and ready for travel.</p>
        </div>
      </div>

      <div className="border-white/20 lg:border-l lg:pl-12">
        <p className="text-[10px] font-medium uppercase leading-3 tracking-wide text-white/70">PNR / Booking Reference</p>
        <p className="flex items-center gap-2 text-base font-bold leading-6" data-testid="details-booking-id">
          {booking.id}
          <button type="button" onClick={copyId} aria-label="Copy booking reference" className="text-white/80 hover:text-white">
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </p>
      </div>

      <div className="border-white/20 lg:border-l lg:pl-12">
        <p className="text-[10px] font-medium uppercase leading-3 tracking-wide text-white/70">Booking Date</p>
        <p className="text-base font-bold leading-6">{ticketDate(booking.bookedAt.slice(0, 10))}</p>
      </div>
    </section>
  )
}
