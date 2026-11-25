import { useEffect, useRef } from 'react'
import { Eye, Phone } from 'lucide-react'
import { CARD } from '../../utils/styles'
import ChatComposer from './ChatComposer'
import ChatMessage, { TypingBubble } from './ChatMessage'

// The live chat with the airline agent (Figma: 802.67 x 1016, radius 12).
//   session : { id, agent, banner, quickReplies }       messages / typing / onSend : from useRescheduleChat()
// The message list scrolls inside the card, so the card keeps the same size however long the chat gets.
export default function ChatPanel({ session, messages, typing, onSend }) {
  const { agent } = session
  const listRef = useRef(null)
  const firstRender = useRef(true)

  // when a message arrives, scroll down to it (not on the first render, the chat starts from the top)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, typing])

  return (
    <section aria-label="Chat with the airline agent" className={`${CARD} flex h-[640px] min-w-0 flex-col overflow-hidden xl:h-[1016px] xl:w-[802.67px] xl:shrink-0`}>
      {/* agent + 2 buttons (Figma: padding 24, avatar 48) */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[#F4F8FF] p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-sm font-medium text-white">
            {agent.initials}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#F4F8FF] bg-sky-700" aria-label="Online" />
          </span>
          <div>
            <p className="flex flex-wrap items-center gap-2 text-base font-bold leading-5 text-navy">
              {agent.name} <span className="rounded bg-[#DCE8FA] px-1.5 py-0.5 text-[11px] font-normal text-navy">{agent.badge}</span>
            </p>
            <p className="text-xs text-slate-500">{agent.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[{ label: 'Priority Desk', Icon: Phone }, { label: 'Original Ticket', Icon: Eye }].map(({ label, Icon }) => (
            <button key={label} type="button" className="flex h-[46px] w-[110px] items-center gap-2 rounded-lg bg-white px-3 text-left text-xs leading-4 text-slate-500 hover:text-navy sm:w-[128px]">
              <Icon size={14} className="shrink-0 text-navy" /> {label}
            </button>
          ))}
        </div>
      </header>

      <div ref={listRef} className="flex flex-1 flex-col gap-5 overflow-y-auto bg-[#F8FAFF] px-4 py-5 sm:px-6">
        <p className="mx-auto rounded-full bg-[#EAF1FD] px-5 py-1.5 text-center text-[11px] text-slate-600">{session.banner}</p>
        {messages.map((message) => <ChatMessage key={message.id} message={message} agent={agent} />)}
        {typing && <TypingBubble agent={agent} />}
      </div>

      <ChatComposer quickReplies={session.quickReplies} reference={session.id} onSend={onSend} disabled={typing} />
    </section>
  )
}
