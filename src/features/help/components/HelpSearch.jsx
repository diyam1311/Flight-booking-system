import { CircleAlert, Search } from 'lucide-react'

// Search box + the "Need urgent help?" line under it. (Figma: 739 x 75, box 52 high, 12 gap)
// The page filters the lists while the user types, so the round button only needs to submit the form.
export default function HelpSearch({ value, onChange, className = '' }) {
  return (
    <div className={`flex w-full max-w-[739px] flex-col gap-3 ${className}`}>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex h-[52px] items-center rounded-[10px] bg-white pl-3 pr-[11px]"
      >
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for flights, bookings, refund and more"
          aria-label="Search help"
          className="h-full min-w-0 flex-1 bg-transparent text-xs text-slate-900 outline-none placeholder:text-slate-500"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-navy text-white"
        >
          <Search size={12} />
        </button>
      </form>

      <p className="flex items-center gap-2 text-[10.4px] leading-[11px] text-[#9AA7C0]">
        <CircleAlert size={9} className="shrink-0 text-navy" />
        <span><span className="font-medium text-slate-600">Need urgent help?</span> Our support team is available 24/7 to assist you.</span>
      </p>
    </div>
  )
}
