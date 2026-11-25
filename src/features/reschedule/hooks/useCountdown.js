import { useEffect, useState } from 'react'

// Seconds left until `expiresAt` (a time in ms). Updates every second and stops at 0.
export function useCountdown(expiresAt) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])
  return Math.max(0, Math.round((expiresAt - now) / 1000))
}
