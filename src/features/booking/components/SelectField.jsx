import { ChevronDown } from 'lucide-react'
import { BOX_CLASS, ERROR_CLASS, LABEL_CLASS, borderClass } from './TextField'

// One labelled drop-down (a real <select>, so it works with the keyboard and on phones).
export default function SelectField({ id, label, hideLabel = false, value, options, placeholder, onChange, error, className = '' }) {
  return (
    <div className={`group ${className}`}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : LABEL_CLASS}>{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          className={`${BOX_CLASS} cursor-pointer appearance-none pr-9 ${borderClass(error)} ${value ? '' : 'text-slate-400'}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => <option key={option} value={option} className="text-slate-900">{option}</option>)}
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
      </div>
      {error && <p role="alert" className={ERROR_CLASS}>{error}</p>}
    </div>
  )
}
