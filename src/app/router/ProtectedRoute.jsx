import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { PATHS } from '@/config/paths'

// Wraps pages that need a login.
// Not logged in -> go to /login and remember the wanted page (state.from).
export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  return isLoggedIn ? <Outlet /> : <Navigate to={PATHS.login} state={{ from: location }} replace />
}
