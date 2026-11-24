/**
 * MOCK BACKEND – DEMO ONLY.
 * When your real API is ready, replace the body of searchFlights() with a fetch()/axios call.
 * Keep the same return shape ({ flights, total }) and nothing else in the app needs to change.
 *
 * `search` is what the Search Flights button on the homepage sends:
 *   { trip, from: { code, city, airport }, to: { code, city, airport }, depart, ret, cabin, pax }
 */
import { AIRLINE_LOGOS, MOCK_FLIGHTS } from '../data/mockFlights'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) // fake network delay

// "Indira Gandhi International Airport, T-3" -> "Indira Gandhi Intl."
const shortAirport = (name) => name.split(',')[0].replace(' International Airport', ' Intl.')

export async function searchFlights(search) {
  await wait(2500)

  // add the airline logo and the searched cities to every flight
  const flights = MOCK_FLIGHTS.map((flight) => ({
    ...flight,
    ...AIRLINE_LOGOS[flight.airline],
    fromCode: search.from.code,
    fromAirport: shortAirport(search.from.airport),
    toCode: search.to.code,
    toAirport: shortAirport(search.to.airport),
  }))

  return { flights, total: flights.length }
}
