// Fixed texts of the Cancel Booking page + the demo rules of the mock service.

// The two ways to cancel. `id` is what the backend receives as `mode`.
export const CANCEL_OPTIONS = [
  { id: 'full', title: 'Full Specific Passenger', text: 'Remove your entire booking and get a refund as per the airlines’ policy.', badge: 'Refund application as airline policy' },
  { id: 'passengers', title: 'Cancel Specific Passenger', text: 'Remove a passenger from the booking (if allowed by the airline).', badge: 'Partial refund may apply' },
]

// The "Select reason" list. The reason is optional.
export const CANCEL_REASONS = [
  'Change of plans',
  'Found a better price',
  'Booked by mistake',
  'Personal or medical emergency',
  'Flight schedule changed',
  'Other',
]

// "Important Information" box
export const IMPORTANT_INFO = [
  'Cancellation charges may apply as per the airline’s policy.',
  'Refund amount will be credited to your original payment method within 7-10 business days.',
  'Once cancelled, the booking cannot be reinstated.',
  'For any issues, please contact our support team.',
]

// DEMO RULE (used by the mock service only): the airline keeps 10% of the fare it refunds.
// The real backend decides the refund, then this constant can be deleted.
export const CANCELLATION_CHARGE_RATE = 0.1
