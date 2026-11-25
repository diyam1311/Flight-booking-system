import { ArrowLeft } from 'lucide-react'

// Back arrow + page title (Figma: 1240 x 72, padding 14 / 10).
export default function RescheduleHeader({ onBack }) {
  return (
    <div className="mx-auto flex max-w-[1240px] items-center gap-4 px-4 py-[14px] sm:gap-[22px] xl:px-[10px]">
      <button type="button" onClick={onBack} aria-label="Back" className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-500 hover:text-navy">
        <ArrowLeft size={14} />
      </button>
      <h1 className="text-[28px] font-semibold leading-9 sm:text-[40px] sm:leading-[44px]">Reschedule / Change Flight</h1>
    </div>
  )
}
