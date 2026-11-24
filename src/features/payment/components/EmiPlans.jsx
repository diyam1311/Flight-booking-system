import { Info } from 'lucide-react'
import { EMI_MONTHS } from '../data/paymentOptions'
import { emiPerMonth, formatRupees } from '../utils/pricing'

// "Select EMI Plan": 3, 6 or 9 months (Figma: rows 44 high, 13 apart). The amount per month is worked out from the total.
export default function EmiPlans({ total, months, onChange }) {
  return (
    <div className="pl-[25px] pr-[18px]">
      <p className="flex items-center gap-1.5 text-xs text-slate-600">Select EMI Plan <Info size={13} className="text-blue-500" /></p>

      <div role="radiogroup" aria-label="EMI plan" className="mt-3 flex flex-col gap-[13px]">
        {EMI_MONTHS.map((m) => {
          const selected = m === months
          return (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(m)}
              className={`flex h-[44px] items-center justify-between rounded-xl border px-4 text-left ${
                selected ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-3 text-xs font-semibold">
                <span className={`grid h-[18px] w-[18px] place-items-center rounded-full border ${selected ? 'border-emerald-500' : 'border-slate-300'}`}>
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />}
                </span>
                {m} Months
              </span>
              <span className="flex items-center gap-3">
                <span className="text-xs font-bold">{formatRupees(emiPerMonth(total, m))}/month</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-[3px] text-[10px] font-semibold text-emerald-600">No Cost EMI</span>
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-[17px] flex items-center gap-1.5 text-xs text-slate-400">
        <Info size={13} className="text-slate-500" /> <b className="font-semibold text-slate-700">No extra charges.</b> Interest free (as per bank terms).
      </p>
    </div>
  )
}
