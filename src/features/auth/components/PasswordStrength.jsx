import { getPasswordStrength } from '../utils/passwordStrength'

const COLORS = ['', 'bg-red-500', 'bg-amber-500', 'bg-[#1565C0]', 'bg-[#1565C0]']
const TEXT_COLORS = ['', 'text-red-500', 'text-amber-500', 'text-[#1565C0]', 'text-[#1565C0]']

// "Security Rating ........ Strong" and the 4-piece bar under it.
export default function PasswordStrength({ password }) {
  const { filled, label } = getPasswordStrength(password)
  return (
    <div className="mt-[9.5px]" aria-live="polite">
      <div className="flex items-center justify-between text-[9px] leading-3">
        <span className="text-slate-400">Security Rating</span>
        <span className={`font-semibold ${TEXT_COLORS[filled]}`}>{label}</span>
      </div>
      <div className="mt-[5.5px] flex gap-[5.4px]">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={`h-[3px] flex-1 rounded-full ${n <= filled ? COLORS[filled] : 'bg-[#D7E7FB]'}`} />
        ))}
      </div>
    </div>
  )
}
