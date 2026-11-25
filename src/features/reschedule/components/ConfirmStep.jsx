import { Clock } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'
import { formatClock } from '../utils/format'
import FareRulesCard from './FareRulesCard'
import HelpDeskCard from './HelpDeskCard'
import SettlementCard from './SettlementCard'
import TicketCard from './TicketCard'

// Step 3 - "Confirmation": the new ticket on the left, the fare breakdown on the right.
//   quote : what getReissueQuote() returned (see MOCK_QUOTE in data/rescheduleMock.js)
//   onConfirm() : pay + confirm      onReturnToChat() : back to step 2
export default function ConfirmStep({ quote, onConfirm, onReturnToChat, busy }) {
  const secondsLeft = useCountdown(quote.expiresAt) // "Fare Price Lock" timer

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold leading-[44px] text-navy sm:text-[32px]">Your Rescheduled Flight is Ready to Confirm</h2>
        <p className="flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-white"><Clock size={12} /> Fare Price Lock: {formatClock(secondsLeft)}</p>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:gap-10">
        <div className="flex min-w-0 flex-col gap-4 xl:w-[716px] xl:shrink-0">
          <TicketCard ticket={quote.ticket} />
          <FareRulesCard rules={quote.rules} />
        </div>
        <div className="flex min-w-0 flex-col gap-4 xl:w-[484px] xl:shrink-0">
          <SettlementCard ledger={quote.ledger} onConfirm={onConfirm} onReturnToChat={onReturnToChat} busy={busy} expired={secondsLeft === 0} />
          <HelpDeskCard desk={quote.desk} />
        </div>
      </div>
    </div>
  )
}
