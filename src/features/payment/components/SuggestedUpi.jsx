import { ChevronRight, Sparkles } from 'lucide-react'
import { formatRupees } from '../utils/pricing'

// "SUGGESTED OPTIONS" (Figma: green box 787.39 x 179.13, radius 18, padding 22.3, UPI card 87.73 high, border 1.13).
// Instant UPI needs nothing typed in, so clicking the card pays straight away.
export default function SuggestedUpi({ total, onPay }) {
  return (
    <section>
      <h2 className="pl-[11px] text-[15px] font-bold uppercase leading-4 tracking-wide">Suggested Options</h2>

      <div className="mt-[13px] flex min-h-[179.13px] w-full flex-col gap-[16.5px] rounded-[18px] border-[1.13px] border-[#A7F3D0] bg-gradient-to-r from-[#ECFDF5] via-[#F0FBFC] to-[#ECFDF5] p-[22.32px] xl:w-[787.39px]">
        <p className="flex min-h-7 w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 text-[13.5px] font-semibold text-emerald-700">
          <Sparkles size={14} /> Get instant corporate discount on UPI of ₹ 50
        </p>

        <button
          type="button"
          onClick={onPay}
          className="flex min-h-[87.73px] w-full flex-col items-start py-3 sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border-[1.13px] border-[#A7F3D0] bg-white px-[18.1px] text-left transition hover:shadow-md"
        >
          <span className="flex items-center gap-5">
            <span className="font-black italic tracking-tight text-slate-700 text-[26px]">UP<span className="text-brand">I</span><span className="text-emerald-500">▸</span></span>
            <span>
              <span className="flex flex-wrap items-center gap-2.5">
                <span className="text-lg font-semibold leading-6">Instant UPI Options</span>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">Zero Gateway Fee</span>
              </span>
              <span className="block text-sm leading-5 text-slate-500">Pay directly from Google Pay, PhonePe, Paytm, or BHIM UPI ID</span>
            </span>
          </span>

          <span className="flex items-center gap-4">
            <span className="text-sm font-bold text-emerald-700">Pay {formatRupees(total)}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-400"><ChevronRight size={16} /></span>
          </span>
        </button>
      </div>
    </section>
  )
}
