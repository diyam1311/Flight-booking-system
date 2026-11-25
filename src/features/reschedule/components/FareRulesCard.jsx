import { CircleCheck, ShieldCheck } from 'lucide-react'

// "New Ticket Fare Rules Applied" (Figma: 716 x 232, padding 24, gap 16, light blue).   rules : see MOCK_QUOTE.rules
export default function FareRulesCard({ rules }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#EFF4FF] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-base font-bold text-navy"><ShieldCheck size={16} /> {rules.title}</h2>
        <span className="rounded bg-[#D9E8FB] px-2 py-1 text-[11px] font-bold text-navy">{rules.tag}</span>
      </div>
      <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {rules.items.map((rule) => (
          <li key={rule.title} className="flex gap-3">
            <CircleCheck size={16} className="mt-0.5 shrink-0 text-sky-700" />
            <div>
              <h3 className="text-sm font-semibold leading-5">{rule.title}</h3>
              <p className="text-[13px] leading-[19px] text-slate-500">{rule.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
