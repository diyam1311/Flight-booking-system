export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: { message: 'Method not allowed.' } })
  }

  try {
    const upstream = await fetch('https://travel-booking-backend-8bzz.onrender.com/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: request.body?.identifier }),
    })
    const payload = await upstream.text()
    response.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json')
    return response.status(upstream.status).send(payload)
  } catch {
    return response.status(502).json({ error: { message: 'Could not connect to the password reset server. Please try again.' } })
  }
}
