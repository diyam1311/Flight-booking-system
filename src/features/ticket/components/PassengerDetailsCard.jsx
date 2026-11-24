import { User } from 'lucide-react'
import { PASSENGER_TYPES } from '@/features/booking/data/bookingOptions'
import { formatDob, fullName } from '@/features/booking/utils/format'
import InfoCard, { InfoField } from './InfoCard'

// "Passenger Details": one row per passenger of the booking (Figma: 6 columns across the whole card).
// Figma's last two columns are "Document Type / Number". The traveller form does not ask for them yet,
// so the passenger's Type and Ticket Number (both real data of the booking) fill those places.
export default function PassengerDetailsCard({ passengers }) {
  return (
    <InfoCard icon={User} title="Passenger Details">
      <div className="flex flex-col gap-5">
        {passengers.map((p) => (
          <div key={p.ticketNumber} className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-x-0 md:grid-cols-[142px_106px_137px_134px_160px_1fr]">
            <InfoField label="Full Name">{fullName(p)}</InfoField>
            <InfoField label="Gender">{p.gender}</InfoField>
            <InfoField label="Date of Birth">{formatDob(p.dob)}</InfoField>
            <InfoField label="Nationality">{p.nationality}</InfoField>
            <InfoField label="Passenger Type">{PASSENGER_TYPES[p.type]?.label ?? p.type}</InfoField>
            <InfoField label="Ticket Number">{p.ticketNumber}</InfoField>
          </div>
        ))}
      </div>
    </InfoCard>
  )
}
