import { useRef, useState } from 'react'
import { ChevronDown, LogOut } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import Avatar from './Avatar'
import { getFirstName } from '../utils/userName'

// Logged-in state of the navbar: avatar + first name + arrow. Click opens a small menu with Logout.
export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open) // close the menu when you click anywhere outside it

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 text-base font-medium"
      >
        <Avatar user={user} />
        <span className="max-w-[24vw] truncate">{getFirstName(user)}</span>
        <ChevronDown size={14} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-12 z-30 w-52 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
          <p className="truncate px-3 py-2 text-xs text-slate-400">{user.email}</p>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}
