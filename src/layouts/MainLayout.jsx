import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useAuth } from '@/features/auth/hooks/useAuth'

// Shared frame for normal pages: Navbar on top, page in the middle, Footer at the bottom.
export default function MainLayout() {
  const { user, logout } = useAuth()
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar user={user} onLogout={logout} />
      <Outlet />
      <Footer />
    </div>
  )
}
