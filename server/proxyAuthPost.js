const AUTH_API = 'https://travel-booking-backend-8bzz.onrender.com/api/v1/auth/'

export async function proxyAuthPost(request, response, endpoint, connectionError) {
  response.setHeader('Cache-Control', 'no-store')
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: { message: 'Method not allowed.' } })
  }

  try {
    const headers = { 'Content-Type': 'application/json' }
    if (request.headers.cookie) headers.Cookie = request.headers.cookie

    const upstream = await fetch(new URL(endpoint, AUTH_API), {
      method: 'POST',
      headers,
      body: JSON.stringify(request.body),
      redirect: 'error',
      signal: AbortSignal.timeout(30000),
    })

    // The Google challenge sets a cookie that must reach the browser, then return
    // to the backend on /complete. Strip the backend Domain so this host can set it.
    const cookies = upstream.headers.getSetCookie?.() || []
    if (cookies.length) {
      response.setHeader('Set-Cookie', cookies.map((cookie) => cookie.replace(/;\s*Domain=[^;]*/ig, '')))
    }

    if (upstream.status !== 502) {
      const payload = await upstream.json().catch((error) => {
        if (error instanceof SyntaxError) return {}
        throw error
      })
      return response.status(upstream.status).json(payload || {})
    }
  } catch {
    // A timeout or an interrupted upstream connection uses the same public error.
  }
  return response.status(502).json({ error: { message: connectionError } })
}
