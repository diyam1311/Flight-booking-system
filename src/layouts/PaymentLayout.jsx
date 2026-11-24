import { Outlet } from 'react-router-dom'
import Footer from '@/components/layout/Footer'
import PaymentHeader from '@/features/payment/components/PaymentHeader'

// Frame for the payment pages: payment header (steps + timer) on top, page in the middle, Footer at the bottom.
export default function PaymentLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PaymentHeader />
      <Outlet />
      <Footer />
    </div>
  )
}
