import { ChevronDown } from 'lucide-react'

// Text with a small arrow ("One Way v"). A real <select> sits invisibly on top, so clicking opens the list.
// format: changes how the chosen value is written, e.g. "Economy" -> "Economy Class".
export default function OptionSelect({ label, value, options, onChange, format = (v) => v }) {
  return (
    <span className="relative inline-flex items-center gap-1">
      {format(value)} <ChevronDown size={10} />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </span>
  )
}
