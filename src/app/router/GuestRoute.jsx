import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'

// Wraps /login and /signup (logged-out users only).
// Already logged in -> go back to the page the user wanted (state.from), otherwise home.
export default function GuestRoute() {
  const { isLoggedIn } = useAuth()
  const { state } = useLocation()
  if (!isLoggedIn) return <Outlet />

  const from = state?.from
  return <Navigate to={from ? from.pathname : PATHS.home} state={from?.state} replace />
}
