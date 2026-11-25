import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '@/features/home/pages/HomePage'
import MainLayout from '@/layouts/MainLayout'
import BookingLayout from '@/layouts/BookingLayout'
import PaymentLayout from '@/layouts/PaymentLayout'
import TicketLayout from '@/layouts/TicketLayout'
import { PATHS } from '@/config/paths'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'))
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'))
const SearchLoadingPage = lazy(() => import('@/features/flights/pages/SearchLoadingPage'))
const SearchResultsPage = lazy(() => import('@/features/flights/pages/SearchResultsPage'))
const TravellerDetailsPage = lazy(() => import('@/features/booking/pages/TravellerDetailsPage'))
const PaymentPage = lazy(() => import('@/features/payment/pages/PaymentPage'))
const ETicketPage = lazy(() => import('@/features/ticket/pages/ETicketPage'))
const ManageBookingPage = lazy(() => import('@/features/manageBooking/pages/ManageBookingPage'))
const BookingDetailsPage = lazy(() => import('@/features/manageBooking/pages/BookingDetailsPage'))
const ReschedulePage = lazy(() => import('@/features/reschedule/pages/ReschedulePage'))
const HelpSupportPage = lazy(() => import('@/features/help/pages/HelpSupportPage'))

// Every page URL of the app.
// To add a page: create it in a feature's pages/ folder, add a path in config/paths.js, add one <Route> below.
export default function AppRoutes() {
  return (
    <Routes>
      {/* Pages with Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path={PATHS.home} element={<HomePage />} />
        <Route path={PATHS.help} element={<HelpSupportPage />} />
      </Route>

      {/* Opened from the e-mail link, so it works whether or not the user is logged in */}
      <Route path={PATHS.resetPassword} element={<ResetPasswordPage />} />

      {/* Logged-out users only */}
      <Route element={<GuestRoute />}>
        <Route path={PATHS.login} element={<LoginPage />} />
        <Route path={PATHS.signup} element={<SignupPage />} />
        <Route path={PATHS.forgotPassword} element={<ForgotPasswordPage />} />
      </Route>

      {/* Login required */}
      <Route element={<ProtectedRoute />}>
        {/* The loading page has its own small header, so it does not use MainLayout */}
        <Route path={PATHS.searching} element={<SearchLoadingPage />} />
        <Route element={<MainLayout />}>
          <Route path={PATHS.searchResults} element={<SearchResultsPage />} />
          <Route path={PATHS.manageBooking} element={<ManageBookingPage />} />
          <Route path={PATHS.bookingDetails} element={<BookingDetailsPage />} />
          <Route path={PATHS.reschedule} element={<ReschedulePage />} />
        </Route>
        {/* Booking steps have their own header with the step bar */}
        <Route element={<BookingLayout />}>
          <Route path={PATHS.travellerDetails} element={<TravellerDetailsPage />} />
        </Route>
        {/* Payment has its own header (steps + timer) */}
        <Route element={<PaymentLayout />}>
          <Route path={PATHS.payment} element={<PaymentPage />} />
        </Route>
        {/* E-ticket has its own header (all steps done + user) */}
        <Route element={<TicketLayout />}>
          <Route path={PATHS.eTicket} element={<ETicketPage />} />
        </Route>
      </Route>

      {/* Unknown URL -> home */}
      <Route path="*" element={<Navigate to={PATHS.home} replace />} />
    </Routes>
  )
}
