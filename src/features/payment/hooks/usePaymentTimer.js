import { useEffect, useState } from 'react'

// Counts down from `minutes` and returns the time as "11:52".
// TODO: when it reaches 00:00 the session is over (send the user back to the search results).
export default function usePaymentTimer(minutes) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => Math.max(s - 1, 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(Math.floor(secondsLeft / 60))}:${pad(secondsLeft % 60)}`
}
