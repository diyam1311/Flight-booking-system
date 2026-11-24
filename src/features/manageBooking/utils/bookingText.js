import { PASSENGER_TYPES } from '@/features/booking/data/bookingOptions'

// Small text helpers shared by the Recents list and the My Booking page.

// "09:20" -> "09:20 AM",  "21:15" -> "09:15 PM"
export const time12 = (time) => {
  const [h, m] = time.split(':').map(Number)
  return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

// [adult, adult, child] -> "2 Adults, 1 Child"
export function passengerText(passengers) {
  return Object.entries(PASSENGER_TYPES)
    .map(([type, { label }]) => {
      const count = passengers.filter((p) => p.type === type).length
      if (!count) return null
      return `${count} ${count === 1 ? label : label === 'Child' ? 'Children' : `${label}s`}`
    })
    .filter(Boolean)
    .join(', ')
}
