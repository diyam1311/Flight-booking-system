import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, CircleUserRound, LogOut } from 'lucide-react'
import Avatar from '@/features/auth/components/Avatar'
import UserMenu from '@/features/auth/components/UserMenu'
import { getFirstName } from '@/features/auth/utils/userName'
import { PATHS } from '@/config/paths'
import { navLinks, loggedInNavLinks, navLinkPaths } from '@/config/site'
import logo from '@/assets/logos/logo.svg'

// Right side of the navbar: profile menu when logged in, Login / Register link when not.
function AuthArea({ user, onLogout }) {
  if (user) return <UserMenu user={user} onLogout={onLogout} />
  return (
    <Link to={PATHS.login} className="flex items-center gap-2 text-base font-semibold">
      <CircleUserRound size={22} /> Login / Register
    </Link>
  )
}

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const links = user ? loggedInNavLinks : navLinks

  return (
    <header className="border-b border-black/10">
      {/* Figma: padding 20 / 120, logo + 160px gap + links on the left, user/login on the right */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-5 md:px-10 xl:px-[120px]">
        <div className="flex items-center gap-[60px] xl:gap-[160px]">
          <Link to={PATHS.home}><img src={logo} alt="Mobiyantra" className="h-[36.36px] w-auto" /></Link>
          <nav className="hidden items-center gap-[34px] text-base font-medium lg:flex">
            {links.map((l) => (
              <Link key={l} to={navLinkPaths[l] ?? '#'} className="hover:text-brand">{l}</Link>
            ))}
          </nav>
        </div>

        <div className="hidden lg:block"><AuthArea user={user} onLogout={onLogout} /></div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-black/10 px-4 py-4 text-sm font-medium lg:hidden">
          {links.map((l) => <Link key={l} to={navLinkPaths[l] ?? '#'} onClick={() => setOpen(false)}>{l}</Link>)}
          {user ? (
            <>
              <span className="flex items-center gap-2"><Avatar user={user} /> {getFirstName(user)}</span>
              <button type="button" onClick={onLogout} className="flex items-center gap-2 text-left"><LogOut size={16} /> Logout</button>
            </>
          ) : (
            <AuthArea user={user} />
          )}
        </nav>
      )}
    </header>
  )
}
