import { CalendarDays } from 'lucide-react'
import { CARD } from '../utils/styles'

// "Select Alternate Date" card (Figma: 1240 x 140, padding 16, 8 tiles of 144 x 67, gap 8).
//   dates : [{ id, day, label, note }]      selectedId : id of the chosen tile      onSelect(id)
export default function DateSelector({ dates, selectedId, onSelect }) {
  return (
    <section className={`${CARD} p-4`}>
      <h2 className="flex items-center gap-2 text-sm font-semibold leading-6 text-navy"><CalendarDays size={16} /> Select Alternate Date</h2>
      {/* 4 tiles per row on a phone, all 8 in one row from tablet size */}
      <div role="radiogroup" aria-label="Alternate dates" className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-8">
        {dates.map((d) => {
          const selected = d.id === selectedId
          return (
            <button
              key={d.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(d.id)}
              className={`flex h-[67px] flex-col items-center justify-center rounded-lg ${selected ? 'bg-navy text-white' : 'bg-[#EFF4FF] hover:bg-[#E3ECFC]'}`}
            >
              <span className={`text-[9px] font-semibold ${selected ? 'text-white/80' : 'text-slate-500'}`}>{d.day}</span>
              <span className="text-base font-bold leading-6">{d.label}</span>
              <span className={`text-[10px] ${selected ? 'text-white/80' : d.note === 'Original' ? 'text-slate-400' : 'text-brand'}`}>{selected ? 'Selected' : d.note}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
