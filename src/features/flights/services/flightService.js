import { AIRLINE_LOGOS } from '../data/mockFlights'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

const shortAirport = (name = '') => name.split(',')[0].replace(' International Airport', ' Intl.')

function formatTime(value) {
  if (!value) return '--:--'
  return String(value).match(/(?:T|^)(\d{2}:\d{2})/)?.[1] || String(value)
}

function formatDuration(duration, departureAt, arrivalAt) {
  if (duration) return typeof duration === 'number' ? `${Math.floor(duration / 60)}h ${duration % 60}m` : duration
  const start = Date.parse(departureAt)
  const end = Date.parse(arrivalAt)
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return '--'
  const minutes = Math.round((end - start) / 60000)
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

function normalizeFlight(flight, search, index) {
  const airline = flight.airline || 'Airline'
  const price = Number(flight.fare?.amount ?? flight.price ?? 0)
  const fallbackLogo = {
    logoText: airline.replace(/[^A-Z0-9]/gi, '').slice(0, 2).toUpperCase(),
    logoColor: 'bg-slate-600',
  }

  return {
    id: flight.offerId || flight.id || flight.flightNumber || index,
    airline,
    code: flight.flightNumber || flight.code || '',
    tag: flight.tag || '',
    depTime: formatTime(flight.departureAt || flight.departureTime || flight.depTime),
    arrTime: formatTime(flight.arrivalAt || flight.arrivalTime || flight.arrTime),
    duration: formatDuration(flight.duration || flight.durationMinutes, flight.departureAt, flight.arrivalAt),
    stops: flight.stops ?? 'Non Stop',
    price: Number.isFinite(price) ? price : 0,
    refund: flight.refund || flight.refundability || 'none',
    fromCode: flight.origin || search.from.code,
    fromAirport: shortAirport(search.from.airport),
    toCode: flight.destination || search.to.code,
    toAirport: shortAirport(search.to.airport),
    ...(AIRLINE_LOGOS[airline] || fallbackLogo),
  }
}

export async function searchFlights(search) {
  const query = new URLSearchParams({
    origin: search.from.code,
    destination: search.to.code,
    departureDate: search.depart,
  })

  let response
  try {
    response = await fetch(`${API_BASE_URL}/v1/flights/search?${query}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new Error('Could not connect to the flight search server. Please try again.')
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(payload?.error?.message || payload?.message || 'Could not load flights. Please try again.')
  }

  const flightsData = Array.isArray(payload) ? payload : payload?.flights || payload?.data?.flights || []
  const flights = (Array.isArray(flightsData) ? flightsData : []).map((flight, index) => normalizeFlight(flight, search, index))
  return { flights, total: payload?.total ?? payload?.data?.total ?? flights.length }
}
