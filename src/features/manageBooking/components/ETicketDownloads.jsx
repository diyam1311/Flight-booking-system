import { Download, Ticket } from 'lucide-react'
import { fullName } from '@/features/booking/utils/format'

// "E-Tickets" box (Figma: dashed border, radius 12, padding 16; buttons 425 x 46, radius 12, navy). One button per passenger.
export default function ETicketDownloads({ passengers, onDownload }) {
  return (
    <section className="rounded-xl border border-dashed border-sky-400 p-4">
      <h2 className="flex items-center gap-2 text-xs font-bold"><Ticket size={12} className="text-navy" /> E-Tickets</h2>
      <p className="text-[11px] text-slate-500">Your E-Tickets are ready. Click below to download.</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {passengers.map((p) => (
          <button
            key={p.ticketNumber}
            type="button"
            onClick={() => onDownload(p)}
            className="flex h-[46px] items-center justify-between gap-2 rounded-xl bg-navy px-4 text-xs font-semibold text-white hover:brightness-110"
          >
            <span className="flex min-w-0 items-center gap-2"><Ticket size={13} className="shrink-0 text-orange-300" /> <span className="truncate">Download E-Ticket: {fullName(p)}</span></span>
            <Download size={13} className="shrink-0" />
          </button>
        ))}
      </div>
    </section>
  )
}
