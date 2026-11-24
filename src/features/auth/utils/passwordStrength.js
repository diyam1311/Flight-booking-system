// Rates a password for the "Security Rating" bar of the Set New Password page.
// Returns how many of the 4 bar segments to fill (0-4) and the word to show.
// The rating is only a hint for the user. The real rule is in the page: at least 8 characters.
const LABELS = ['', 'Weak', 'Fair', 'Strong', 'Very strong']

export function getPasswordStrength(password) {
  if (!password) return { filled: 0, label: '' }

  const checks = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password), // small and capital letters
    /\d/.test(password),                               // a number
    /[^A-Za-z0-9]/.test(password),                     // a symbol such as # or !
  ]
  const score = checks.filter(Boolean).length

  let filled = Math.min(score, 3)
  if (password.length < 8) filled = Math.min(filled, 1) // too short is always weak
  if (score === 4 && password.length >= 14) filled = 4   // the last segment needs a long password

  return { filled, label: LABELS[filled] }
}
