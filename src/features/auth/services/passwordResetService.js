import { normalizeIdentifier } from './authService'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

export async function requestPasswordReset(identifier) {
  const cleanIdentifier = normalizeIdentifier(identifier)

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

export async function resetPassword({ token, password }) {
  if (!token) throw new Error('This reset link is invalid or has expired. Please request a new one.')

  let response
  try {
    response = await fetch('https://travel-booking-backend-8bzz.onrender.com/api/v1/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: password }),
    })
  } catch {
    throw new Error('Could not connect to the server. Please try again.')
  }

  if (response.status === 204) return

  const payload = await response.json().catch(() => null)
  throw new Error(payload?.error?.message || 'Password update failed. Please try again.')
}
