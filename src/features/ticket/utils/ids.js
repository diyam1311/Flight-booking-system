import { GATE_COUNT, SEAT_LETTERS, SEAT_ROWS } from '../data/ticketData'

// The codes of a booking. They are made here for the demo - when the real backend is ready, IT creates them
// and these functions are not needed any more.

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// -> "ID-3486"  (same look as in Figma)
export const newBookingId = () => `ID-${randomInt(1000, 9999)}`

// -> "647IND89"  (every passenger has own ticket number)
export const newTicketNumber = () => `${randomInt(100, 999)}IND${randomInt(10, 99)}`

// -> 3  (the gate of the flight)
export const newGate = () => randomInt(1, GATE_COUNT)

// -> ["14C", "14D", "3A"]  (one seat per passenger, never the same seat twice)
export function pickSeats(count) {
  const seats = new Set()
  while (seats.size < count) {
    seats.add(`${randomInt(1, SEAT_ROWS)}${SEAT_LETTERS[randomInt(0, SEAT_LETTERS.length - 1)]}`)
  }
  return [...seats]
}
