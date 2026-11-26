import { CalendarDays, Clock, FileText } from 'lucide-react'
import { formatRupees } from '@/features/payment/utils/pricing'
import { bookingTimestamp } from '@/features/ticket/utils/ticketView'

// What the status box says before / after the cancellation.
function describe(booking, cancellation) {
  if (!cancellation) return { label: 'Booking Active', style: 'bg-[#86EFAC]/70 text-emerald-700', text: 'Your booking is active. You can cancel it using the options above.' }

  const refund = `Refund of ${formatRupees(cancellation.refundAmount)} will be credited to your original payment method within 7-10 business days.`
  if (cancellation.mode === 'full') return { label: 'Booking Cancelled', style: 'bg-red-100 text-red-600', text: `Your booking has been cancelled. ${refund}` }

  const names = booking.passengers.filter((p) => cancellation.passengerKeys.includes(p.ticketNumber)).map((p) => p.first).join(', ')
  return { label: 'Passenger Cancelled', style: 'bg-amber-100 text-amber-700', text: `Cancelled: ${names}. ${refund}` }
}

// "Cancellation Status" card (Figma: 283 x 289, radius 8, border 0.76px).
export default function CancelStatusCard({ booking, cancellation }) {
  const { label, style, text } = describe(booking, cancellation)
  return (
    <section aria-live="polite" className="flex flex-col gap-4 rounded-lg border-[0.76px] border-[#E2E8F0] bg-white p-4 xl:min-h-[289px]">
      <h2 className="flex items-center gap-3 text-[13px] font-bold"><FileText size={18} /> Cancellation Status</h2>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${style}`}><Clock size={13} /> {label}</p>
        <p className="mt-2 text-[11px] leading-4 text-slate-700">{text}</p>
      </div>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className="flex items-center gap-2 text-[11px] font-medium text-[#1F4E9C]"><CalendarDays size={14} /> Last updated</p>
        <p className="mt-1 text-[11px] font-bold sm:ml-6">{bookingTimestamp(cancellation?.cancelledAt ?? booking.bookedAt)}</p>
      </div>
    </section>
  )
}
