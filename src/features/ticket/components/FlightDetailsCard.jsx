import { PlaneTakeoff } from 'lucide-react'
import InfoCard, { InfoField } from './InfoCard'

// "Flight Details": airline, departure, arrival, duration and terminals.  view : utils/ticketView.js
export default function FlightDetailsCard({ view }) {
  return (
    <InfoCard icon={PlaneTakeoff} title="Flight Details">
      <div className="grid grid-cols-2 items-start gap-x-6 gap-y-4 md:gap-x-0 md:grid-cols-[201px_156px_156px_156px_1fr]">
        <div>
          <p className="text-sm font-medium leading-5">{view.airline} ({view.flightCode})</p>
          <p className="mt-1 text-[8px] leading-[10px] text-slate-400">{view.fromCode} - {view.toCode}</p>
        </div>
        <InfoField label="Departure" note={view.travelDate}>{view.depTime}</InfoField>
        <InfoField label="Arrival" note={view.travelDate}>{view.arrTime}</InfoField>
        <InfoField label="Duration" note={view.stops}>{view.duration}</InfoField>
        <InfoField label="Terminal"><span className="font-bold">{view.terminals}</span></InfoField>
      </div>
    </InfoCard>
  )
}
