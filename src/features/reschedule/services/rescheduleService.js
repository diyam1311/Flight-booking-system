import { MOCK_FLIGHTS, MOCK_OFFER, MOCK_QUOTE, buildMockSession, mockAgentReply } from '../data/rescheduleMock'
import { nowTime } from '../utils/format'

/**
 * MOCK BACKEND - DEMO ONLY.
 * Every function below is one backend call. When your real API is ready, replace the body of the
 * function with fetch()/axios (the suggested URL is written above each one) and keep the same return
 * shape - no page or component needs to change. After that delete data/rescheduleMock.js and wait().
 */

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) // fake network delay

// Step 1 - the booking being changed + the dates that can be chosen.
// REAL API: GET /v1/bookings/:bookingId/reschedule-options
// -> { itinerary, dates: [{ id, day, label, long, note }], defaultDateId }
export async function getRescheduleOffer(bookingId) {
  await wait(300)
  return MOCK_OFFER
}

// Step 1 - flights for the chosen date.
// REAL API: GET /v1/bookings/:bookingId/reschedule-options/flights?date=2026-07-04
// -> [{ id, airline, flightNo, aircraft, slot, tags, depTime, arrTime, duration, stops, from, to, fare }]
export async function getFlightOptions(bookingId, dateId) {
  await wait(400)
  return MOCK_FLIGHTS
}

// Step 1 -> 2 - "Select & Chat With Us": opens the request with the airline and the chat with an agent.
// REAL API: POST /v1/reschedule-requests   body { bookingId, flightId, date }
// -> { id, agent, banner, summary, newFlight, messages, quickReplies, status }
export async function startRescheduleChat({ bookingId, flight, date }) {
  await wait(500)
  return buildMockSession(flight, date)
}

// Step 2 - the user sends a message. Returns the agent's answer.
// REAL API: POST /v1/reschedule-requests/:sessionId/messages   body { text }
// -> { id, from: 'agent', author, time, text }
// (for a real live chat, replace this with a WebSocket / polling: the hook only needs "a new message arrived")
export async function sendChatMessage(sessionId, text) {
  await wait(1200)
  return { ...mockAgentReply(text), id: `agent-${Date.now()}`, time: nowTime() }
}

// Step 2 -> 3 - the airline's final quote: new ticket + fare breakdown + how long the price is locked.
// REAL API: GET /v1/reschedule-requests/:sessionId/quote
// -> { expiresAt (ms), ticket, rules, ledger, desk }
export async function getReissueQuote(sessionId) {
  await wait(500)
  const { lockSeconds, ...quote } = MOCK_QUOTE
  return { ...quote, expiresAt: Date.now() + lockSeconds * 1000 }
}

// Step 3 - "Confirm Reschedule & Pay".
// REAL API: POST /v1/reschedule-requests/:sessionId/confirm
// -> { bookingId }   (if a payment is needed the backend can also send a payment link to open instead)
export async function confirmReschedule({ bookingId, sessionId }) {
  await wait(800)
  return { bookingId }
}
