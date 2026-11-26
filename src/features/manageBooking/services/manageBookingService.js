import { findBooking as findSavedBooking, getBooking, getBookings } from '@/features/ticket/services/ticketService'
import { getFullyCancelledBookingIds } from '@/features/cancellation/services/cancellationService'
import { MOCK_BOOKINGS } from '../data/mockBookings' // demo data: remove with mockBookings.js when the backend is ready

/**
 * MOCK BACKEND – DEMO ONLY.
 * The bookings the user made on this site (saved by the ticket feature) come first, then the demo bookings.
 * When your real API is ready, replace the bodies of these 3 functions with fetch()/axios calls
 * (e.g. GET /bookings, GET /bookings/:id, POST /bookings/find). Keep the same return shapes and no page needs to change.
 */

// -> every booking to show in "Recents", newest first
export async function getRecentBookings(user) {
  const cancelledIds = new Set(getFullyCancelledBookingIds(user))
  return [...(await getBookings(user)), ...MOCK_BOOKINGS].filter((booking) => !cancelledIds.has(booking.id))
}

// "Booking reference + last name" form. -> the booking, or null when nothing matches.
export async function findBooking(user, reference, lastName) {
  const saved = await findSavedBooking(user, reference, lastName)
  if (saved && !getFullyCancelledBookingIds(user).includes(saved.id)) return saved
  const ref = reference.trim().toLowerCase()
  const last = lastName.trim().toLowerCase()
  return MOCK_BOOKINGS.find((b) => !getFullyCancelledBookingIds(user).includes(b.id) && b.id.toLowerCase() === ref && b.passengers.some((p) => p.last.toLowerCase() === last)) ?? null
}

// One booking by its ID (the "My Booking" page). -> the booking, or null
export async function getBookingById(user, bookingId) {
  return (await getBooking(user, bookingId)) ?? MOCK_BOOKINGS.find((b) => b.id === bookingId) ?? null
}
