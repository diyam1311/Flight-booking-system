// A UPI payment link. Any UPI app (Google Pay, PhonePe, Paytm, BHIM) can scan it and opens the payment with the amount filled in.

const MERCHANT_UPI_ID = 'mobiyantra@upi' // TODO: the real merchant UPI ID comes from the backend
const MERCHANT_NAME = 'Mobiyantra'

// buildUpiLink({ amount: 3890, note: 'Flight DEL-BOM' }) -> "upi://pay?pa=...&am=3890.00&..."
// Every call gets a new transaction reference (tr), so every link - and every QR code - is different.
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
