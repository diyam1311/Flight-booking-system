import { ChevronDown, ChevronRight } from 'lucide-react'

// One row of "Other Payment Options". Only one row is open at a time (the page decides which).
// Figma: padding 22.63, gap 22.63, rows are split by a thin line. The open row gets a 4.53px navy bar on the left,
// drawn on top of the row (so it does not take any width from the content: header 740 wide).
//   icon / title / tag / subtitle : what is shown in the header      extra : small things on the right (card logos)
//   open, onOpen()               : whether it is open, and what to do when its header is clicked
//   children                     : the panel shown when it is open (card form, EMI plans, banks)
export default function PaymentOption({ icon, iconClass, title, tag, subtitle, extra, open, onOpen, children }) {
  return (
    <div className="relative border-t-[1.13px] border-t-[#F1F5F9] p-[22.63px] first:border-t-0">
      {open && <span className="absolute inset-y-0 left-0 w-[4.53px] bg-navy" />}
      <button
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        className="flex min-h-[45.25px] w-full items-center justify-between gap-4 text-left"
      >
        <span className="flex items-center gap-[18px]">
          <span className={`grid h-[45.25px] w-[45.25px] shrink-0 place-items-center rounded-xl ${iconClass}`}>{icon}</span>
          <span>
            <span className="flex items-center gap-2.5">
              <span className="text-lg font-semibold leading-6">{title}</span>
              {tag && <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold uppercase leading-4 text-emerald-700">{tag}</span>}
            </span>
            <span className="block text-sm leading-5 text-slate-500">{subtitle}</span>
          </span>
        </span>

        <span className="flex items-center gap-4">
          {extra}
          {open
            ? <ChevronDown size={18} className="text-navy" />
            : <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-400"><ChevronRight size={16} /></span>}
        </span>
      </button>

      {open && <div className="mt-[22.63px] border-t border-[#F1F5F9] pt-[18px]">{children}</div>}
    </div>
  )
}
