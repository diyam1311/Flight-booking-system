import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// One block of the sidebar (title + arrow). Click the title to fold / unfold it.
export default function FilterSection({ title, icon: Icon, children }) {
  const [open, setOpen] = useState(true)
  return (
    <section className="border-b border-slate-100 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-xs font-semibold"
      >
        <span className="flex items-center gap-2"><Icon size={12} className="text-brand" /> {title}</span>
        <ChevronDown size={12} className={`text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </section>
  )
}
