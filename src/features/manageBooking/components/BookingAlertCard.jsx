import { CheckCircle2, Download, FileText, MessageCircle } from 'lucide-react'

// "Booking Confirmed & e-Ticket Issued" card (Figma: 913 x 120, radius 12, padding 16, shadow 0 1 2 5%).
//   email : where the e-ticket was sent (what the user typed on the traveller page)
//   onDownload() : "Download e-Ticket (PDF)"      busy : the PDF is being made
export default function BookingAlertCard({ booking, onDownload, busy }) {
  const shareText = encodeURIComponent(`My Mobiyantra booking ${booking.id}: ${booking.flight.fromCode} to ${booking.flight.toCode}`)

  return (
    <section className="flex flex-col justify-between gap-4 rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:h-[120px] lg:flex-row">
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle2 size={20} /></span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-6">Booking Confirmed &amp; e-Ticket Issued</h2>
          <p className="text-[13px] leading-[18px] text-slate-500">Confirmation invoice and boarding vouchers<br />sent to</p>
          <p className="truncate text-sm font-semibold leading-5">{booking.contact.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:w-[247px] lg:shrink-0">
        <div className="flex gap-2">
          <button type="button" onClick={() => window.print()} className="flex h-6 flex-1 items-center justify-center gap-1 rounded bg-slate-100 text-xs font-medium hover:bg-slate-200">
            <FileText size={12} /> Tax Invoice
          </button>
          <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer" className="flex h-6 flex-1 items-center justify-center gap-1 rounded bg-slate-100 text-xs font-medium hover:bg-slate-200">
            <MessageCircle size={12} /> WhatsApp
          </a>
        </div>
        <button type="button" onClick={onDownload} disabled={busy} className="flex h-8 items-center justify-center gap-2 rounded bg-navy text-sm font-semibold text-white hover:brightness-110 disabled:opacity-70">
          <Download size={13} /> {busy ? 'Making PDF…' : 'Download e-Ticket (PDF)'}
        </button>
      </div>
    </section>
  )
}
