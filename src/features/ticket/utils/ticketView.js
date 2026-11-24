import { findCity } from '@/features/search/data/searchOptions'
import { parseISO } from '@/utils/dates'
import { BOARDING_MINUTES_BEFORE, TERMINALS } from '../data/ticketData'

// Turns a saved booking into ready-to-show texts. The e-ticket page and the PDF both use it,
// so the two always show exactly the same.

const day = (iso, options) => parseISO(iso).toLocaleDateString('en-GB', options)
const pad = (n) => String(n).padStart(2, '0')

// "2026-07-03" -> "Fri, 03 Jul 2026"
export const ticketDate = (iso) =>
  `${day(iso, { weekday: 'short' })}, ${day(iso, { day: '2-digit', month: 'short', year: 'numeric' })}`

// "2026-07-03T10:24:00Z" (when the booking was made) -> "03 Jul 2026, 10:24 AM"
export function bookingTimestamp(isoTimestamp) {
  const date = new Date(isoTimestamp)
  const dayPart = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const timePart = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return `${dayPart}, ${timePart}`
}

// "09:20" and 35 -> "08:45"
function minutesBefore(time, minutes) {
  const [hours, mins] = time.split(':').map(Number)
  const total = (hours * 60 + mins - minutes + 24 * 60) % (24 * 60)
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`
}

// "Indira Gandhi International Airport, T-3" -> "Indira Gandhi International Airport"
const airportName = (code) => (findCity(code)?.airport ?? code).split(',')[0]

// booking -> everything about the flight, as text
export function getTicketView({ flight, search, bookedAt }) {
  return {
    airline: flight.airline,
    flightCode: flight.code,
    fromCode: flight.fromCode,
    toCode: flight.toCode,
    fromAirport: airportName(flight.fromCode),
    toAirport: airportName(flight.toCode),
    depTime: flight.depTime,
    arrTime: flight.arrTime,
    duration: flight.duration,
    stops: flight.stops,
    travelDate: ticketDate(search.depart),                       // "Fri, 03 Jul 2026"
    // "Fri 03 July, 08:45"
    boardingTime: `${day(search.depart, { weekday: 'short' })} ${day(search.depart, { day: '2-digit', month: 'long' })}, ${minutesBefore(flight.depTime, BOARDING_MINUTES_BEFORE)}`,
    terminals: `${TERMINALS[flight.fromCode] ?? '-'} → ${TERMINALS[flight.toCode] ?? '-'}`, // "T3 → T2"
    bookedOn: bookingTimestamp(bookedAt),
  }
}
