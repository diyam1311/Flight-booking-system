import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// Labelled password box of the Set New Password page: left icon, show / hide button, optional hint on the right.
// "children" is shown under the box (used for the strength bar).
export default function PasswordInput({ id, label, hint, icon: Icon, error, children, className = '', ...inputProps }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className={className}>
      <div className="flex items-center justify-between leading-3">
        <label htmlFor={id} className="text-[10px] font-bold uppercase text-slate-900">{label}</label>
        {hint && <span className="text-[9px] text-slate-400">{hint}</span>}
      </div>
      <div className="relative mt-1.5">
        {Icon && <Icon size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />}
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          className={`h-9 w-full rounded-lg border bg-[#EEF2FB] pl-9 pr-10 text-xs outline-none placeholder:text-slate-400 focus:border-navy ${error ? 'border-red-400' : 'border-transparent'}`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && <p role="alert" className="mt-1 text-[10px] text-red-500">{error}</p>}
      {children}
    </div>
  )
}
