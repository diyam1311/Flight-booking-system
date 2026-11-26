import { useState } from 'react'
import QrCode from './QrCode'
import { makeQrCode } from '../utils/qrCode'
import { buildUpiLink } from '../utils/upi'

// "Scan to Pay" card (Figma: 425 x 170, radius 16, border 1px, padding 14).
//   total : amount to pay        note : short text the UPI app shows ("Flight DEL-BOM")
// The QR starts blurred. "VIEW QR" makes a real UPI QR code (new reference every time).
// The code never changes by itself: tap it to hide it again, then "VIEW QR" gives a new one.
const PREVIEW = makeQrCode('Mobiyantra') // only the blurred picture behind the "VIEW QR" button

export default function ScanToPayCard({ total, note }) {
  const [grid, setGrid] = useState(PREVIEW)
  const [visible, setVisible] = useState(false)

  const viewQr = () => {
    setGrid(makeQrCode(buildUpiLink({ amount: total, note })))
    setVisible(true)
  }

  return (
    <section className="flex w-full flex-col items-center gap-3 sm:h-[170px] sm:flex-row sm:gap-0 justify-between rounded-2xl border border-[#E2E8F0]/70 bg-white py-[14px] pl-6 pr-[10px] xl:w-[425px]">
      <div className="flex h-full flex-col">
        <h2 className="text-2xl font-bold leading-6">Scan to Pay</h2>
        <p className="mt-[23px] text-sm leading-5 text-slate-700">High Success Rate &amp; Easy Refund</p>

        {/* supported apps */}
        <div className="mt-3 flex sm:mb-[15px] sm:mt-auto items-center gap-5">
          <span className="font-black italic tracking-tight text-slate-700 text-[23px]">UP<span className="text-brand">I</span><span className="text-emerald-500">▸</span></span>
          <span className="text-xl font-medium text-slate-500"><span className="font-bold text-blue-500">G</span> Pay</span>
          <span className="grid h-6 w-6 place-items-center rounded bg-slate-900 text-[10px] font-bold text-white">Pe</span>
          <span className="text-base font-extrabold text-sky-900">pay<span className="text-sky-500">tm</span></span>
        </div>
      </div>

      {/* Figma: 126 x 140 */}
      <div className="relative flex h-[140px] w-[126px] shrink-0 items-center justify-center overflow-hidden bg-white">
        {visible ? (
          <button type="button" onClick={() => setVisible(false)} aria-label="Hide QR code" title="Tap to hide" className="block h-[126px] w-[126px]">
            <QrCode grid={grid} className="h-full w-full" />
          </button>
        ) : (
          <>
            <QrCode grid={grid} className="h-[126px] w-[126px] blur-[3px]" />
            <button
              type="button"
              onClick={viewQr}
              className="absolute left-0 right-0 top-1/2 h-[34px] -translate-y-1/2 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 text-[13px] font-medium tracking-wider text-white"
            >
              VIEW QR
            </button>
          </>
        )}
      </div>
    </section>
  )
}
