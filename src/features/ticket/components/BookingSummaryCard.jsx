import { Check, ClipboardList } from 'lucide-react'
import { formatRupees } from '@/features/payment/utils/pricing'

// "Booking Summary" card: what was paid (Figma: 370 wide, radius 8, about 396 high).  breakdown : { fare, seat, fee, discount, total }
export default function BookingSummaryCard({ breakdown, paidOn }) {
  const rows = [
    ['Base Fare', formatRupees(breakdown.fare)],
    ['Seat Selection', formatRupees(breakdown.seat)],
    ['Convenience Fees', formatRupees(breakdown.fee)],
    ['Special Discount', `- ${formatRupees(breakdown.discount)}`],
  ]

  return (
    <section className="rounded-lg border border-[#E2E8F0] bg-white p-[10px] pb-3">
      <h2 className="mt-3 flex items-center gap-4 pl-2 text-lg font-semibold leading-6">
        <ClipboardList size={22} className="text-navy" /> Booking Summary
      </h2>

      <ul className="mx-[26px] mt-[14px]">
        {rows.map(([label, amount]) => (
          <li key={label} className="flex h-[47px] items-center justify-between border-b border-slate-100 text-base">
            <span className="text-slate-700">{label}</span>
            <span className="font-medium">{amount}</span>
          </li>
        ))}
      </ul>

      <p className="mt-[27px] flex items-center justify-between pl-[9px] pr-[31px] text-xl font-bold leading-7">
        <span>Total Paid</span>
        <span>{formatRupees(breakdown.total)}</span>
      </p>

      <div className="mx-2 mb-4 mt-[18px] flex h-[47px] items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-[13px]">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green-600 text-white"><Check size={12} strokeWidth={3} /></span>
        <div>
          <p className="text-sm font-medium leading-[17px] text-green-600">Payment Successful !</p>
          <p className="text-[8px] leading-[10px] text-slate-500">Paid on {paidOn}</p>
        </div>
      </div>
    </section>
  )
}
