import ChatPanel from './chat/ChatPanel'
import NewFlightProfileCard from './NewFlightProfileCard'
import NextStepCard from './NextStepCard'
import ReissueStatusCard from './ReissueStatusCard'

// Step 2 - "Airline Verification": info strip, the chat on the left, the status cards on the right.
// On a small screen the cards go under the chat.
//   session : what startRescheduleChat() returned        chat : { messages, typing, send } from useRescheduleChat()
export default function VerificationStep({ session, chat, onNext, busy }) {
  const { summary } = session
  return (
    <div className="flex flex-col gap-6">
      {/* route + flight on the left, PNR + class on the right */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-1 text-[11px] text-slate-600">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-sm font-bold text-navy">{summary.route}</span>
          <span>{summary.flight} <span className="ml-1">{summary.when}</span></span>
        </p>
        <p className="flex flex-wrap gap-x-4">
          <span>Original PNR: <b className="font-semibold">{summary.originalPnr}</b></span>
          <span>Class: <b className="font-semibold">{summary.fareClass}</b></span>
        </p>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-12">
        <ChatPanel session={session} messages={chat.messages} typing={chat.typing} onSend={chat.send} />
        <aside className="flex min-w-0 flex-col gap-4 xl:w-[389.33px] xl:shrink-0">
          <ReissueStatusCard status={session.status} />
          <NextStepCard next={session.status.next} onNext={onNext} busy={busy} />
          <NewFlightProfileCard flight={session.newFlight} />
        </aside>
      </div>
    </div>
  )
}
