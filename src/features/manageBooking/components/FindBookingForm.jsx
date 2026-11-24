import { useState } from 'react'
import { ArrowRight, CircleUser, Info, Ticket } from 'lucide-react'

// "Booking reference + last name + Submit" box (Figma: 1240 x 116, radius 10, white 80%; fields 399 x 62; button 183 x 62).
//   onFind(reference, lastName) -> a message when nothing matches (the form shows it), nothing when it worked
export default function FindBookingForm({ onFind }) {
  const [reference, setReference] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!reference.trim() || !lastName.trim()) {
      setError('Please enter the booking reference and the last name.')
      return
    }
    setBusy(true)
    setError((await onFind(reference, lastName)) ?? '')
    setBusy(false)
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-[10px] bg-white/80 px-4 pb-[13px] pt-[23px] lg:h-[116px] lg:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-[38px]">
        <Field id="booking-reference" icon={Ticket} placeholder="Booking reference" hint="Eg: ID-3486" value={reference} onChange={setReference} />
        <Field id="last-name" icon={CircleUser} placeholder="Last name" hint="Eg: Sharma" value={lastName} onChange={setLastName} />
        <button
          type="submit"
          disabled={busy}
          className="flex h-[62px] items-center justify-center gap-2 rounded-lg bg-navy px-6 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-70 lg:ml-auto lg:mt-[3.6px] lg:w-[183px]"
        >
          {busy ? 'Checking…' : <>Submit <ArrowRight size={16} /></>}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-xs font-medium text-red-600 lg:absolute lg:-bottom-6 lg:left-6">{error}</p>}
    </form>
  )
}

function Field({ id, icon: Icon, placeholder, hint, value, onChange }) {
  return (
    <div className="lg:w-[399px]">
      <label htmlFor={id} className="flex h-[62px] items-center gap-3 rounded-[10px] border border-slate-200 bg-white px-[33px] shadow-sm focus-within:border-navy">
        <Icon size={20} className="shrink-0" />
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-slate-400" />
      </label>
      <p className="mt-1.5 flex items-center gap-1 text-[10px] leading-3 text-slate-500"><Info size={9} className="fill-slate-400 text-white" /> {hint}</p>
    </div>
  )
}
