import { Check } from 'lucide-react'

const STEPS = ['Flight Selected', 'Passenger Details', 'Payment & Confirmation']

// "1. Flight Selected ── 2. Passenger Details ── Payment & Confirmation"
// current: 1, 2 or 3.  Steps before it show a tick, the current one shows its number in a navy circle, the rest are faded.
// Figma: 22 between a step and its line, lines 47 x 2.
export default function BookingStepper({ current }) {
  return (
    <>
      <p className="text-xs font-semibold text-navy lg:hidden">Step {current} of {STEPS.length}</p>

      <ol className="hidden items-center gap-[22px] text-xs lg:flex" aria-label="Booking steps">
        {STEPS.map((label, i) => {
          const step = i + 1
          const done = step < current
          const isCurrent = step === current
          return (
            <li key={label} className="flex items-center gap-[22px]" aria-current={isCurrent ? 'step' : undefined}>
              <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
                {done && <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand"><Check size={11} strokeWidth={3} /></span>}
                {isCurrent && <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">{step}</span>}
                {/* the current step already shows its number in the circle */}
                <span className={isCurrent ? 'font-bold text-navy' : 'text-slate-400'}>{isCurrent ? label : `${step}. ${label}`}</span>
              </span>
              {/* line to the next step: navy when it leads into the current step, faded orange otherwise */}
              {step < STEPS.length && <span className={`h-0.5 w-[47px] ${step + 1 === current ? 'bg-navy' : 'bg-brand/20'}`} />}
            </li>
          )
        })}
      </ol>
    </>
  )
}
