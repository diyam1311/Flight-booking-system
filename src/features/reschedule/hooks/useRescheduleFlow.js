import { useEffect, useState } from 'react'
import { confirmReschedule, getFlightOptions, getReissueQuote, getRescheduleOffer, startRescheduleChat } from '../services/rescheduleService'

// Everything the Reschedule page needs, in one place.
//   step 1 = Select Flight   2 = Airline Verification (chat)   3 = Confirmation
// The 3 steps are NOT 3 URLs: the page just swaps what is shown under the step bar.
export function useRescheduleFlow(bookingId) {
  const [step, setStep] = useState(1)
  const [offer, setOffer] = useState(null)     // step 1: itinerary + dates (null = loading)
  const [dateId, setDateId] = useState(null)   // step 1: the chosen date tile
  const [flights, setFlights] = useState(null) // step 1: flights of that date (null = loading)
  const [session, setSession] = useState(null) // step 2: the chat session
  const [quote, setQuote] = useState(null)     // step 3: the airline's final quote
  const [busy, setBusy] = useState(false)      // a button is waiting for the backend
  const [error, setError] = useState('')

  useEffect(() => {
    let stopped = false // so we do nothing if the user already left this page
    getRescheduleOffer(bookingId)
      .then((data) => { if (!stopped) { setOffer(data); setDateId(data.defaultDateId) } })
      .catch(() => { if (!stopped) setError('Could not load your booking. Please try again.') })
    return () => { stopped = true }
  }, [bookingId])

  useEffect(() => {
    if (!dateId) return undefined
    let stopped = false
    setFlights(null)
    getFlightOptions(bookingId, dateId)
      .then((list) => { if (!stopped) setFlights(list) })
      .catch(() => { if (!stopped) { setFlights([]); setError('Could not load the flights. Please try again.') } })
    return () => { stopped = true }
  }, [bookingId, dateId])

  // Runs one backend action: disables the buttons meanwhile and shows an error if it fails.
  const run = async (action) => {
    setBusy(true)
    setError('')
    try {
      return await action()
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.')
      return undefined
    } finally {
      setBusy(false)
    }
  }

  const selectFlight = (flight) => run(async () => {
    const date = offer.dates.find((d) => d.id === dateId)
    setSession(await startRescheduleChat({ bookingId, flight, date }))
    setStep(2)
  })

  const viewFinalQuote = () => run(async () => {
    setQuote(await getReissueQuote(session.id))
    setStep(3)
  })

  // -> true when it worked (the page then leaves)
  const confirm = async () => Boolean(await run(() => confirmReschedule({ bookingId, sessionId: session.id })))

  // the step bar: only earlier steps can be opened again
  const goBackTo = (n) => { if (n < step) setStep(n) }

  return { step, offer, dateId, setDateId, flights, session, quote, busy, error, selectFlight, viewFinalQuote, confirm, goBackTo, goToChat: () => setStep(2) }
}
