import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import TicketHeader from '@/features/ticket/components/TicketHeader'
import { useAuth } from '@/features/auth/hooks/useAuth'

// Frame for the e-ticket page: ticket header (all steps done + user) on top, page in the middle, Footer at the bottom.
export default function TicketLayout() {
  const { user, logout } = useAuth()
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <TicketHeader user={user} onLogout={logout} />
      <Outlet />
      <Footer />
    </div>
  )
}
