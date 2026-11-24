// Formatting and checks for the card form (demo rules: 16-digit card, 3-digit CVV).

// "4532890012448921" -> "4532 8900 1244 8921"
export const formatCardNumber = (value) => value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')

// "0828" -> "08 / 28"
export function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
}

export const formatCvv = (value) => value.replace(/\D/g, '').slice(0, 3)

// Shown on the right of the card number box
export function getCardBrand(number) {
  const digits = number.replace(/\s/g, '')
  if (digits.startsWith('4')) return 'VISA'
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'AMEX'
  if (/^(60|65|81|82|508)/.test(digits)) return 'RuPay'
  return ''
}

// "08 / 28" is valid while that month is not over yet
function isFutureExpiry(expiry) {
  const match = expiry.match(/^(\d{2}) \/ (\d{2})$/)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
}

// -> { number, expiry, cvv, name } with a message for every wrong field (empty object = all good)
export function validateCard(card) {
  const errors = {}
  if (card.number.replace(/\s/g, '').length !== 16) errors.number = 'Enter the 16-digit card number'
  if (!isFutureExpiry(card.expiry)) errors.expiry = 'Enter a valid expiry date (MM / YY)'
  if (!/^\d{3}$/.test(card.cvv)) errors.cvv = 'Enter the 3-digit CVV'
  if (card.name.trim().length < 2) errors.name = 'Enter the name on the card'
  return errors
}
