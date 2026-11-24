import { normalizeIdentifier } from './authService'

/**
 * "Forgot Password?" - asks the server to send a reset link to the user's email / mobile number.
 *
 * TODAY this is a MOCK (it only waits a moment and says "sent"), so the page can be tried without a backend.
 * WHEN THE BACKEND IS READY:
 *   1. set USE_MOCK to false
 *   2. check the URL and the body below match your API (change them here, nothing else needs to change)
 * The page only needs this function to finish without an error (sent) or to throw an Error with a message to show.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const USE_MOCK = true

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) // fake network delay

export async function requestPasswordReset(identifier) {
  const cleanIdentifier = normalizeIdentifier(identifier)

  if (USE_MOCK) {
    await wait(800)
    return
  }

  let response
  try {
    response = await fetch(`${API_BASE_URL}/v1/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: cleanIdentifier }),
    })
  } catch {
    throw new Error('Could not connect to the server. Please try again.')
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.error?.message || payload?.message || 'Could not send the reset link. Please try again.')
  }
}

/**
 * "Set New Password" - sends the new password together with the secret token from the e-mail link.
 *
 * TODAY (USE_MOCK = true) it only waits a moment and says "done", because the login backend cannot change a
 * password without a real endpoint. WHEN THE BACKEND IS READY:
 *   1. keep USE_MOCK = false (shared with requestPasswordReset above)
 *   2. check the URL and the body below match your API
 * It finishes without an error when the password was changed, or throws an Error with a message to show
 * (for example "link expired"). The password is only sent to the server, never stored in the browser.
 */
export async function resetPassword({ token, password }) {
  if (USE_MOCK) {
    await wait(800)
    return
  }

  if (!token) throw new Error('This reset link is invalid or has expired. Please request a new one.')

  let response
  try {
    response = await fetch(`${API_BASE_URL}/v1/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
  } catch {
    throw new Error('Could not connect to the server. Please try again.')
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.error?.message || payload?.message || 'Could not update the password. Please try again.')
  }
}
