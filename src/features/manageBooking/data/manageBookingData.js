import { reschedulePath } from '@/config/paths'
import { helpSupport } from '@/config/paths'
import { Calendar, CalendarX2, Headphones, Plane } from 'lucide-react'

// Left menu of the Manage Booking page. `path(bookingId)` gives the page of an item that works on one booking;
// the others (no `path`) have no page yet.
export const MANAGE_MENU = [
  { label: 'My Booking', icon: Plane, active: true },
  { label: 'Help & Support', icon: Headphones, path: helpSupport },
  { label: 'Cancellation', icon: CalendarX2 },
  { label: 'Reschedule', icon: Calendar, path: reschedulePath, requiresBooking: true },
]

// Status badge colours
export const STATUS_STYLES = {
  Confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Upcoming: 'border-amber-200 bg-amber-50 text-amber-600',
  Completed: 'border-slate-200 bg-slate-100 text-slate-500',
}

// How many bookings "Recents" shows before "View All" is clicked
export const RECENT_COUNT = 4
