import { CreditCard, Receipt } from 'lucide-react'
import { formatRupees } from '@/features/payment/utils/pricing'

// "Fare Summary" card (same size as the passenger card: 446 x 271.6). The numbers are what the user paid.
export default function FarePanel({ booking }) {
  const { fare, seat, fee, discount, total } = booking.breakdown
  const rows = [
    ['Base Fare', fare],
    ['Seat Selection', seat],
    ['Convenience Fees', fee],
    ['Discount', -discount],
  ].filter(([, amount]) => amount !== 0)

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[9px] rounded-[10px] border-[0.3px] border-black/20 bg-white p-4 lg:h-[271.6px]">
      <h2 className="flex items-center gap-2 text-[15px] font-semibold"><Receipt size={15} className="text-navy" /> Fare Summary</h2>

      <dl className="flex flex-col gap-2 border-b border-slate-100 pb-3 text-xs text-slate-600">
        {rows.map(([label, amount]) => (
          <div key={label} className="flex justify-between">
            <dt>{label}</dt>
            <dd>{amount < 0 ? `-${formatRupees(-amount)}` : formatRupees(amount)}</dd>
          </div>
        ))}
      </dl>

      <p className="flex items-center justify-between text-[15px] font-bold"><span>Total Amount Paid</span><span>{formatRupees(total)}</span></p>

      <div className="mt-auto flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 text-[11px]">
        <span className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-orange-100 text-brand"><CreditCard size={14} /></span>
          <span><span className="block text-[10px] text-slate-400">Payment Method</span><b>{booking.paymentMethod ?? 'Online'}</b></span>
        </span>
        <span className="text-right"><span className="block text-[10px] text-slate-400">Payment Status</span><b className="text-emerald-600">Successful</b></span>
      </div>
    </section>
  )
}
