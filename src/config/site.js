// Navbar and footer text. Edit the labels here.
import { PATHS } from '@/config/paths'

// Navbar links
export const navLinks = ['Home', 'Flights', 'Support', 'Contact Us']

// Navbar labels that open a page. Labels not listed here are not linked yet.
export const navLinkPaths = { Home: PATHS.home, Support: PATHS.help }

// Footer columns
export const footerColumns = [
  { title: 'Company', links: ['About Us', 'Travel Guide', 'Partner with us'] },
  { title: 'Quick Links', links: ['Home', 'Explore Flights', 'Manage Booking', 'Flight Status', 'Offers'] },
  { title: 'Help', links: ['FAQ', 'Cancellation & Refund', 'Baggage Information', 'Contact US'] },
]
