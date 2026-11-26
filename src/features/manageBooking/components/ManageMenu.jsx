import { Link } from 'react-router-dom'
import { cancelPath, helpSupport, reschedulePath } from '@/config/paths'
import { Calendar, CalendarX2, Headphones, Plane } from 'lucide-react'

const MANAGE_MENU = [
  { label: 'My Booking', icon: Plane, active: true },
  { label: 'Help & Support', icon: Headphones, path: helpSupport },
  { label: 'Cancellation', icon: CalendarX2, path: cancelPath, requiresBooking: true },
  { label: 'Reschedule', icon: Calendar, path: reschedulePath, requiresBooking: true },
]

// Left menu card (Figma: 298 x 339, radius 10, border 1px, padding 16, gap 11; every item 247 x 68.5, radius 16).
//   bookingId : the open booking (My Booking page). Items with a `path` (like Reschedule) open that booking's page.
export default function ManageMenu({ bookingId }) {
  return (
    <nav aria-label="Booking menu" className="flex flex-col gap-[11px] rounded-[10px] border border-black/10 bg-[#FDFEFE] p-4 lg:h-[339px] lg:w-[298px] lg:shrink-0">
      {MANAGE_MENU.map(({ label, icon: Icon, active, path, requiresBooking }) => (
        <Link
          key={label}
          to={path && (!requiresBooking || bookingId) ? path(bookingId) : '#'}
          aria-current={active ? 'page' : undefined}
          className={`flex h-[68.5px] items-center gap-[14px] rounded-2xl px-4 text-base font-medium ${active ? 'bg-brand/5 text-brand' : 'text-slate-800 hover:bg-slate-50'}`}
        >
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${active ? 'bg-brand/10' : ''}`}><Icon size={20} /></span>
          {label}
        </Link>
      ))}
    </nav>
  )
}
