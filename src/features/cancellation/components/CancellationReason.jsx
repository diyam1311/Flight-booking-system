import { ArrowRight, ChevronDown, Headset, Info, MessageSquare } from 'lucide-react'
import { SUPPORT_EMAIL } from '@/features/ticket/data/ticketData'
import { CANCEL_REASONS, IMPORTANT_INFO } from '../data/cancellationData'

// "Reason for Cancellation" card (Figma: 927 x 414, radius 15, border 1px, padding 24):
// reason list, "Important Information" and "Need Help?".
export default function CancellationReason({ reason, onReasonChange, disabled }) {
  return (
    <section className="flex flex-col gap-5 rounded-[15px] border border-[#F2F9FE] bg-white p-4 sm:p-6 xl:min-h-[414px]">
      <div>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-100 text-brand"><MessageSquare size={15} /></span>
          <h2 className="text-[22px] font-medium leading-8">Reason for Cancellation</h2>
        </div>
        <p className="mt-1 text-[13px] leading-5 sm:ml-12">Help us understand why you&rsquo;re cancelling (optional).</p>
      </div>

      <div className="relative">
        <select value={reason} onChange={(e) => onReasonChange(e.target.value)} disabled={disabled} aria-label="Reason for cancellation" className={`h-[60px] w-full appearance-none rounded-xl border border-[#E8EEF8] bg-white px-6 pr-12 text-sm outline-none focus:border-navy ${reason ? 'text-slate-900' : 'text-slate-400'}`}>
          <option value="">Select reason</option>
          {CANCEL_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-navy" />
      </div>

      <div className="rounded-xl border border-[#E8F0FB] bg-[#F0F6FD] px-4 py-4 sm:px-6">
        <h3 className="flex items-center gap-2 text-sm font-semibold"><Info size={16} className="text-navy" /> Important Information</h3>
        <ul className="mt-2 flex flex-col gap-0.5 pl-6 text-xs leading-[15px] text-slate-600">
          {IMPORTANT_INFO.map((line) => <li key={line} className="list-disc marker:text-slate-400">{line}</li>)}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E8F0FB] bg-[#F2F7FD] px-4 py-4 sm:px-6">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold"><Headset size={16} className="text-navy" /> Need Help?</h3>
          <p className="text-xs leading-5 text-slate-600 sm:ml-6">Our support team is here to assist you with your cancellation.</p>
        </div>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="flex h-8 items-center gap-2 rounded-full border border-navy bg-white px-5 text-xs font-medium text-navy hover:bg-slate-50">Contact Support <ArrowRight size={13} /></a>
      </div>
    </section>
  )
}
