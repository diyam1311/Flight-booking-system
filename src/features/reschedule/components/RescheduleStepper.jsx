import { Check } from 'lucide-react'

// Each step has 3 names: before it (todo), when it is finished (done) and, if different, while it is open (current).
const STEPS = [
  { todo: 'Select Flight', done: 'Flight Selected' },
  { todo: 'Airline Verification', done: 'Airline Verified' },
  { todo: 'Confirmation', current: 'Payment & Confirmation' },
]

// The step bar under the title (Figma: 1440 wide x 40, white, border 0.5px).
//   current : 1, 2 or 3         onStepClick(n) : a finished step was clicked -> go back to it
export default function RescheduleStepper({ current, onStepClick }) {
  return (
    <ol aria-label="Reschedule steps" className="mt-12 flex h-10 items-center justify-center gap-3 border-y-[0.5px] border-[#E2E8F0] bg-white px-4 text-xs sm:gap-[22px]">
      {STEPS.map((step, i) => {
        const number = i + 1
        const done = number < current
        const isCurrent = number === current
        const label = done ? step.done : isCurrent ? (step.current ?? step.todo) : `${number}. ${step.todo}`
        const Tag = done ? 'button' : 'span'
        return (
          <li key={step.todo} className="flex items-center gap-3 sm:gap-[22px]" aria-current={isCurrent ? 'step' : undefined}>
            <Tag {...(done ? { type: 'button', onClick: () => onStepClick(number) } : {})} className={`flex items-center gap-2 whitespace-nowrap ${done ? 'hover:underline' : ''}`}>
              {done && <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/15 text-brand"><Check size={11} strokeWidth={3} /></span>}
              {isCurrent && <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[10px] font-bold text-white">{number}</span>}
              {/* on a phone only the open step shows its name */}
              <span className={`${isCurrent ? 'font-bold text-navy' : 'hidden text-slate-400 sm:inline'}`}>{label}</span>
            </Tag>
            {/* line to the next step: navy right after / before the open step, faded orange otherwise */}
            {number < STEPS.length && <span className={`h-0.5 w-6 sm:w-[47px] ${(current === 1 ? number === 1 : number + 1 === current) ? 'bg-navy' : 'bg-brand/20'}`} />}
          </li>
        )
      })}
    </ol>
  )
}
