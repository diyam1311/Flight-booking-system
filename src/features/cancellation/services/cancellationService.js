import { CANCELLATION_CHARGE_RATE } from '../data/cancellationData'
import { removeBooking } from '@/features/ticket/services/ticketService'

/**
 * MOCK BACKEND – DEMO ONLY.
 * Cancellations are kept in the browser (localStorage), one list per logged-in user.
 * When your real API is ready, replace the bodies of the 2 functions below with fetch()/axios calls
 * (suggested: GET /v1/bookings/:bookingId/cancellation and POST /v1/bookings/:bookingId/cancel).
 * Keep the same return shape and nothing else needs to change.
 *
 * A cancellation looks like:
 *   { bookingId, mode: 'full' | 'passengers', passengerKeys: ['647IND89'], reason: 'Change of plans',
 *     refundAmount: 6120, cancelledAt: '2026-07-03T10:24:00.000Z' }
 * `passengerKeys` = the ticket numbers of the cancelled passengers (all of them when mode is 'full').
 */
const KEY_PREFIX = 'mobiyantra_cancellations_v1_'

const storageKey = (user) => KEY_PREFIX + (user.id ?? user.email)

function readAll(user) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(user)))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// How much comes back (DEMO RULE): the share of the total that belongs to the cancelled passengers,
// minus the airline's charge on their share of the fare.
function estimateRefund(booking, cancelledCount) {
  const { fare, total } = booking.breakdown
  const share = cancelledCount / booking.passengers.length
  return Math.round(total * share - fare * share * CANCELLATION_CHARGE_RATE)
}

// -> the cancellation of this booking, or null while the booking is still fully active
export async function getCancellation(user, bookingId) {
  return readAll(user).find((c) => c.bookingId === bookingId) ?? null
}

// "Cancel Booking" button.  options = { mode, passengerKeys, reason }   -> the saved cancellation
// (demo: a booking can be cancelled once; the real backend can allow more)
export async function cancelBooking(user, booking, { mode, passengerKeys, reason }) {
  const keys = mode === 'full' ? booking.passengers.map((p) => p.ticketNumber) : passengerKeys
  const cancellation = {
    bookingId: booking.id,
    mode,
    passengerKeys: keys,
    reason,
    refundAmount: estimateRefund(booking, keys.length),
    cancelledAt: new Date().toISOString(),
  }
  localStorage.setItem(storageKey(user), JSON.stringify([...readAll(user).filter((c) => c.bookingId !== booking.id), cancellation]))
  if (mode === 'full') await removeBooking(user, booking.id)
  return cancellation
}

// Used by the manage-booking service to hide fully cancelled demo bookings too.
export function getFullyCancelledBookingIds(user) {
  return readAll(user).filter((item) => item.mode === 'full').map((item) => item.bookingId)
}
