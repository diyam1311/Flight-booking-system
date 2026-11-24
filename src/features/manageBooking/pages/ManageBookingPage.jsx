import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { bookingDetailsPath } from '@/config/paths'
import FindBookingForm from '../components/FindBookingForm'
import ManageMenu from '../components/ManageMenu'
import RecentBookings from '../components/RecentBookings'
import { findBooking, getRecentBookings } from '../services/manageBookingService'

// "Manage Booking" page (Figma frame 1440 wide). Navbar + Footer come from MainLayout.
// It opens from the "Manage Booking" tab of the homepage search box.
// Two ways to a booking: type its reference + last name, or click "View / Manage" in Recents.
// Both open the "My Booking" page of that booking.
export default function ManageBookingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let stopped = false // so we do nothing if the user already left this page
    getRecentBookings(user).then((list) => {
      if (stopped) return
      setBookings(list)
      setLoading(false)
    })
    return () => { stopped = true }
  }, [user])

  const open = (booking) => navigate(bookingDetailsPath(booking.id))

  // Form button. Returns a message when there is no such booking.
  const findAndOpen = async (reference, lastName) => {
    const booking = await findBooking(user, reference, lastName)
    if (!booking) return 'No booking found for this reference and last name. Please check and try again.'
    open(booking)
  }

  return (
    <main className="px-4 pb-8 pt-10 lg:pt-[102px]">
      <div className="mx-auto max-w-[1240px]">
        {/* Figma: heading block 541 wide */}
        <h1 className="max-w-[541px] text-[40px] font-semibold leading-[48px]">View, Confirm or Cancel Your Booking</h1>
        <p className="mt-1 text-base leading-5">Enter your booking details to access and manage your flight booking.</p>

        <div className="relative mt-[63px]">
          <FindBookingForm onFind={findAndOpen} />
        </div>

        {/* Figma: menu 298 wide, 25 gap, Recents 917 wide; the menu starts 42px lower than the Recents heading */}
        <div className="mt-[53px] flex flex-col gap-6 pt-[22px] lg:flex-row lg:gap-[25px]">
          <div className="lg:mt-[42px]"><ManageMenu /></div>
          <RecentBookings bookings={bookings} loading={loading} onOpen={open} />
        </div>
      </div>
    </main>
  )
}
