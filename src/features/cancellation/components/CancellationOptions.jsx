import { Armchair, RefreshCw } from 'lucide-react'
import { CANCEL_OPTIONS } from '../data/cancellationData'

const ICONS = { full: RefreshCw, passengers: Armchair }

// "Cancellation Options" card (Figma: 927 x 270, radius 15, border 1px, padding 24).
//   mode / onModeChange : 'full' or 'passengers'      passengers : the people of the booking
//   keys / onTogglePassenger(key) : who is ticked when "Cancel Specific Passenger" is chosen
//   disabled : the booking is already cancelled
export default function CancellationOptions({ mode, onModeChange, passengers, keys, onTogglePassenger, disabled }) {
  return (
    <section className="rounded-[15px] border border-[#F2F9FE] bg-white p-4 sm:p-6 xl:min-h-[270px]">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange-100 text-brand"><RefreshCw size={18} /></span>
        <h2 className="text-[22px] font-medium leading-8">Cancellation Options</h2>
      </div>
      <p className="mt-1 text-[13px] leading-5 sm:ml-[52px]">Choose how you want to cancel your booking.</p>

      <div role="radiogroup" aria-label="Cancellation options" className="mt-5 flex flex-col gap-5">
        {CANCEL_OPTIONS.map((option) => {
          const selected = option.id === mode
          const Icon = ICONS[option.id]
          return (
            <div key={option.id}>
              <label className={`flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border px-4 py-3 sm:px-6 ${selected ? 'border-[#E3EDFA] bg-[#F1F7FE]' : 'border-[#EEF3FA] bg-white'} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
                <input type="radio" name="cancel-mode" checked={selected} disabled={disabled} onChange={() => onModeChange(option.id)} className="h-4 w-4 shrink-0 accent-navy" />
                <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F4F7FC] text-navy sm:grid"><Icon size={16} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold leading-5">{option.title}</span>
                  <span className="block text-xs leading-5 text-slate-500">{option.text}</span>
                </span>
                <span className="rounded-full bg-[#D9E8FB] px-3 py-1 text-[11px] font-medium text-navy">{option.badge}</span>
              </label>

              {/* who to cancel: only when "Cancel Specific Passenger" is chosen */}
              {selected && option.id === 'passengers' && (
                <ul className="mt-3 flex flex-col gap-2 pl-4 sm:pl-6">
                  {passengers.map((p) => (
                    <li key={p.ticketNumber}>
                      <label className="flex cursor-pointer items-center gap-3 text-sm">
                        <input type="checkbox" checked={keys.includes(p.ticketNumber)} disabled={disabled} onChange={() => onTogglePassenger(p.ticketNumber)} className="h-4 w-4 accent-navy" />
                        {[p.title, p.first, p.last].filter(Boolean).join(' ')} <span className="text-xs text-slate-400">Seat {p.seat}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
