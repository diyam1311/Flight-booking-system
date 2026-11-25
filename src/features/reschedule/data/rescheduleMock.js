// DEMO DATA ONLY - delete this file (and the MOCK_ lines in services/rescheduleService.js)
// when the real backend sends this data. Every object below is the shape the page expects from the backend.

// ---------- Step 1: "Select Flight" ----------

export const MOCK_OFFER = {
  // the booking that is being changed ("Current Itinerary Modification" card)
  itinerary: {
    status: 'Reschedule Requested',
    route: { from: 'DEL', to: 'BOM' },
    airline: 'IndiGo 6E-203 · Airbus A321',
    departure: { date: 'Fri, 3 July 2026', time: '10:15 IST (Terminal 2)' },
    seat: { title: 'Seat 14B (Standard)', note: '1 Adult · Check-in 15kg' },
    reference: { pnr: 'MY-DEL-89241', note: 'Verified OTA Agency PNR' },
  },
  // the date tiles. `note` is the small line under the date.
  dates: [
    { id: '2026-07-01', day: 'WED', label: '1 JUL', long: 'Wed, 01 Jul 2026', note: 'Original' },
    { id: '2026-07-02', day: 'THU', label: '2 JUL', long: 'Thu, 02 Jul 2026', note: 'GDS Open' },
    { id: '2026-07-03', day: 'FRI', label: '3 JUL', long: 'Fri, 03 Jul 2026', note: 'GDS Open' },
    { id: '2026-07-04', day: 'SAT', label: '4 JUL', long: 'Sat, 04 Jul 2026', note: 'GDS Open' },
    { id: '2026-07-05', day: 'SUN', label: '5 JUL', long: 'Sun, 05 Jul 2026', note: 'GDS Open' },
    { id: '2026-07-06', day: 'MON', label: '6 JUL', long: 'Mon, 06 Jul 2026', note: 'GDS Open' },
    { id: '2026-07-07', day: 'TUE', label: '7 JUL', long: 'Tue, 07 Jul 2026', note: 'GDS Open' },
    { id: '2026-07-08', day: 'WED', label: '8 JUL', long: 'Wed, 08 Jul 2026', note: 'GDS Open' },
  ],
  defaultDateId: '2026-07-04',
}

const DELHI = { code: 'DEL', city: 'Delhi' }
const MUMBAI = { code: 'BOM', city: 'Mumbai' }

// The flights offered for the chosen date (the demo shows the same 3 for every date).
export const MOCK_FLIGHTS = [
  {
    id: '6E-5188', airline: 'IndiGo', flightNo: '6E-5188', aircraft: 'Airbus A321neo', slot: 'Morning Slot',
    tags: ['High Airline Seat Availability', 'Same Baggage Tier (15kg)'],
    depTime: '09:30', arrTime: '11:40', duration: '2h 10m', stops: 'NON-STOP',
    from: { ...DELHI, airport: 'Indira Gandhi Intl, T2' }, to: { ...MUMBAI, airport: 'Chhatrapati Shivaji Maharaj, T1' },
    fare: { title: 'Fare: Requires Carrier Verification', note: 'IndiGo revenue desk approval needed for fare delta & waiver', action: 'Select & Chat With Us' },
  },
  {
    id: '6E-805', airline: 'IndiGo', flightNo: '6E-805', aircraft: 'Airbus A321neo', slot: 'Afternoon Slot',
    tags: ['Complimentary Hot Meal Transfer Eligible', 'Check-in 20kg Included'],
    depTime: '14:15', arrTime: '16:30', duration: '2h 15m', stops: 'NON-STOP',
    from: { ...DELHI, airport: 'Indira Gandhi Intl, T3' }, to: { ...MUMBAI, airport: 'Chhatrapati Shivaji Maharaj, T2' },
    fare: { title: 'Fare: Pending Carrier Quote', note: 'IndiGo central GDS reissue queue confirmation needed', action: 'Chat With Us to Check Fare' },
  },
  {
    id: '6E-2401', airline: 'IndiGo', flightNo: '6E-2401', aircraft: 'Airbus A320neo', slot: 'Evening Slot',
    tags: ['Flex Modification Bucket', 'Express Check-in Eligible'],
    depTime: '19:45', arrTime: '22:05', duration: '2h 20m', stops: 'NON-STOP',
    from: { ...DELHI, airport: 'Indira Gandhi Intl, T2' }, to: { ...MUMBAI, airport: 'Chhatrapati Shivaji Maharaj, T1' },
    fare: { title: 'Fare: Requires Carrier Verification', note: 'IndiGo revenue desk approval needed for fare difference quote', action: 'Select & Chat With Us' },
  },
]

