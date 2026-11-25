import { parseISO } from '@/utils/dates'


// { first: 'Ritika', middle: '', last: 'Sharma' } -> "Ritika Sharma"
export const fullName = (person) => [person.first, person.middle, person.last].filter(Boolean).join(' ')

// -> "RS"  (shown in the round avatar of the saved travellers list)
export const getInitials = (person) => `${person.first?.charAt(0) ?? ''}${person.last?.charAt(0) ?? ''}`.toUpperCase()

// "1990-10-12" -> "12 Oct 1990"
export const formatDob = (iso) => parseISO(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
