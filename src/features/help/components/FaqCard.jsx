import { ChevronDown, ChevronUp } from 'lucide-react'

function FaqRow({ faq, open, onToggle }) {
  const Chevron = open ? ChevronUp : ChevronDown
  return (
    <li className="border-b border-[#ECEFF4] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-[65.2px] w-full items-center justify-between gap-4 text-left text-base font-medium"
      >
        {faq.question}
        <Chevron size={18} className="mr-[10px] shrink-0 text-[#6B7392]" />
      </button>
      {open && <p className="pb-5 pr-10 text-sm leading-[18.4px] text-slate-600">{faq.answer}</p>}
    </li>
  )
}

// White card with up to 3 questions. Figma: 604.6 wide, 220.39 high, radius 22.82, padding 24 sides.
export default function FaqCard({ faqs, openId, onToggle }) {
  return (
    <ul className="rounded-[22.82px] bg-white px-6 py-[11.4px] w-full xl:max-w-[604.6px]">
      {faqs.map((f) => (
        <FaqRow key={f.id} faq={f} open={openId === f.id} onToggle={() => onToggle(f.id)} />
      ))}
    </ul>
  )
}
