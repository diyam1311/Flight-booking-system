import { Outlet, useLocation } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import BookingHeader from '@/features/booking/components/BookingHeader'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'

// Which step of the booking each page is. Add the payment page here later:  [PATHS.payment]: 3
const STEP_BY_PATH = {
  [PATHS.travellerDetails]: 2,
}

// Frame for the booking pages: booking header (with the steps) on top, page in the middle, Footer at the bottom.
export default function BookingLayout() {
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BookingHeader user={user} onLogout={logout} step={STEP_BY_PATH[pathname] ?? 2} />
      <Outlet />
      <Footer />
    </div>
  )
}
