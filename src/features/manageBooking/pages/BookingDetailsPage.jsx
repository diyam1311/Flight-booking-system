import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'
import { downloadETicketPdf } from '@/features/ticket/utils/ticketPdf'
import BookingAlertCard from '../components/BookingAlertCard'
import ConfirmedBanner from '../components/ConfirmedBanner'
import ETicketDownloads from '../components/ETicketDownloads'
import FarePanel from '../components/FarePanel'
import FlightSection from '../components/FlightSection'
import ManageMenu from '../components/ManageMenu'
import PassengerPanel from '../components/PassengerPanel'
import { getBookingById } from '../services/manageBookingService'

// "My Booking" page (Figma frame 1440 wide). Navbar + Footer come from MainLayout.
// Opens from "View / Manage" in Recents, or after the booking reference + last name form.
// The URL holds the booking ID (/manage-booking/ID-3486), so it also works after a refresh.
export default function BookingDetailsPage() {
  const { bookingId } = useParams()
  const { user } = useAuth()
  const [booking, setBooking] = useState(undefined) // undefined = still loading, null = no such booking

  useEffect(() => {
    let stopped = false // so we do nothing if the user already left this page
    getBookingById(user, bookingId).then((found) => { if (!stopped) setBooking(found) })
    return () => { stopped = true }
  }, [user, bookingId])

  if (booking === undefined) return <main className="min-h-[600px]" />
  if (booking === null) return <Navigate to={PATHS.manageBooking} replace /> // no such booking -> back to the search box

  return <BookingDetails booking={booking} />
}

// Split in two so the hooks only run when there really is a booking to show.
function BookingDetails({ booking }) {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  // Makes the PDF. `passengers` = who is on it (everybody, or just one person).
  const download = async (passengers = booking.passengers) => {
    setBusy(true)
    try {
      await downloadETicketPdf({ ...booking, passengers })
    } catch {
      window.alert('Sorry, the PDF could not be created. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="px-4 pb-[30px] pt-10 lg:pt-[61px]">
      <div className="mx-auto max-w-[1240px]">
        {/* back arrow + title (Figma block: 1242 x 120) */}
        <div className="flex items-start gap-[38px] lg:h-[120px]">
          <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="mt-[18px] grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-500 hover:text-navy">
            <ArrowLeft size={14} />
          </button>
          <div>
            <h1 className="text-[44px] font-bold leading-[54px]">My Booking</h1>
            <p className="max-w-[440px] text-base leading-[22px]">Here are all the confirmed details of your flight booking, itinerary, passenger information, and receipt.</p>
          </div>
        </div>

        <div className="mt-[33px]"><ConfirmedBanner booking={booking} /></div>

        {/* Figma: menu 298 wide, 25 gap, card 913 wide (radius 16, padding 16, gap 15) */}
        <div className="mt-[63px] flex flex-col gap-6 lg:flex-row lg:gap-[25px]">
          <ManageMenu />
          <div className="flex min-w-0 flex-1 flex-col gap-[15px] rounded-2xl bg-white p-4 lg:min-h-[816px]">
            <BookingAlertCard booking={booking} onDownload={() => download()} busy={busy} />
            <FlightSection booking={booking} />
            <div className="flex flex-col gap-4 lg:flex-row">
              <PassengerPanel passengers={booking.passengers} />
              <FarePanel booking={booking} />
            </div>
            <ETicketDownloads passengers={booking.passengers} onDownload={(p) => download([p])} />
          </div>
        </div>
      </div>
    </main>
  )
}
