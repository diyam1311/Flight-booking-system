import { ArrowRight, Lock, MessagesSquare, PiggyBank, Receipt, ShieldCheck, Smartphone } from 'lucide-react'
import { CARD } from '../utils/styles'
import { rupees } from '../utils/format'

// "Official Fare Breakdown" (Figma: 484 wide, padding 24): what the user pays + the confirm button.
//   ledger : see MOCK_QUOTE.ledger      onConfirm() : "Confirm Reschedule & Pay"      onReturnToChat() : back to step 2
export default function SettlementCard({ ledger, onConfirm, onReturnToChat, busy, expired }) {
  return (
    <section className={`${CARD} overflow-hidden`}>
      <header className="flex items-center justify-between gap-3 bg-[#F1F5FD] p-6">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-sky-800">SETTLEMENT LEDGER</p>
          <h2 className="text-[22px] font-bold leading-8 text-navy">Official Fare Breakdown</h2>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-navy"><Receipt size={18} /></span>
      </header>

      <div className="flex flex-col gap-4 p-4 sm:p-6">
        {/* credit + new fare = difference */}
        <dl className="flex flex-col gap-2 rounded-xl bg-[#F4F7FD] p-4 text-sm">
          <div className="flex justify-between gap-3 text-slate-500"><dt>Original Ticket Credit (3 Jul)</dt><dd className="font-semibold text-slate-900">{rupees(ledger.credit)}</dd></div>
          <div className="flex justify-between gap-3 text-slate-500"><dt>New Flight Base Fare (6E-5188)</dt><dd className="font-semibold text-slate-900">{rupees(ledger.baseFare)}</dd></div>
          <div className="flex justify-between gap-3 font-bold"><dt>Carrier Fare Difference</dt><dd>{rupees(ledger.difference, true)}</dd></div>
        </dl>

        {/* fees */}
        <ul className="flex flex-col gap-3 px-1">
          {ledger.rows.map((row) => (
            <li key={row.label} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm leading-5">{row.label} {row.badge && <span className="ml-1 rounded bg-[#D9E8FB] px-1.5 py-0.5 text-[9px] font-bold text-navy">{row.badge}</span>}</p>
                <p className={`text-xs ${row.noteIsLink ? 'text-sky-700' : 'text-slate-500'}`}>{row.note}</p>
              </div>
              <p className={`shrink-0 text-sm font-semibold ${row.was !== undefined ? 'text-sky-700' : ''}`}>
                {row.was !== undefined && <s className="mr-1 text-slate-400">{rupees(row.was)}</s>}
                {rupees(row.amount, row.plus)}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-[#EAF2FE] px-4 py-4 text-sm font-bold">
          <span className="flex items-center gap-2"><PiggyBank size={16} className="text-sky-700" /> Total Fees Saved Today</span>
          <span className="text-lg text-sky-700">{rupees(ledger.saved)}</span>
        </div>

        <div className="rounded-2xl bg-[#E4EDFC] p-5">
          <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
            <p className="text-sm font-bold">Total Payable for Reissue:</p>
            <p className="text-[32px] font-bold leading-9 text-navy">{rupees(ledger.total)} <span className="text-xs font-normal text-slate-500">INR</span></p>
          </div>
          <p className="mt-3 flex items-center gap-1 text-xs text-slate-500"><Lock size={12} /> Rate &amp; Seat guaranteed for <b className="text-slate-900">{ledger.guarantee}</b> by IndiGo Desk</p>
        </div>

        <button type="button" onClick={onConfirm} disabled={busy || expired} className="flex h-14 items-center justify-center gap-2 rounded-xl bg-navy text-base font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] hover:brightness-110 disabled:opacity-60">
          {expired ? 'Fare lock expired' : busy ? 'Confirming…' : <>Confirm Reschedule &amp; Pay {rupees(ledger.total)} <ArrowRight size={16} /></>}
        </button>
        <button type="button" onClick={onReturnToChat} className="flex items-center justify-center gap-2 text-sm font-semibold text-navy hover:underline">
          <MessagesSquare size={14} /> Need to change details? Return to Chat
        </button>

        <div className="rounded-xl bg-[#F1F5FD] p-4">
          <h3 className="flex items-center gap-2 text-[13px] font-bold"><Smartphone size={14} className="text-navy" /> Instant Multichannel Dispatch</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{ledger.dispatch.text}</p>
          <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-sky-800"><ShieldCheck size={12} /> {ledger.dispatch.note}</p>
        </div>
      </div>
    </section>
  )
}
