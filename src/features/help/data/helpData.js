// Demo content of the Help & Support page (texts copied from Figma).
// When the backend is ready, helpService.js will load the same shapes from the API and this file can be deleted.
// "icon" is just a name; helpIcons.js turns it into a picture. That way the backend can send plain JSON.

// "Popular Help Topics": first 5 show in the left card, next 5 in the right card.
export const TOPICS = [
  {
    id: 'booking-confirmation',
    icon: 'booking',
    title: 'Booking Confirmation & E-Ticket',
    summary: 'How to check your booking status, get your e-ticket and more.',
    answer: 'Check your booking status, view confirmation details, and download your e-ticket using your booking reference number (PNR).',
  },
  {
    id: 'passenger-details',
    icon: 'passenger',
    title: 'Changing passenger Details',
    summary: 'Update name, contact details or traveller information.',
    answer: 'Open My Booking, choose the passenger and edit the details. Name changes may need a document and can be limited by the airline.',
  },
  {
    id: 'payment',
    icon: 'payment',
    title: 'Payment Failed or Pending',
    summary: 'What to do if your payment fails or is still processing.',
    answer: 'Wait 15 minutes before paying again. If money was deducted, it is refunded to your account automatically within 5-7 working days.',
  },
  {
    id: 'refund',
    icon: 'refund',
    title: 'Refund Status & Timeline',
    summary: 'Check refund status and know the estimated timeline.',
    answer: 'Refunds go back to the original payment method. Cards take 5-7 working days and UPI or wallets usually take 1-2 working days.',
  },
  {
    id: 'baggage',
    icon: 'baggage',
    title: 'Baggage Allowance',
    summary: 'Carry-on, check-in and extra baggage information',
    answer: 'Most domestic fares include 7 kg of cabin baggage and 15 kg of check-in baggage. Extra baggage can be added before check-in.',
  },
  {
    id: 'reschedule',
    icon: 'reschedule',
    title: 'Rescheduling a Flight',
    summary: 'Change your travel dates and check the applicable charges.',
    answer: 'Go to Manage Booking, pick Reschedule, choose a new date and pay the fare difference plus the airline change fee.',
  },
  {
    id: 'cancellation',
    icon: 'cancellation',
    title: 'Cancellation Charges',
    summary: 'Understand cancellation policy and refund rules.',
    answer: 'Charges depend on the airline and how close to departure you cancel. The exact amount is shown before you confirm the cancellation.',
  },
  {
    id: 'checkin',
    icon: 'checkin',
    title: 'Check-in & Boarding Pass',
    summary: 'Online check-in, boarding pass and seat selection',
    answer: 'Web check-in opens 48 hours before departure and closes 2 hours before. Your boarding pass is available as soon as you check in.',
  },
  {
    id: 'arrival',
    icon: 'arrival',
    title: 'Airport Arrival Time',
    summary: 'Recommended time to reach the airport and important tips.',
    answer: 'Reach the airport 2 hours before a domestic flight and 3 hours before an international flight.',
  },
  {
    id: 'documents',
    icon: 'documents',
    title: 'Document Requirements',
    summary: 'ID proofs, visa and other travel document guidelines.',
    answer: 'Carry a valid government photo ID for domestic travel. International travel needs a passport and any visa the country requires.',
  },
]

// "Frequently Asked Questions": first 3 in the left card, next 3 in the right card.
export const FAQS = [
  { id: 'faq-status', question: 'How can I check my booking status ?', answer: 'Open Manage Booking and enter your booking reference and last name. You will see the latest status.' },
  { id: 'faq-refund', question: 'Can I get a refund for my flight ticket ?', answer: 'Yes, if the fare is refundable. The refund amount is shown before you cancel.' },
  { id: 'faq-baggage', question: 'What is the baggage allowance for domestic flights ?', answer: 'Usually 7 kg cabin and 15 kg check-in baggage. It can differ by airline and fare.' },
  { id: 'faq-date', question: 'How do I change my travel date ?', answer: 'Open My Booking and choose Reschedule. Pick a new date and pay any fare difference.' },
  { id: 'faq-checkin', question: 'Is online check-in available for all flights ?', answer: 'Most airlines offer online check-in. It opens 48 hours before departure.' },
  { id: 'faq-documents', question: 'What documents are required for international travel ?', answer: 'A valid passport, a visa if the country needs one, and your e-ticket.' },
]

// "Still need help?" cards. line1 is the main line, line2 is the small note under it.
export const CONTACTS = [
  {
    id: 'chat',
    icon: 'chat',
    title: 'Chat with us',
    line1: 'Get instant help from our support team.',
    line2: 'Available 24/7',
    button: 'Start chat',
    href: null, // no link: the button opens the chat (see ContactCard)
  },
  {
    id: 'call',
    icon: 'call',
    title: 'Call Support',
    line1: '+91 9876543257',
    line2: 'Mon - Sun, 6 AM - 12 AM',
    button: 'Start chat', // same text as Figma. Change to "Call now" if you prefer.
    href: 'tel:+919876543257',
  },
  {
    id: 'email',
    icon: 'email',
    title: 'Email Support',
    line1: 'support@mobiyantra.com',
    line2: 'Usually replies within 24 hours',
    button: 'Start chat', // same text as Figma. Change to "Send email" if you prefer.
    href: 'mailto:support@mobiyantra.com',
  },
]
