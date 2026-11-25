const FLIGHTS_API = 'https://travel-booking-backend-8bzz.onrender.com/api/v1/flights/search'

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: { message: 'Method not allowed.' } })
  }

  const query = new URLSearchParams()
  for (const key of ['origin', 'destination', 'departureDate']) {
    const value = request.query?.[key]
    if (typeof value === 'string' && value) query.set(key, value)
  }

  try {
    const upstream = await fetch(`${FLIGHTS_API}?${query}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    })
    const payload = await upstream.text()
    response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
    return response.status(upstream.status).send(payload)
  } catch {
    return response.status(502).json({ error: { message: 'Could not connect to the flight search server. Please try again.' } })
  }
}
