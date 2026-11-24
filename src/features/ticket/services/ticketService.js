import { newBookingId, newGate, newTicketNumber, pickSeats } from '../utils/ids'

/**
 * MOCK BACKEND – DEMO ONLY.
 * Bookings are kept in the browser (localStorage), one list per logged-in user.
 * When your real API is ready, replace the bodies of createBooking() and getBooking() with fetch()/axios calls.
 * Keep the same return shape (a booking, see below) and nothing else needs to change.
 *
 * A booking looks like:
 *   { id: 'ID-3486', bookedAt: '2026-07-03T10:24:00.000Z', gate,
 *     search, flight, contact: { email, mobile }, breakdown: { fare, seat, fee, discount, total },
 *     passengers: [{ ...what the user typed, ticketNumber: '647IND89', seat: '14C' }] }
 * Every passenger has own ticket number + seat, so each ticket belongs to exactly one passenger.
 */
const KEY_PREFIX = 'mobiyantra_bookings_v1_'

const storageKey = (user) => KEY_PREFIX + (user.id ?? user.email)

function readBookings(user) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(user)))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// Called when the payment is done. Makes a NEW random booking ID every time and saves the booking.
// `details` = { search, flight, passengers, contact, breakdown } from the payment page.
export async function createBooking(user, details) {
  const bookings = readBookings(user)

  // pick a random ID again if this user already has a booking with it
  let id = newBookingId()
  while (bookings.some((b) => b.id === id)) id = newBookingId()

  const seats = pickSeats(details.passengers.length)
  const booking = {
    id,
    bookedAt: new Date().toISOString(),
    gate: newGate(),
    search: details.search,
    flight: details.flight,
    contact: details.contact,
    breakdown: details.breakdown,
    passengers: details.passengers.map((p, i) => ({ ...p, ticketNumber: newTicketNumber(), seat: seats[i] })),
  }

  localStorage.setItem(storageKey(user), JSON.stringify([...bookings, booking]))
  return booking
}

// -> every booking of this user, newest first (the "Recents" list of the Manage Booking page)
export async function getBookings(user) {
  return readBookings(user).reverse()
}

// "Booking reference + last name" search of the Manage Booking page.
// The reference may be typed as "ID-3486" or just "3486"; the last name can be any passenger of the booking.
// -> the booking, or null when nothing matches
export async function findBooking(user, reference, lastName) {
  const clean = (text) => text.trim().toLowerCase()
  const ref = clean(reference).replace(/^id-?/, '')
  const last = clean(lastName)
  return (
    readBookings(user).find(
      (b) => b.id.toLowerCase().replace(/^id-/, '') === ref && b.passengers.some((p) => clean(p.last) === last)
    ) ?? null
  )
}

// -> the booking, or null when this user has no booking with that ID
export async function getBooking(user, bookingId) {
  return readBookings(user).find((b) => b.id === bookingId) ?? null
}
