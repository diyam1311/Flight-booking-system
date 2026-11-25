import { ChevronDown, ChevronUp } from 'lucide-react'
import { TOPIC_ICONS } from '../data/helpIcons'

// One row of "Popular Help Topics": icon, title, small summary and an arrow.
// Clicking it opens the answer.
function TopicRow({ topic, open, onToggle }) {
  const Icon = TOPIC_ICONS[topic.icon]
  const Chevron = open ? ChevronUp : ChevronDown
  return (
    <li className="border-b border-[#ECEFF4] pb-[21.6px] pt-[27.8px] first:pt-0 last:border-b-0 last:pb-0">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-[10px] text-left">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#EA580C]/10 text-brand">
          {Icon && <Icon size={12} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-medium leading-[18px]">{topic.title}</span>
          <span className="mt-1 block text-xs leading-[14px] text-slate-500">{topic.summary}</span>
        </span>
        <Chevron size={18} className="shrink-0 self-center text-[#6B7392] lg:mr-[42px]" />
      </button>
      {open && <p className="ml-[34px] mt-[11px] max-w-[490px] text-sm leading-[18.4px]">{topic.answer}</p>}
    </li>
  )
}

// White card with up to 5 topics. Figma: 608 wide, radius 20, padding 25 / 21.
// openId / onToggle come from the page, so only one answer is open at a time across both cards.
export default function TopicCard({ topics, openId, onToggle }) {
  return (
    <ul className="rounded-[20px] bg-white px-[21px] py-[25px] w-full min-w-0">
      {topics.map((t) => (
        <TopicRow key={t.id} topic={t} open={openId === t.id} onToggle={() => onToggle(t.id)} />
      ))}
    </ul>
  )
}
