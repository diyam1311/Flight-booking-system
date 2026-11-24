// White card with an icon + title and a thin line below (Passenger Details, Flight Details).
// Figma: 820 wide, at least 133 high, radius 12, padding 11 / 21.
export default function InfoCard({ icon: Icon, title, children }) {
  return (
    <section className="min-h-[133px] w-[820px] max-w-full rounded-xl bg-[#FCFDFD] px-[21px] pb-5 pt-[11px]">
      <h2 className="flex items-center gap-[14px] border-b border-slate-100 pb-2 pl-1.5 text-xl font-medium leading-7">
        <Icon size={18} className="text-slate-700" /> {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

// Tiny grey label with the value under it. `note` = an even smaller line below the value.
export function InfoField({ label, note, children }) {
  return (
    <div className="min-w-0">
      <p className="text-[8px] font-medium uppercase leading-[10px] tracking-wider text-slate-500">{label}</p>
      <p className="mt-[7px] break-words text-sm font-medium leading-5">{children}</p>
      {note && <p className="text-[8px] leading-[10px] text-slate-400">{note}</p>}
    </div>
  )
}
