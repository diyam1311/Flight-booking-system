import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import BookingRow from './BookingRow'

const RECENT_COUNT = 4

// "Recents" (Figma: 917 x 423.7, gap 14.35 between the heading and the list; list gap 16).
//   bookings : newest first        onOpen(booking) : "View / Manage" of a row
export default function RecentBookings({ bookings, loading, onOpen }) {
  const [showAll, setShowAll] = useState(false)
  const shown = showAll ? bookings : bookings.slice(0, RECENT_COUNT)

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[14.35px]" aria-labelledby="recents-title">
      <div className="flex items-start justify-between px-0 py-[21.52px] lg:h-[87.4px]">
        <div>
          <h2 id="recents-title" className="text-2xl font-medium leading-8">Recents</h2>
          <p className="text-sm leading-5 text-slate-700">Quick access to your recent flight bookings.</p>
        </div>
        {bookings.length > RECENT_COUNT && (
          <button type="button" onClick={() => setShowAll(!showAll)} className="mt-2 flex items-center gap-1 text-xs font-semibold text-navy">
            {showAll ? 'Show less' : 'View All'} <ArrowRight size={14} />
          </button>
        )}
      </div>

      {loading ? null : shown.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-sm text-slate-500">You have no bookings yet. Book a flight and it will show up here.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {shown.map((booking) => <BookingRow key={booking.id} booking={booking} onOpen={onOpen} />)}
        </ul>
      )}
    </section>
  )
}
