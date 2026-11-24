// Fake flights for the demo. Times, prices and airlines are the same for every route.
// refund: 'full' | 'partial' | 'none'  (used by the Refundability filter)
// The filters read depTime / arrTime ("HH:MM", 24h, no flight lands after midnight), duration, price, airline and refund.
export const MOCK_FLIGHTS = [
  { id: 1, airline: 'IndiGo', code: '6E 532', tag: 'Best Value', depTime: '09:20', arrTime: '11:35', duration: '2h 15m', stops: 'Non Stop', price: 5842, refund: 'full' },
  { id: 2, airline: 'Air India', code: 'AI 865', tag: '', depTime: '07:00', arrTime: '09:15', duration: '2h 15m', stops: 'Non Stop', price: 6120, refund: 'partial' },
  { id: 3, airline: 'Akasa Air', code: 'QP 1103', tag: '', depTime: '11:45', arrTime: '14:05', duration: '2h 20m', stops: 'Non Stop', price: 5490, refund: 'none' },
  { id: 4, airline: 'SpiceJet', code: 'SG 8169', tag: '', depTime: '14:30', arrTime: '16:50', duration: '2h 20m', stops: 'Non Stop', price: 5320, refund: 'partial' },
  { id: 5, airline: 'Air India Express', code: 'IX 1122', tag: '', depTime: '18:10', arrTime: '21:40', duration: '3h 30m', stops: '1 Stop', price: 4980, refund: 'none' },
  { id: 6, airline: 'IndiGo', code: '6E 2042', tag: '', depTime: '21:15', arrTime: '23:30', duration: '2h 15m', stops: 'Non Stop', price: 6350, refund: 'none' },
  { id: 7, airline: 'IndiGo', code: '6E 6117', tag: '', depTime: '05:45', arrTime: '07:40', duration: '1h 55m', stops: 'Non Stop', price: 4750, refund: 'none' },
  { id: 8, airline: 'Air India', code: 'AI 2813', tag: '', depTime: '12:30', arrTime: '17:00', duration: '4h 30m', stops: '1 Stop', price: 7480, refund: 'full' },
  { id: 9, airline: 'Akasa Air', code: 'QP 1205', tag: '', depTime: '16:20', arrTime: '18:35', duration: '2h 15m', stops: 'Non Stop', price: 6890, refund: 'partial' },
  { id: 10, airline: 'SpiceJet', code: 'SG 3045', tag: '', depTime: '06:15', arrTime: '10:45', duration: '4h 30m', stops: '1 Stop', price: 4310, refund: 'none' },
  { id: 11, airline: 'Air India', code: 'AI 101', tag: '', depTime: '19:00', arrTime: '21:15', duration: '2h 15m', stops: 'Non Stop', price: 9250, refund: 'full' },
  { id: 12, airline: 'Alliance Air', code: '9I 603', tag: 'Cheapest', depTime: '10:05', arrTime: '16:35', duration: '6h 30m', stops: '1 Stop', price: 3890, refund: 'none' },
  { id: 13, airline: 'Star Air', code: 'S5 205', tag: '', depTime: '15:40', arrTime: '19:00', duration: '3h 20m', stops: '1 Stop', price: 4420, refund: 'partial' },
  { id: 14, airline: 'Air India Express', code: 'IX 2276', tag: '', depTime: '08:50', arrTime: '11:10', duration: '2h 20m', stops: 'Non Stop', price: 5210, refund: 'none' },
]

// logoText / logoColor: the coloured square shown instead of the airline logo image.
export const AIRLINE_LOGOS = {
  IndiGo: { logoText: 'IG', logoColor: 'bg-[#1B2A9E]' },
  'Air India': { logoText: 'AI', logoColor: 'bg-[#C8102E]' },
  'Akasa Air': { logoText: 'QP', logoColor: 'bg-[#EA580C]' },
  SpiceJet: { logoText: 'SG', logoColor: 'bg-[#D91F26]' },
  'Air India Express': { logoText: 'IX', logoColor: 'bg-[#E11D48]' },
  'Alliance Air': { logoText: '9I', logoColor: 'bg-[#0B5FA5]' },
  'Star Air': { logoText: 'S5', logoColor: 'bg-[#7C3AED]' },
}