// ---------- Step 2: "Airline Verification" (live chat with an agent) ----------

// A text between ** ** is shown bold (see components/chat/RichText.jsx).
export const buildMockSession = (flight, date) => ({
  id: 'IR-99201', // the reissue request number
  agent: { name: 'Rajesh Kumar', initials: 'RK', badge: 'DGCA DL-4819', role: 'Agent' },
  banner: 'Encrypted Session Initiated · Direct Carrier Link with IndiGo CRS',
  // the strip above the chat
  summary: {
    route: 'DEL → BOM',
    flight: `INDIGO ${flight.flightNo}`,
    when: `${date.long} · ${flight.depTime}`,
    originalPnr: '6E-W8K2Q',
    fareClass: 'Economy Regular (M)',
  },
  // card "NEW FLIGHT PROFILE"
  newFlight: { title: `IndiGo · ${flight.flightNo}`, text: `DEL, T3 → BOM T2 · ${date.long}, ${flight.depTime}` },
  messages: [
    { id: 'm1', from: 'user', time: '10:15 AM', author: 'You (A. Sharma)', text: `Hi, I want to reschedule my flight from Fri, 03 Jul 2026 to ${date.long} (IndiGo ${flight.flightNo}, ${flight.depTime}). How much will it cost to change?` },
    { id: 'm2', from: 'agent', time: '10:16 AM', author: 'Rajesh Kumar (Agent)', text: `Hello Mrs. Sharma, I have received your request for **IndiGo ${flight.flightNo}** on ${date.long}. Because this ticket was booked under wholesale OTA inventory, we must directly verify the fare rules and seat re-allocation with IndiGo's airline CRS and revenue desk.` },
    {
      id: 'm3', from: 'notice', title: 'Notice from Agent', tag: 'CARRIER PROTOCOL',
      text: "IndiGo's revenue and reissue desk typically takes between **2 hours up to 24 hours (1 business day)** to calculate the exact fare difference, waive standard penalty fees, and authorize seat transfer. Please keep this session open or check back soon.",
      meta: ['Live SLA: Running Priority Queue', 'Auto-alert to +91 98***412'],
    },
    { id: 'm4', from: 'agent', time: '10:18 AM', author: 'Rajesh Kumar', text: "We have submitted Ticket Reissue Request **#IR-99201** directly to IndiGo. Once the airline clears the quote, your exact fare difference, fuel surcharge adjustments, and 18% GST breakdown will be locked in. We will notify you via WhatsApp (+91 98***412) and email as soon as it's ready!" },
  ],
  quickReplies: ['Baggage transfer?', 'Evening alternatives?', 'WhatsApp alert'],
  // the cards on the right of the chat
  status: {
    badge: 'IN REVIEW',
    waitLabel: 'ESTIMATED WAIT TIME', wait: 'Up to 24 hrs (1 Day)', progress: 78, sla: 'Standard SLA: Up to 24 hrs',
    steps: [
      { title: '1. Target Flight Selected', text: `${date.long}, ${flight.depTime} (IndiGo ${flight.flightNo})` },
      { title: '2. GDS Request Sent to IndiGo', text: 'Direct Amadeus CRS transmission #IR-99201' },
      { title: '3. Carrier Review & Penalty Waiver', text: '₹2,500 reschedule penalty waived by desk' },
      { title: '4. Final Fare Lock & Reissue Ready', text: 'Verified quote generated & ready for user' },
    ],
    next: { label: 'NEXT STEP', badge: 'Ready', text: 'IndiGo quote is pre-cleared. Review the itemized differential fare before confirmation.', action: 'View Final Ticket & Fare Breakdown (Step 3)' },
  },
})

