import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PATHS } from '@/config/paths'

// Orange-tinted banner with the "Manage Booking" button. Figma: 595.78 x 211, radius 20, padding 30 / 37, gap 45.
export default function ManageBookingBanner() {
  return (
    <section className="flex flex-col items-center gap-6 rounded-[20px] bg-[#EA580C]/10 px-[37px] py-[30px] sm:flex-row sm:gap-[45px] lg:h-[211px] lg:w-[595.78px] lg:shrink-0">
      <div className="flex w-[138px] shrink-0 justify-center">
        <svg viewBox="0 0 138 100" className="h-[100px] w-[138px]" aria-hidden="true">
          <ellipse cx="66" cy="90" rx="46" ry="2.5" fill="#000" opacity="0.07" />
          <g transform="rotate(-10 66 46)"><rect x="10" y="30" width="112" height="44" rx="4" fill="#F0542D" /></g>
          <g transform="rotate(-12 66 44)">
            <rect x="14" y="20" width="110" height="46" rx="4" fill="#F4F6FB" />
            <rect x="14" y="20" width="110" height="8" rx="3" fill="#2C4F8A" />
            <rect x="14" y="58" width="110" height="8" rx="3" fill="#2C4F8A" />
            <g transform="translate(38 32) scale(0.62)" fill="#2C4F8A"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></g>
            <rect x="20" y="34" width="14" height="2.5" rx="1.2" fill="#B8C0CF" />
            <rect x="20" y="40" width="14" height="2.5" rx="1.2" fill="#B8C0CF" />
            <rect x="20" y="46" width="10" height="2.5" rx="1.2" fill="#B8C0CF" />
            <rect x="100" y="34" width="14" height="10" rx="2" fill="#C3C8D2" />
            <rect x="100" y="47" width="14" height="8" rx="2" fill="#C3C8D2" />
          </g>
        </svg>
      </div>
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
