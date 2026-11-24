import {
  CalendarCheck, CalendarDays, UserPen, Banknote, HandCoins, Luggage,
  PlaneTakeoff, TicketCheck, Clock, FileText, MessageSquare, Phone, Mail,
} from 'lucide-react'

// Icon name (used in helpData.js) -> picture. To use another icon, change it here.
export const TOPIC_ICONS = {
  booking: CalendarCheck,
  passenger: UserPen,
  payment: Banknote,
  refund: HandCoins,
  baggage: Luggage,
  reschedule: CalendarDays,
  cancellation: PlaneTakeoff,
  checkin: TicketCheck,
  arrival: Clock,
  documents: FileText,
}

export const CONTACT_ICONS = {
  chat: MessageSquare,
  call: Phone,
  email: Mail,
}
