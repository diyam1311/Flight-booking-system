import { useEffect, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getBookingById } from '@/features/manageBooking/services/manageBookingService'
import { cancelBooking, getCancellation } from '../services/cancellationService'

// Everything the Cancel Booking page needs, in one place.
//   booking      : undefined while loading, null when there is no such booking
//   cancellation : null while the booking is still active (see services/cancellationService.js)
export function useCancelBooking(bookingId) {
  const { user } = useAuth()
  const [booking, setBooking] = useState(undefined)
  const [cancellation, setCancellation] = useState(null)
  const [mode, setMode] = useState('full')          // 'full' or 'passengers'
  const [passengerKeys, setPassengerKeys] = useState([]) // ticket numbers ticked in "Cancel Specific Passenger"
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let stopped = false // so we do nothing if the user already left this page
    Promise.all([getBookingById(user, bookingId), getCancellation(user, bookingId)]).then(([found, saved]) => {
      if (stopped) return
      setBooking(found)
      setCancellation(saved)
    })
    return () => { stopped = true }
  }, [user, bookingId])

  const togglePassenger = (key) =>
    setPassengerKeys((list) => (list.includes(key) ? list.filter((k) => k !== key) : [...list, key]))

  // Message to show when the form is not ready to send, or '' when it is.
  const problem = mode === 'passengers' && passengerKeys.length === 0 ? 'Please select at least one passenger to cancel.' : ''

  // -> true when the cancellation was saved
  const submit = async () => {
    setBusy(true)
    setError('')
    try {
      setCancellation(await cancelBooking(user, booking, { mode, passengerKeys, reason }))
      return true
    } catch {
      setError('Sorry, the booking could not be cancelled. Please try again.')
      return false
    } finally {
      setBusy(false)
    }
  }

  return { booking, cancellation, mode, setMode, passengerKeys, togglePassenger, reason, setReason, problem, busy, error, submit }
}
