import { ChevronRight } from 'lucide-react'
import { CARD } from '../utils/styles'

// "NEXT STEP" card with the big button that opens step 3 (Figma: 389.33 x 200, padding 24, gap 8).
//   next : { label, badge, text, action }     onNext() : go to the confirmation page
export default function NextStepCard({ next, onNext, busy }) {
  return (
    <section className={`${CARD} flex flex-col gap-2 p-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] tracking-widest text-slate-500">{next.label}</h2>
        <span className="rounded bg-[#E4EEFB] px-2 py-0.5 text-[11px] text-sky-800">{next.badge}</span>
      </div>
      <p className="text-[11px] leading-4 text-slate-500">{next.text}</p>
      <button type="button" onClick={onNext} disabled={busy} className="mt-1 flex min-h-[80px] items-center justify-between gap-3 rounded-xl bg-navy px-6 text-left text-base font-semibold leading-6 text-white hover:brightness-110 disabled:opacity-70">
        {busy ? 'Please wait…' : next.action}
        <ChevronRight size={16} className="shrink-0" />
      </button>
    </section>
  )
}
