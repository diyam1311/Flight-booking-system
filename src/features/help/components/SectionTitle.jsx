// Heading of a section: optional round icon on the left, bold title, small grey line under it.
// Used for "Popular Help Topics" (with icon) and "Frequently Asked Questions" (no icon).
export default function SectionTitle({ icon: Icon, title, subtitle, className = '' }) {
  return (
    <div className={`flex items-start gap-7 ${className}`}>
      {Icon && (
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#EA580C]/10 text-brand">
          <Icon size={26} strokeWidth={2} />
        </span>
      )}
      <div className={Icon ? 'pt-[5px]' : ''}>
        <h2 className="text-[20px] font-semibold leading-6">{title}</h2>
        <p className="mt-[9px] text-sm leading-[17px] text-slate-600">{subtitle}</p>
      </div>
    </div>
  )
}