// What the agent answers when the user writes something (demo only).
export const mockAgentReply = (text) => ({
  from: 'agent', author: 'Rajesh Kumar',
  text: `Thanks! I have added "${text}" to your request **#IR-99201** and will reply here as soon as IndiGo responds.`,
})

// ---------- Step 3: "Confirmation" ----------

export const MOCK_QUOTE = {
  lockSeconds: 7184, // fare is locked for 01:59:44 (the service turns this into expiresAt)
  ticket: {
    airline: 'IndiGo', flightNo: '6E-5188', aircraft: 'Airbus A321neo · Aircraft Equipped with Slimline Seating',
    fareName: 'ECONOMY SAVER', status: 'Confirmed Reissue Status',
    from: { time: '09:30', city: 'New Delhi (DEL)', terminal: 'Terminal 3 (T3)', date: 'SAT, 04 JUL 2026' },
    to: { time: '11:40', city: 'Mumbai (BOM)', terminal: 'Terminal 2 (T2)', date: 'SAT, 04 JUL 2026' },
    duration: '2h 10m Non-stop', path: 'Direct Sector Path · 1,148 km',
    passenger: { name: 'Kritika Sharma', type: 'Adult (18+)' },
    baggage: { allowance: '15 kg + 7 kg', note: 'Preserved Allowance' },
    surrendered: {
      title: 'Original Ticket Surrendered for Reissue', tag: 'Cancelled & Replaced',
      text: 'Flight: IndiGo 6E-203 · Scheduled Fri, 03 Jul 2026 at 06:15 AM. All original ticket fare values has been converted into airline exchange credit towards this new booking on 4 July 2026.',
    },
  },
  rules: {
    title: 'New Ticket Fare Rules Applied', tag: 'REISSUE CLASS M',
    items: [
      { title: 'Date Modification', text: 'Standard fees apply if altered again post-issuance up to 2 hrs before departure.' },
      { title: 'Cancellation Policy', text: 'Refundable component will return to original payment method less airline cancellation surcharge.' },
      { title: 'Priority Web Check-in', text: 'Boarding pass unlocks 48 hours prior to new departure time on Mobiyantra or IndiGo.' },
      { title: 'Meal & Seat Retention', text: 'Seat selection 12C successfully mapped. Complimentary standard water and beverage onboard.' },
    ],
  },
  // all money is in rupees (numbers); the page adds the ₹ sign
  ledger: {
    credit: 5842, baseFare: 6292, difference: 450,
    rows: [
      { label: 'IndiGo Rescheduling Fee', badge: '100% WAIVED', note: 'Mobiyantra Revenue Desk Special Waiver', noteIsLink: true, was: 2500, amount: 0 },
      { label: 'Aviation Security Fee (ASF) Adjustment', note: 'Sector rate matches original fee', amount: 0 },
      { label: 'Fuel Surcharge (YQ) Delta', note: 'Absorbed under current fuel tariff', amount: 0 },
      { label: 'Goods & Services Tax (GST 18%)', note: 'Applicable on ₹450 carrier delta', amount: 81, plus: true },
    ],
    saved: 2999, total: 531, guarantee: '2 hours',
    dispatch: { text: 'Your revised 13-digit E-Ticket and barcode will be delivered to kritikasharma@gmail.com and WhatsApp (+91 98765 43210) within 60 seconds upon payment confirmation.', note: '100% Protected under DGCA Passenger Rights Charter' },
  },
  desk: { reference: 'IND-REV-84920', phone: '+91 98765 43210' },
}
