// Fixed values of the booking-confirmed popup and the e-ticket page.

// Where "Contact our support" / "Contact Support" lead to (same placeholder address as the footer)
export const SUPPORT_EMAIL = 'contact@company.com'

// Every ticket includes this checked baggage (the booking popup says "Checked Baggage (15kg) + Cabin (7kg)")
export const BAGGAGE_ALLOWANCE = '15Kg'

// Boarding starts this many minutes before the flight leaves
export const BOARDING_MINUTES_BEFORE = 35

// Terminal of each airport. Demo values until the flight API sends the real ones.
export const TERMINALS = { DEL: 'T3', BOM: 'T2', BLR: 'T1', HYD: 'T1', CCU: 'T2', GOI: 'T1' }

// Seats are given as row + letter, e.g. "14C" (rows 1 to 32, letters A to F), and gates as a number
export const SEAT_ROWS = 32
export const SEAT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
export const GATE_COUNT = 12
