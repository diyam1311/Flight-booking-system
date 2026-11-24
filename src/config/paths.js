// Every page URL in one place. Use PATHS.login instead of typing "/login" by hand.
export const PATHS = {
  home: '/',
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password', // "Forgot Password?" link of the login page
  resetPassword: '/reset-password', // opened from the link in the reset e-mail: /reset-password?token=...
  searching: '/searching',          // "Searching Flights..." loading page
  searchResults: '/search-results', // list of flights
  travellerDetails: '/traveller-details', // step 2 of booking: passenger details
  payment: '/payment',            // step 3 of booking: payment
  manageBooking: '/manage-booking', // "Manage Booking" tab of the homepage: find / open your bookings
  bookingDetails: '/manage-booking/:bookingId', // "My Booking": everything about one booking; use bookingDetailsPath(id)
  help: '/help',                  // "Support" link of the navbar: Help & Support page
  eTicket: '/e-ticket/:bookingId', // the e-ticket after payment; use eTicketPath(id) to open it
}

// eTicketPath('ID-3486') -> "/e-ticket/ID-3486"
export const eTicketPath = (bookingId) => `/e-ticket/${bookingId}`

// bookingDetailsPath('ID-3486') -> "/manage-booking/ID-3486"
export const bookingDetailsPath = (bookingId) => `/manage-booking/${bookingId}`
