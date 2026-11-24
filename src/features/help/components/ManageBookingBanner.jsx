import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PATHS } from '@/config/paths'
import TicketIllustration from './TicketIllustration'

// Orange-tinted banner with the "Manage Booking" button. Figma: 595.78 x 211, radius 20, padding 30 / 37, gap 45.
export default function ManageBookingBanner() {
  return (
    <section className="flex flex-col items-center gap-6 rounded-[20px] bg-[#EA580C]/10 px-[37px] py-[30px] sm:flex-row sm:gap-[45px] lg:h-[211px] lg:w-[595.78px] lg:shrink-0">
      <div className="flex w-[138px] shrink-0 justify-center"><TicketIllustration /></div>
      <div>
        <h2 className="text-[20px] font-semibold leading-6">Manage your booking</h2>
        <p className="mt-[7px] text-xs leading-[19.5px] text-slate-600">
          View, modify or cancel your booking in just a few clicks. It&apos;s quick, easy and secure.
        </p>
        <Link
          to={PATHS.manageBooking}
          className="mt-[22px] flex h-[38.6px] w-[186px] items-center justify-center gap-2 rounded-[8px] bg-navy text-sm font-semibold text-white"
        >
          Manage Booking <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
