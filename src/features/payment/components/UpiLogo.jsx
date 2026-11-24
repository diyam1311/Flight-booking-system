// Text version of the UPI logo (swap for the real logo image when you have it).
export default function UpiLogo({ className = 'text-lg' }) {
  return (
    <span className={`font-black italic tracking-tight text-slate-700 ${className}`}>
      UP<span className="text-brand">I</span><span className="text-emerald-500">▸</span>
    </span>
  )
}
