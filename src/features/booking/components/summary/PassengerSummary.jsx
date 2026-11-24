import { User } from 'lucide-react'
import { PASSENGER_TYPES } from '../../data/bookingOptions'
import { formatDob, fullName, getInitials } from '../../utils/format'

// "PASSENGER DETAILS" part of the booking popup: one block per passenger, with what the user typed.
export default function PassengerSummary({ passengers }) {
  return (
    <section className="pb-[19px]">
      <div className="flex h-[23px] items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase leading-5">
          <User size={14} className="text-slate-500" /> Passenger Details
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs leading-4 text-slate-500">{countText(passengers)}</span>
      </div>

      {/* many passengers: this list scrolls, so the popup does not grow without limit */}
      <ul className="mt-6 max-h-[230px] overflow-y-auto">
        {passengers.map((p) => (
          <li key={p.key} className="mt-4 first:mt-0">
            {/* Figma: 453 x 46.6 */}
            <div className="flex h-[46.57px] items-center gap-3">
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                {getInitials(p)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold leading-5">{fullName(p)}</p>
                <p className="text-xs leading-4 text-slate-400">{PASSENGER_TYPES[p.type].label} · {p.nationality} Nationality</p>
              </div>
            </div>

            {/* Figma: 453 x 48.5, line on top */}
            <div className="mt-[13px] grid grid-cols-2 gap-3 border-t border-slate-100 pt-[9px]">
              <Detail label="Date of Birth:" value={formatDob(p.dob)} />
              <Detail label="Nationality:" value={p.nationality} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

// [adult, adult, child] -> "2 Adults, 1 Child"
function countText(passengers) {
  return Object.entries(PASSENGER_TYPES)
    .map(([type, { label }]) => {
      const count = passengers.filter((p) => p.type === type).length
      if (count === 0) return null
      return `${count} ${count === 1 ? label : label === 'Child' ? 'Children' : label + 's'}`
    })
    .filter(Boolean)
    .join(', ')
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs leading-4 text-slate-400">{label}</p>
      <p className="text-sm leading-[22px]">{value}</p>
    </div>
  )
}
