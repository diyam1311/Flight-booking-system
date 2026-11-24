// DEMO DATA ONLY - delete this file (and the 2 lines about MOCK_BOOKINGS in services/manageBookingService.js)
// when the real backend sends the bookings. Same shape as a real booking (see ticket/services/ticketService.js),
// plus an optional `status` and `paymentMethod`, which the backend can send too.
// Try them: reference 6E4FZB + last name Sharma.

const DELHI = { code: 'DEL', city: 'Delhi', airport: 'Indira Gandhi International Airport, T-3' }
const MUMBAI = { code: 'BOM', city: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International Airport' }
const BENGALURU = { code: 'BLR', city: 'Bengaluru', airport: 'Kempegowda International Airport' }
const HYDERABAD = { code: 'HYD', city: 'Hyderabad', airport: 'Rajiv Gandhi International Airport' }

const traveller = (first, last, ticketNumber, seat, gender = 'Female') => ({
  key: ticketNumber, type: 'adult', title: gender === 'Male' ? 'Mr' : 'Mrs', first, middle: '', last,
  gender, dob: '1990-10-12', nationality: 'Indian', ticketNumber, seat,
})

const bangaloreToHyderabad = (id, last, ticketNumber, seat) => ({
  id, bookedAt: '2024-02-20T09:30:00.000Z', gate: 4, status: 'Upcoming', paymentMethod: 'Card',
  search: { from: BENGALURU, to: HYDERABAD, depart: '2024-03-05', cabin: 'Economy' },
  flight: { airline: 'IndiGo', code: '6E 321', depTime: '07:10', arrTime: '08:30', duration: '1h 20m', stops: 'Non Stop', fromCode: 'BLR', toCode: 'HYD', price: 3800 },
  contact: { email: 'riya@example.com', mobile: '+91 9876500012' },
  breakdown: { fare: 3800, seat: 630, fee: 149, discount: 0, total: 4579 },
  passengers: [traveller('Riya', last, ticketNumber, seat)],
})

export const MOCK_BOOKINGS = [
  {
    id: '6E4FZB', bookedAt: '2024-02-12T10:24:00.000Z', gate: 2, status: 'Confirmed', paymentMethod: 'UPI',
    search: { from: DELHI, to: MUMBAI, depart: '2024-02-12', cabin: 'Economy' },
    flight: { airline: 'IndiGo', code: '6E 572', aircraft: 'Airbus A320', depTime: '10:20', arrTime: '12:45', duration: '2h 25m', stops: 'Non Stop', fromCode: 'DEL', toCode: 'BOM', price: 3149 },
    contact: { email: 'kritika@example.com', mobile: '+91 9876543210' },
    breakdown: { fare: 6298, seat: 1260, fee: 442, discount: 0, total: 8000 },
    passengers: [traveller('Kritika', 'Sharma', '647IND89', '14C'), traveller('Rohan', 'Gupta', '648IND90', '14D', 'Male')],
  },
  bangaloreToHyderabad('A0K3L', 'Verma', '512IND41', '9A'),
  bangaloreToHyderabad('B1N7T', 'Rao', '513IND42', '9B'),
  bangaloreToHyderabad('C5R8V', 'Nair', '514IND43', '9C'),
]
