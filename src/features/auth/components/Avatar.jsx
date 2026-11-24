import { getFirstName } from '../utils/userName'

// Round avatar. Shows user.avatar (image URL) if you add one later, otherwise the first letter.
export default function Avatar({ user }) {
  if (user.avatar) return <img src={user.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-300 text-sm font-bold text-slate-900">
      {getFirstName(user).charAt(0)}
    </span>
  )
}
