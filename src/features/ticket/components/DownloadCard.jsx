import { Download, PartyPopper } from 'lucide-react'

// "Your Booking is Confirmed!" card with the two download buttons (Figma: 370 x 229, radius 16, padding 10).
//   onDownloadTicket() : makes the e-ticket PDF        downloading : true while the PDF is being made
// "Download Invoice" does not work yet (no invoice is made), so that button is switched off.
export default function DownloadCard({ onDownloadTicket, downloading }) {
  return (
    <section className="h-[229px] rounded-2xl border border-[#E2E8F0] bg-white p-[10px]">
      <div className="mt-[14px] flex gap-[19px] px-[7px]">
        <PartyPopper size={24} className="mt-0.5 shrink-0 text-navy" />
        <div>
          <h2 className="text-lg font-semibold leading-6">Your Booking is Confirmed!</h2>
          <p className="mt-0.5 max-w-[250px] text-[10px] leading-3">We’ve sent your e-ticket and booking details to your email.</p>
        </div>
      </div>

      <div className="mx-[10px] mt-[15px] flex flex-col gap-3">
        <button
          type="button"
          onClick={onDownloadTicket}
          disabled={downloading}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-navy text-[13px] font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
        >
          <Download size={14} /> {downloading ? 'Preparing PDF…' : 'Download E-ticket'}
        </button>
        <button
          type="button"
          disabled
          title="Invoice download is coming soon"
          className="flex h-12 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-orange-300 bg-white text-[13px] font-semibold text-brand"
        >
          <Download size={14} /> Download Invoice
        </button>
      </div>
    </section>
  )
}
