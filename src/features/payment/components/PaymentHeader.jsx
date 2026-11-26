import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import BookingStepper from '@/features/booking/components/BookingStepper'
import { PATHS } from '@/config/paths'
import logo from '@/assets/logos/logo.svg'
import { PAYMENT_SESSION_MINUTES } from '../data/paymentOptions'

function usePaymentTimer(minutes) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60)
  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((seconds) => Math.max(seconds - 1, 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const pad = (number) => String(number).padStart(2, '0')
  return `${pad(Math.floor(secondsLeft / 60))}:${pad(secondsLeft % 60)}`
}

// Header of the payment pages (Figma: 1441 x 52 = 51 + the 1px border, padding 6 / 104).
// Logo, the steps (step 3 is active), then the countdown and "Safe & Secured".
export default function PaymentHeader() {
  const timeLeft = usePaymentTimer(PAYMENT_SESSION_MINUTES)

  return (
    <header className="border-b-[0.3px] border-black/10 bg-white">
      <div className="mx-auto flex h-[51px] max-w-[1440px] items-center justify-between gap-4 px-4 py-[6px] md:px-10 xl:px-[104px]">
        <Link to={PATHS.home}><img src={logo} alt="Mobiyantra" className="h-6 w-auto sm:h-[38px]" /></Link>
        <BookingStepper current={3} />

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand" aria-label="Time left to pay">
            <Clock size={13} /> {timeLeft}
          </span>
          <span className="hidden text-base text-slate-600 sm:block">Safe &amp; Secured</span>
        </div>
      </div>
    </header>
  )
}
