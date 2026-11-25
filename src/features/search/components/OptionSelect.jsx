import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'

export default function OptionSelect({ label, value, options, onChange, format = (v) => v, alignEnd = false }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const trigger = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  function close() {
    setOpen(false)
    trigger.current?.focus()
  }

  return (
    <div ref={ref} className={alignEnd ? 'sm:relative' : 'relative'}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={(event) => { if (open && event.key === 'Escape') close() }}>
      <button ref={trigger} type="button" aria-label={`${label}: ${format(value)}`} aria-expanded={open}
        onClick={() => setOpen(!open)} className="flex items-center gap-1">
        {format(value)} <ChevronDown size={10} className={open ? 'rotate-180' : ''} />
      </button>
      {open && (
        <div role="group" aria-label={label}
          className={`absolute z-30 mt-1 bg-white text-sm shadow-lg ring-1 ring-black/5 ${alignEnd ? 'right-4 w-[179px] sm:left-0 sm:right-auto sm:top-full' : 'left-0 top-full w-[171px]'}`}>
          {options.map((option) => (
            <button key={option} type="button" aria-pressed={value === option}
              onClick={() => { onChange(option); close() }}
              className={`block min-h-[38px] w-full border-l-2 px-4 text-left hover:bg-slate-50 focus-visible:bg-slate-50 ${value === option ? 'border-navy font-semibold text-navy' : 'border-transparent text-slate-900'}`}>
              {format(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
