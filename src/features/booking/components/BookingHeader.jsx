import { Link } from 'react-router-dom'
import UserMenu from '@/features/auth/components/UserMenu'
import { PATHS } from '@/config/paths'
import logo from '@/assets/logos/logo.svg'
import BookingStepper from './BookingStepper'

export default function BookingHeader({ user, onLogout, step }) {
  return (
    <header className="border-b-[0.3px] border-black/10 bg-white">
      <div className="mx-auto flex h-[64.3px] max-w-[1440px] items-center justify-between gap-4 px-4 md:px-10 xl:px-[104px]">
        <Link to={PATHS.home}><img src={logo} alt="Mobiyantra" className="h-6 w-auto sm:h-[36.36px]" /></Link>
        <BookingStepper current={step} />
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  )
}
