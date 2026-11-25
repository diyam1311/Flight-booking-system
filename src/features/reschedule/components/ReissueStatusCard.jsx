import { Check, PlaneLanding } from 'lucide-react'
import { CARD } from '../utils/styles'

// "Airline Reissue Status" card (Figma: 389.33 x 486, padding 24, gap 16): waiting time + 4 steps.
//   status : see session.status in data/rescheduleMock.js
export default function ReissueStatusCard({ status }) {
  return (
    <section className={`${CARD} flex flex-col gap-4 p-6`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-bold text-navy"><PlaneLanding size={18} /> Airline Reissue Status</h2>
        <span className="rounded bg-[#D9E8FB] px-2 py-1 text-[11px] font-bold text-navy">{status.badge}</span>
      </div>

      <div className="rounded-xl bg-[#EFF4FF] p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-500">{status.waitLabel}</span>
          <span className="font-bold text-sky-800">{status.wait}</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-white" role="progressbar" aria-valuenow={status.progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-[#0E6A9E]" style={{ width: `${status.progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-500">{status.sla}</p>
      </div>

      <h3 className="mt-2 text-xs tracking-widest text-slate-500">REISSUE PROTOCOL SEQUENCE</h3>
      <ol>
        {status.steps.map((step, i) => {
          const last = i === status.steps.length - 1
          return (
            <li key={step.title} className={`relative pl-8 ${last ? '' : 'pb-6'}`}>
              {/* the vertical line to the next step */}
              {!last && <span className="absolute left-[9px] top-5 h-full w-0.5 bg-[#0E6A9E]" />}
              <span className={`absolute left-0 top-0 grid h-5 w-5 place-items-center rounded-full text-white ${last ? 'bg-navy ring-4 ring-[#DCE8FA]' : 'bg-[#0E6A9E]'}`}><Check size={11} strokeWidth={3} /></span>
              <p className={`text-[13px] leading-5 ${last ? 'font-bold text-navy' : 'text-slate-700'}`}>{step.title}</p>
              <p className="text-xs leading-[18px] text-slate-500">{step.text}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
