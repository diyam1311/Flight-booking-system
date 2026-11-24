import https from 'node:https'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: { message: 'Method not allowed.' } })
  }

  const body = JSON.stringify(request.body)

  const upstream = await new Promise((resolve) => {
    const req = https.request(
      'https://travel-booking-backend-8bzz.onrender.com/api/v1/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          let payload = null
          try { payload = JSON.parse(data) } catch {}
          resolve({ status: res.statusCode || 502, payload })
        })
      }
    )

    req.setTimeout(30000, () => req.destroy(new Error('Upstream timeout')))
    req.on('error', () => resolve({ status: 502, payload: null }))
    req.end(body)
  })

  if (upstream.status === 502) {
    return response.status(502).json({
      error: { message: 'Could not connect to the registration server. Please try again.' },
    })
  }

  return response.status(upstream.status).json(upstream.payload || {})
}
