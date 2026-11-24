// The little coloured badge of a booking in the Recents list.
//   departed already          -> "Completed"
//   leaves within 7 days      -> "Confirmed"  (get ready to travel)
//   leaves later              -> "Upcoming"
// When the real backend sends a status of its own, return that here instead.
const DAY = 24 * 60 * 60 * 1000

export function getBookingStatus({ search, flight, status }) {
  if (status) return status // the backend (or a mock booking) can send its own status
  const departsIn = new Date(`${search.depart}T${flight.depTime}:00`) - new Date()
  if (departsIn < 0) return 'Completed'
  return departsIn <= 7 * DAY ? 'Confirmed' : 'Upcoming'
}
