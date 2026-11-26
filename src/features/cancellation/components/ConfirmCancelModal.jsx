import { useEffect } from 'react'

// "Are you sure?" popup before the booking is really cancelled.
//   onConfirm() : yes, cancel it      onClose() : keep the booking      busy : waiting for the backend
export default function ConfirmCancelModal({ title, onConfirm, onClose, busy }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="cancel-title" onClick={(e) => e.stopPropagation()} className="w-full max-w-[400px] rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="cancel-title" className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">Once cancelled, the booking cannot be reinstated. Cancellation charges may apply as per the airline&rsquo;s policy.</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} disabled={busy} className="h-10 rounded-lg border border-slate-200 px-5 text-sm font-semibold hover:bg-slate-50">Keep Booking</button>
          <button type="button" onClick={onConfirm} disabled={busy} className="h-10 rounded-lg bg-[#E00000] px-5 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-70">{busy ? 'Cancelling…' : 'Yes, Cancel'}</button>
        </div>
      </div>
    </div>
  )
}
