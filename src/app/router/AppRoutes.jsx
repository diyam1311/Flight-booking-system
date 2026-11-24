import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import SignupPage from '@/features/auth/pages/SignupPage'
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage'
import HomePage from '@/features/home/pages/HomePage'
import SearchLoadingPage from '@/features/flights/pages/SearchLoadingPage'
import SearchResultsPage from '@/features/flights/pages/SearchResultsPage'
import TravellerDetailsPage from '@/features/booking/pages/TravellerDetailsPage'
import PaymentPage from '@/features/payment/pages/PaymentPage'
import ETicketPage from '@/features/ticket/pages/ETicketPage'
import ManageBookingPage from '@/features/manageBooking/pages/ManageBookingPage'
import BookingDetailsPage from '@/features/manageBooking/pages/BookingDetailsPage'
import HelpSupportPage from '@/features/help/pages/HelpSupportPage'
import MainLayout from '@/layouts/MainLayout'
import BookingLayout from '@/layouts/BookingLayout'
import PaymentLayout from '@/layouts/PaymentLayout'
import TicketLayout from '@/layouts/TicketLayout'
import { PATHS } from '@/config/paths'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'

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
