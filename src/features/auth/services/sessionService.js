// Remembers who is logged in, in the browser.
// "Remember login" ticked  -> localStorage   (stays after closing the browser)
// "Remember login" empty   -> sessionStorage (cleared when the tab closes)
const SESSION_KEY = 'mobiyantra_session'

// A saved session is only trusted if it looks like a real user (has a name and an email).
// Anything else (old/broken data) is thrown away so the app can never crash on it.
const isValidUser = (u) => u && typeof u === 'object' && typeof u.name === 'string' && typeof u.email === 'string'

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
}

export function loadSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
    const user = saved ? JSON.parse(saved) : null
    if (isValidUser(user)) return user
    if (saved) clearSession()
    return null
  } catch {
    return null
  }
}

export function saveSession(user, remember) {
  clearSession()
  const storage = remember ? localStorage : sessionStorage
  storage.setItem(SESSION_KEY, JSON.stringify(user))
}

