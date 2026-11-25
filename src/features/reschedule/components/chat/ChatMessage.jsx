import { Clock, Hourglass, MessageSquare } from 'lucide-react'
import RichText from './RichText'

const Avatar = ({ initials }) => (
  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0E6A9E] text-[11px] font-medium text-white">{initials}</span>
)

// Small line under a bubble: "10:16 AM · Rajesh Kumar (Agent)"
const Stamp = ({ time, author, className = '' }) => <span className={`text-[9px] font-semibold text-slate-500 ${className}`}>{time} · {author}</span>

const NOTICE_ICONS = [Clock, MessageSquare] // icons of the 2 small lines at the bottom of a notice

// One item of the chat. message.from decides how it looks:
//   'user'   - navy bubble on the right      'agent'  - white bubble on the left with the agent's avatar
//   'notice' - the blue "Notice from Agent" card
export default function ChatMessage({ message, agent }) {
  if (message.from === 'user') {
    return (
      <div className="flex flex-col items-end gap-1.5">
        <p className="max-w-[92%] rounded-2xl rounded-tr-md bg-navy px-5 py-3 text-[13px] leading-[19px] text-white sm:max-w-[80%]">{message.text}</p>
        <Stamp time={message.time} author={message.author} />
      </div>
    )
  }

  if (message.from === 'notice') {
    return (
      <div className="flex gap-3 rounded-2xl bg-[#E8F0FD] p-4 sm:gap-4 sm:p-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-white"><Hourglass size={20} /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-navy">{message.title}</h3>
            <span className="rounded bg-navy px-2 py-0.5 text-[10px] font-medium uppercase text-white">{message.tag}</span>
          </div>
          <p className="mt-2 text-[13px] leading-6 text-slate-600"><RichText text={message.text} /></p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {message.meta.map((line, i) => {
              const Icon = NOTICE_ICONS[i % NOTICE_ICONS.length]
              return <li key={line} className="flex items-center gap-1"><Icon size={12} className="text-sky-700" /> {line}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <Avatar initials={agent.initials} />
      <div className="flex min-w-0 max-w-[88%] flex-col gap-1.5 sm:max-w-[66%]">
        <p className="rounded-2xl rounded-tl-md bg-white px-5 py-4 text-[13px] leading-[19px] text-slate-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"><RichText text={message.text} /></p>
        <Stamp time={message.time} author={message.author} />
      </div>
    </div>
  )
}

// "Rajesh is writing..." (three dots)
export function TypingBubble({ agent }) {
  return (
    <div className="flex items-center gap-3" role="status" aria-label={`${agent.name} is typing`}>
      <Avatar initials={agent.initials} />
      <span className="flex gap-1 rounded-2xl rounded-tl-md bg-white px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        {[0, 1, 2].map((n) => <span key={n} className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" style={{ animationDelay: `${n * 200}ms` }} />)}
      </span>
    </div>
  )
}
