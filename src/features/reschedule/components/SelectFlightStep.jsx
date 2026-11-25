import CurrentItineraryCard from './CurrentItineraryCard'
import DateSelector from './DateSelector'
import FlightOptionCard from './FlightOptionCard'

// Step 1 - "Select Flight": current booking, date tiles and the flights of that date.
//   offer : { itinerary, dates }     flights : null while loading      onSelectFlight(flight) : opens the chat
export default function SelectFlightStep({ offer, dateId, onDateChange, flights, onSelectFlight, busy }) {
  return (
    <div className="flex flex-col gap-10">
      <CurrentItineraryCard itinerary={offer.itinerary} />
      <div className="flex flex-col gap-4">
        <DateSelector dates={offer.dates} selectedId={dateId} onSelect={onDateChange} />
        {flights === null
          ? [1, 2, 3].map((n) => <div key={n} className="h-[280px] animate-pulse rounded-xl bg-white" />) // loading
          : flights.map((flight) => <FlightOptionCard key={flight.id} flight={flight} busy={busy} onSelect={() => onSelectFlight(flight)} />)}
      </div>
    </div>
  )
}
