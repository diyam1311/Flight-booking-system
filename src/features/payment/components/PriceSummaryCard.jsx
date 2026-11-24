import { Lock, ShieldCheck } from 'lucide-react'
import { formatRupees } from '../utils/pricing'

// "Total Due" card (Figma: 425 x 373, radius 16, border 1px; title row 308, price rows 296 x 32, button 332 x 48).
//   breakdown : { fare, seat, fee, discount, total } from getPriceBreakdown()
//   onPay()   : "Proceed to Pay" button
export default function PriceSummaryCard({ breakdown, travellerCount, onPay }) {
  const { fare, seat, fee, discount, total } = breakdown

  return (
    <section className="flex h-[373px] w-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-[10px] xl:w-[425px]">
      {/* title + amount, with a thin line under them */}
      <div className="mx-auto mt-[13px] flex h-8 w-full max-w-[308px] items-center justify-between">
        <h2 className="text-2xl font-bold">Total Due</h2>
        <p className="text-[22px] font-bold text-emerald-600">{formatRupees(total)}</p>
      </div>
      <div className="mx-auto mt-[10px] w-full max-w-[320px] border-t border-slate-100" />

      {/* price lines: 296 wide, every row 32 high with 10 between (the area keeps its height, so the button never moves) */}
      <dl className="mx-auto mt-3 flex min-h-[163px] w-full max-w-[296px] flex-col gap-[10px]">
        <Row label={travellerCount > 1 ? `Fare (${travellerCount} travellers)` : 'Fare'} value={formatRupees(fare)} />
        <Row label="Seat" value={formatRupees(seat)} />
        <Row label="Convenience Fees" value={formatRupees(fee)} />
        {discount > 0 && <Row label="SPECIAL" value={`-${formatRupees(discount)}`} className="text-lg text-emerald-400" />}
      </dl>

      <button
        type="button"
        onClick={onPay}
        className="mx-auto mt-[29px] flex h-12 w-full max-w-[332px] items-center justify-center gap-2 rounded-xl bg-navy text-sm font-semibold text-white transition hover:brightness-110"
      >
        <Lock size={14} /> Proceed to Pay {formatRupees(total)}
      </button>

      <p className="mt-[11px] flex items-center justify-center gap-1.5 text-xs leading-4 text-emerald-600">
        <ShieldCheck size={13} /> 100% Safe &amp; Secure Payment Gateway
      </p>
    </section>
  )
}

function Row({ label, value, className = '' }) {
  return (
    <div className={`flex h-8 items-center justify-between text-base ${className}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
