import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'
import BoardingPass from '../components/BoardingPass'
import BookingSummaryCard from '../components/BookingSummaryCard'
import DownloadCard from '../components/DownloadCard'
import FlightDetailsCard from '../components/FlightDetailsCard'
import NeedHelpCard from '../components/NeedHelpCard'
import PassengerDetailsCard from '../components/PassengerDetailsCard'
import TicketSuccess from '../components/TicketSuccess'
import { getBooking } from '../services/ticketService'
import { downloadETicketPdf } from '../utils/ticketPdf'
import { getTicketView } from '../utils/ticketView'

// "E-ticket" page (Figma frame 1440 wide). Header + Footer come from TicketLayout.
// The URL holds the booking ID (/e-ticket/ID-3486), so the page also works after a refresh.
export default function ETicketPage() {
  const { bookingId } = useParams()
  const { user } = useAuth()
  const [booking, setBooking] = useState(undefined) // undefined = still loading, null = no such booking

  useEffect(() => {
    let stopped = false // so we do nothing if the user already left this page
    getBooking(user, bookingId).then((found) => { if (!stopped) setBooking(found) })
    return () => { stopped = true }
  }, [user, bookingId])

  if (booking === undefined) return <main className="min-h-[600px]" />
  // Opened a booking that does not exist (or belongs to someone else) -> back to the homepage
  if (booking === null) return <Navigate to={PATHS.home} replace />

  return <ETicketContent booking={booking} />
}

// Split in two so the hooks only run when there really is a booking to show.
function ETicketContent({ booking }) {
  const view = getTicketView(booking)
  const [downloading, setDownloading] = useState(false)

  const downloadTicket = async () => {
    setDownloading(true)
    try {
      await downloadETicketPdf(booking) // makes the PDF and the browser saves it
    } catch {
      window.alert('Sorry, the PDF could not be created. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <main className="px-4 pb-[68px] pt-10 xl:pt-[100px]">
      {/* Figma: left column 850, 20 between the columns, right column 370 */}
      <div className="mx-auto flex w-[1240px] max-w-full flex-col gap-10 xl:flex-row xl:gap-5">
        <div className="flex min-w-0 flex-col gap-10 xl:w-[850px] xl:shrink-0">
          <TicketSuccess email={booking.contact.email} bookingId={booking.id} bookedOn={view.bookedOn} />

          <div className="flex flex-col gap-7">
            <PassengerDetailsCard passengers={booking.passengers} />
            <FlightDetailsCard view={view} />
          </div>

          {/* one boarding pass for every passenger */}
          <div className="flex flex-col gap-6">
            {booking.passengers.map((p) => (
              <BoardingPass key={p.ticketNumber} view={view} passenger={p} bookingId={booking.id} gate={booking.gate} />
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 xl:w-[370px] xl:shrink-0">
          <DownloadCard onDownloadTicket={downloadTicket} downloading={downloading} />
          <BookingSummaryCard breakdown={booking.breakdown} paidOn={view.bookedOn} />
          <NeedHelpCard />
        </div>
      </div>
    </main>
  )
}
