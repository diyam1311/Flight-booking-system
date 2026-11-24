import { CalendarDays, Check, Mail, Ticket } from 'lucide-react'

// Top of the e-ticket page: green tick, "Your E-ticket is Ready", and the email / booking ID / booking date.
// Figma: 850 wide, 162 high.
export default function TicketSuccess({ email, bookingId, bookedOn }) {
  return (
    <section className="relative pb-[15px]">
      <div className="flex items-start gap-[25px] pl-1.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-600 text-white">
          <Check size={22} strokeWidth={3} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-base leading-5 text-green-600">Payment Successful !</p>
          <h1 className="text-2xl font-bold leading-8">Your E-ticket is Ready</h1>
          <p className="mt-2 text-xs leading-4 text-slate-400">
            Thank you for booking with Mobiyantra. Your flight details and e-ticket have been emailed to you.
          </p>
        </div>

        <span className="absolute right-1.5 top-1.5 hidden items-center gap-2.5 rounded-full border border-slate-100 bg-white px-4 py-[3px] text-xs font-semibold leading-4 text-emerald-800 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-700" /> Booking Confirmed
        </span>
      </div>

      <ul className="mt-[35px] grid gap-5 sm:grid-cols-3 sm:pl-[25px]">
        <Info icon={Mail} label="Confirmation Email Sent" value={email} />
        <Info icon={Ticket} label="Booking Reference" value={bookingId} />
        <Info icon={CalendarDays} label="Booking Date" value={bookedOn} />
      </ul>
    </section>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <li className="flex min-w-0 items-center gap-3">
      <span className="grid h-[25px] w-[25px] shrink-0 place-items-center rounded-full bg-orange-100/70 text-brand">
        <Icon size={12} />
      </span>
      <div className="min-w-0">
        <p className="text-base font-medium leading-5">{label}</p>
        <p className="truncate text-xs font-medium leading-4" title={value}>{value}</p>
      </div>
    </li>
  )
}
