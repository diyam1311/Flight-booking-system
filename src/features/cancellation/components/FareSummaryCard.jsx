import { CheckCircle2, ClipboardList } from 'lucide-react'
import { formatRupees } from '@/features/payment/utils/pricing'
import { bookingTimestamp } from '@/features/ticket/utils/ticketView'

// "Fare Summary" card (Figma: 283 x 302, radius 8, border 0.76px). The numbers are what the user really paid:
// they are the same ones as in My Booking and in the reschedule page.
export default function FareSummaryCard({ booking }) {
  const { fare, seat, fee, discount, total } = booking.breakdown
  const rows = [['Base Fare', fare], ['Seat Selection', seat], ['Airport taxes & fees', fee], ['Discount', -discount]].filter(([, amount]) => amount !== 0)

  return (
    <section className="flex flex-col gap-3 rounded-lg border-[0.76px] border-[#E2E8F0] bg-white p-4 xl:min-h-[302px]">
      <h2 className="flex items-center gap-2 text-[13px] font-bold"><ClipboardList size={15} /> Fare Summary</h2>

      <dl className="flex flex-col px-2 text-xs text-slate-600">
        {rows.map(([label, amount]) => (
          <div key={label} className="flex justify-between border-b border-slate-100 py-[9px]">
            <dt>{label}</dt>
            <dd className="font-medium text-slate-900">{amount < 0 ? `- ${formatRupees(-amount)}` : formatRupees(amount)}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-1 flex items-center justify-between text-sm font-bold"><span>Total Paid</span><span className="text-base">{formatRupees(total)}</span></p>

      <div className="flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2">
        <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
        <div>
          <p className="text-[11px] font-semibold leading-4 text-emerald-600">Payment Successful !</p>
          <p className="text-[8px] leading-3 text-slate-400">Paid on {bookingTimestamp(booking.bookedAt)}</p>
        </div>
      </div>
    </section>
  )
}
