import { Link } from 'react-router-dom'
import UserMenu from '@/features/auth/components/UserMenu'
import BookingStepper from '@/features/booking/components/BookingStepper'
import { PATHS } from '@/config/paths'
import logo from '@/assets/logos/logo.svg'

// Header of the e-ticket page (Figma: 1440 x 57, padding 6 / 104). Logo, the steps (all done), the user.
export default function TicketHeader({ user, onLogout }) {
  return (
    <header className="border-b-[0.3px] border-black/10 bg-white">
      <div className="mx-auto flex h-[57px] max-w-[1440px] items-center justify-between gap-4 px-4 py-[6px] md:px-10 xl:px-[104px]">
        <Link to={PATHS.home}><img src={logo} alt="Mobiyantra" className="h-[38px] w-auto" /></Link>
        <BookingStepper current={3} />
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  )
}
