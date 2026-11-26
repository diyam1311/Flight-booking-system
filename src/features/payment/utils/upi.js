// A UPI link for Google Pay, PhonePe, Paytm, BHIM, and other UPI apps.
const MERCHANT_UPI_ID = 'mobiyantra@upi' // TODO: the real merchant UPI ID comes from the backend
const MERCHANT_NAME = 'Mobiyantra'

// Every call gets a new transaction reference, so each QR code has a unique link.
export function buildUpiLink({ amount, note }) {
  const reference = `MOB${Math.floor(Math.random() * 1e10)}`.padEnd(13, '0')
  const params = {
    pa: MERCHANT_UPI_ID,
    pn: MERCHANT_NAME,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: note,
    tr: reference,
  }
  return 'upi://pay?' + Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
}
