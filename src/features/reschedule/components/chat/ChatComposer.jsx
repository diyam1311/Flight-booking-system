import { useState } from 'react'
import { Lock, Paperclip, Send } from 'lucide-react'

// Bottom of the chat: quick replies, the message box + Send, and the small "Official session" line.
//   onSend(text)   disabled : the agent is answering, so wait
export default function ChatComposer({ quickReplies, reference, onSend, disabled }) {
  const [text, setText] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!text.trim() || disabled) return
    onSend(text)
    setText('')
  }

  return (
    <div className="border-t border-slate-100 bg-white p-4 sm:px-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] tracking-wide text-slate-500">QUICK REPLY:</span>
        {quickReplies.map((reply) => (
          <button key={reply} type="button" disabled={disabled} onClick={() => onSend(reply)} className="rounded-full bg-[#EAF1FD] px-4 py-1.5 text-xs text-slate-600 hover:bg-[#DCE8FA] disabled:opacity-60">
            {reply}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-4 flex gap-3">
        <div className="relative min-w-0 flex-1">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message or query for Rajesh..."
            aria-label="Your message"
            className="h-11 w-full rounded-xl bg-[#F1F5FB] pl-4 pr-10 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-navy/30"
          />
          <Paperclip size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
        </div>
        <button type="submit" disabled={disabled || !text.trim()} className="flex h-11 w-[84px] shrink-0 items-center justify-center gap-2 rounded-xl bg-navy text-sm font-medium text-white hover:brightness-110 disabled:opacity-60 sm:w-[112px]">
          Send <Send size={13} />
        </button>
      </form>

      <p className="mt-3 flex items-center gap-1 text-[11px] text-slate-500"><Lock size={11} /> Official DGCA Rescheduling Session · Ref #{reference}</p>
    </div>
  )
}
