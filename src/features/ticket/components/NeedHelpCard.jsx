import { ArrowRight, Headset } from 'lucide-react'
import { SUPPORT_EMAIL } from '../data/ticketData'

// "Need Help" card (Figma: 370 x 139, radius 8, padding 16 / 11, gap 25).
export default function NeedHelpCard() {
  return (
    <section className="flex h-[139px] items-start gap-[25px] rounded-lg border border-[#E2E8F0] bg-white px-[11px] py-4">
      <span className="mt-[3px] grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-navy">
        <Headset size={18} />
      </span>
      <div>
        <h2 className="text-lg font-semibold leading-[22px]">Need Help</h2>
        <p className="mt-0.5 max-w-[250px] text-[10px] leading-[15.5px] text-slate-600">
          Our support team is here to help you with any queries related to your booking.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="flex h-[37px] w-[166px] items-center justify-center gap-2 rounded-lg border border-navy text-[13px] font-medium text-navy transition hover:bg-slate-50"
        >
          Contact Support <ArrowRight size={13} />
        </a>
      </div>
    </section>
  )
}
