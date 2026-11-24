import { useRef, useState } from 'react'
import { Check, Plus } from 'lucide-react'
import TextField from './TextField'
import { useClickOutside } from '@/hooks/useClickOutside'
import { formatDob, fullName, getInitials } from '../utils/format'

// The First Name box. While you click / type in it, a "Saved Travellers" list opens below
// (Figma: 324 wide, radius 16). Picking a person fills the whole passenger form.
//   savedTravellers : people that can be picked        selectedId : id of the saved traveller already picked here
//   onPick(saved)   : a person was picked              onAddNew() : "+ Add New Traveller" was clicked (the form is emptied)
export default function FirstNameField({ id, value, error, savedTravellers, selectedId, onChange, onPick, onAddNew }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1) // row highlighted with the mouse or the arrow keys
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  // Typing narrows the list down to matching names. Once a person is picked the whole list is shown again.
  const typed = value.trim().toLowerCase()
  const matches = selectedId ? savedTravellers : savedTravellers.filter((t) => fullName(t).toLowerCase().includes(typed))
  const showList = open && matches.length > 0

  const handleChange = (e) => {
    onChange(e.target.value)
    setActive(-1)
    setOpen(true)
  }

  const pick = (saved) => {
    onPick(saved)
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false)
    if (!showList) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, matches.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)) }
    if (e.key === 'Enter' && active >= 0) { e.preventDefault(); pick(matches[active]) } // Enter without a highlighted row submits normally
  }

  return (
    <div ref={ref} className="relative">
      <TextField
        id={id}
        label="First Name"
        placeholder="First name"
        value={value}
        error={error}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
      />

      {showList && (
        <div className="absolute left-0 top-[62px] z-20 w-[324px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3 text-[11px] font-medium text-slate-500">
            <span>Saved Travellers</span>
            <span>{matches.length} Found</span>
          </div>

          
          <ul className="max-h-[165px] overflow-y-auto">
            {matches.map((t, i) => {
              const selected = t.id === selectedId
              return (
                <li key={t.id} className="border-b border-slate-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => pick(t)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex h-[55px] w-full items-center gap-3 border-l-[3px] px-4 text-left ${
                      selected || active === i ? 'border-sky-500 bg-sky-50' : 'border-transparent'
                    }`}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-100 text-[10px] font-semibold text-slate-600">
                      {getInitials(t)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold">{fullName(t)}</span>
                      <span className="block text-[10px] text-slate-400">DOB: {formatDob(t.dob)} · {t.gender}</span>
                    </span>
                    {selected && (
                      <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-navy">
                        Selected
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-navy text-white"><Check size={10} strokeWidth={3} /></span>
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex h-[40px] items-center justify-between border-t border-slate-100 bg-slate-50 px-4 text-[11px]">
            <button type="button" onClick={() => { onAddNew(); setOpen(false) }} className="flex items-center gap-1 font-bold text-brand">
              <Plus size={12} /> Add New Traveller
            </button>
            {/* TODO: open the Manage Profiles page when it is built */}
            <button type="button" className="text-slate-400">Manage Profiles</button>
          </div>
        </div>
      )}
    </div>
  )
}
