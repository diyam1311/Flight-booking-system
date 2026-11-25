import { isEmail } from '@/utils/validators'

/**
 * Registration and login are connected to the live API.
 * NEVER store real passwords in the browser.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

async function readApiResponse(response, fallbackMessage) {
  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(
      payload?.error?.message || payload?.message || payload?.error || fallbackMessage
    )
  }
  return payload
}

function decodeGoogleCredential(idToken) {
  try {
    const encoded = idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '=')))
  } catch {
    return {}
  }
}

export async function startGoogleChallenge() {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/v1/auth/social/google/challenge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({}),
    })
  } catch {
    throw new Error('Could not connect to the Google sign-in server. Please try again.')
  }
  const payload = await readApiResponse(response, 'Could not start Google sign-in. Please try again.')
  return payload?.data || payload || {}
}

export async function loginWithGoogle(idToken, rememberMe = false) {
  let completeResponse
  try {
    completeResponse = await fetch(`${API_BASE_URL}/v1/auth/social/google/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ idToken, rememberMe: Boolean(rememberMe) }),
    })
  } catch {
    throw new Error('Could not connect to the Google sign-in server. Please try again.')
  }

  const payload = await readApiResponse(completeResponse, 'Google sign-in failed. Please try again.')
  const googleProfile = decodeGoogleCredential(idToken)
  const userPayload = payload?.data?.user || payload?.user || payload?.data || payload || {}
  const email = userPayload.email || googleProfile.email || ''
  const name = userPayload.fullName || userPayload.full_name || userPayload.name ||
    [userPayload.firstName || userPayload.first_name || googleProfile.given_name,
      userPayload.lastName || userPayload.last_name || googleProfile.family_name].filter(Boolean).join(' ') ||
    googleProfile.name || email.split('@')[0] || 'Google user'

  return {
    id: userPayload.id || userPayload._id || googleProfile.sub || email,
    name,
    email,
    mobile: userPayload.mobileNumber || userPayload.mobile || '',
  }
}

export function normalizeIdentifier(value) {
  const identifier = value.trim()
  if (isEmail(identifier)) return identifier.toLowerCase()
  if (identifier.startsWith('+')) return identifier.replace(/\s/g, '')
  const digits = identifier.replace(/\D/g, '')
  return digits.length === 10 ? `+91${digits}` : `+${digits}`
}

export async function loginUser({ identifier, password, remember }, rememberMe = false) {
  const cleanIdentifier = normalizeIdentifier(identifier)

  let response
  try {
    response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: cleanIdentifier,
        password,
        rememberMe: Boolean(remember ?? rememberMe),
      }),
    })
  } catch {
    throw new Error('Could not connect to the login server. Please try again.')
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.message ||
      payload?.error ||
      'Login failed. Please check your details and try again.'
    throw new Error(message)
  }

  const userPayload = payload?.data?.user || payload?.user || payload?.data || payload || {}
  return {
    id: userPayload.id || userPayload._id || cleanIdentifier,
    name: userPayload.firstName || userPayload.fullName || userPayload.name ||
      userPayload.first_name || userPayload.full_name || '',
    email: userPayload.email || (isEmail(cleanIdentifier) ? cleanIdentifier : ''),
    mobile: userPayload.mobileNumber || userPayload.mobile || (!isEmail(cleanIdentifier) ? cleanIdentifier : ''),
  }
}

export async function registerUser({ name, email, mobile, password, agreed }) {
  const cleanEmail = email.trim().toLowerCase()
  const digits = mobile.replace(/\D/g, '')
  const mobileNumber = mobile.trim().startsWith('+')
    ? mobile.trim().replace(/\s/g, '')
    : digits.length === 10
      ? `+91${digits}`
      : `+${digits}`

  let response
  try {
    response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: name.trim(),
        mobileNumber,
        email: cleanEmail,
        password,
        acceptTerms: Boolean(agreed),
      }),
    })
  } catch {
    throw new Error('Could not connect to the registration server. Please try again.')
  }

  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      payload?.error?.message ||
      payload?.message ||
      payload?.error ||
      'Registration failed. Please check your details and try again.'
    throw new Error(message)
  }

  const registered = payload?.data?.user || payload?.user || payload?.data || {}
  const profileName = registered.fullName || registered.name || name.trim()
  return {
    id: registered.id || registered._id || String(Date.now()),
    name: profileName,
    email: registered.email || cleanEmail,
    mobile: registered.mobileNumber || registered.mobile || mobileNumber,
  }
}
