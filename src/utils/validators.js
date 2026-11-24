// Small form checks used by the login, signup and booking forms.

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

// Indian 10-digit mobile or an international E.164 number.
export const isMobile = (value) => {
  const mobile = value.trim()
  if (/^\+?[1-9]\d{7,14}$/.test(mobile.replace(/\s/g, ''))) return true
  return /^(91)?[6-9]\d{9}$/.test(mobile.replace(/\D/g, ''))
}

// "+91 93417 50473" -> "9341750473"
export const normalizeMobile = (value) => value.replace(/\D/g, '').slice(-10)

export const isStrongEnough = (password) => password.length >= 8
