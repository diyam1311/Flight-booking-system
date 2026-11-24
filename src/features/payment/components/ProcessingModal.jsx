import { useEffect } from 'react'
import flyingPlane from '../assests/processing-animation.mp4'

// "Processing your payment..." popup (Figma: 460 x 413, radius 16, padding 24 top and bottom). The user cannot close it.
// The animation (plane + four jumping dots) is a short looping video: assets/processing-animation.mp4.
// When the payment finishes, PaymentPage closes it and opens the "Booking Confirmed" popup. TODO: "Payment Failed".
export default function ProcessingModal() {
  // the page behind the popup does not scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-slate-900/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="processing-title"
        className="m-auto flex h-[413px] w-[460px] max-w-full flex-col items-center overflow-hidden rounded-2xl bg-white pt-6 text-center shadow-2xl"
      >
        {/* the video has a plain white background, so it melts into the popup */}
        <video
          src={flyingPlane}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="mt-[78px] h-[135px] w-[131px] shrink-0 mix-blend-multiply"
        />

        <h2 id="processing-title" className="mt-[41px] text-[28px] font-bold leading-9 text-navy">Processing your payment…</h2>
        <p className="mt-[9px] w-full max-w-[392px] text-xs leading-[22px] text-slate-500">
          Please do not refresh, close this window, or press the back button while your transaction is cleared through the RBI tokenized banking channel.
        </p>
      </div>
    </div>
  )
}
