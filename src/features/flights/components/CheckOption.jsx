// One tick box row:  [x] Morning (9am - 12pm)                (10)
//  hint:  grey text after the name       count: number of flights shown on the right
export default function CheckOption({ label, hint, count, checked, onChange }) {
  const empty = count === 0 && !checked // nothing to tick here
  return (
    <label className={`flex items-center justify-between py-1.5 text-[11px] text-slate-700 ${empty ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}>
      <span className="flex items-center gap-2">
        <input type="checkbox" checked={checked} disabled={empty} onChange={onChange} className="h-3.5 w-3.5 accent-brand" />
        <span>
          {label} {hint && <span className="text-slate-400">({hint})</span>}
        </span>
      </span>
      <span className="text-[10px] text-slate-400">({count})</span>
    </label>
  )
}
