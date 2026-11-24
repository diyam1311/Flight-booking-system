// The filter choices of the sidebar (from Figma) and the rules that apply them.
// Every choice has  matches(flight)  ->  true / false.  "hours" is only the grey text shown next to the name.

// "09:20" -> 9
const hourOf = (time) => Number(time.split(':')[0])

// "2h 15m" -> 135     "3h" -> 180
function minutesOf(duration) {
  const [hours, minutes] = duration.match(/\d+/g).map(Number)
  return hours * 60 + (minutes ?? 0)
}

const hourBetween = (time, from, to) => hourOf(time) >= from && hourOf(time) < to          // from <= hour < to
const minutesBetween = (duration, from, to) => minutesOf(duration) > from && minutesOf(duration) <= to // from < minutes <= to

export const DEPARTURE_SLOTS = [
  { id: 'early-morning', label: 'Early Morning', hours: '5am - 9am', matches: (f) => hourBetween(f.depTime, 5, 9) },
  { id: 'morning', label: 'Morning', hours: '9am - 12pm', matches: (f) => hourBetween(f.depTime, 9, 12) },
  { id: 'afternoon', label: 'Afternoon', hours: '12pm - 6pm', matches: (f) => hourBetween(f.depTime, 12, 18) },
  { id: 'evening', label: 'Evening', hours: '6pm - 12am', matches: (f) => hourBetween(f.depTime, 18, 24) },
]

export const ARRIVAL_SLOTS = [
  { id: 'morning', label: 'Morning', hours: '6am - 12pm', matches: (f) => hourBetween(f.arrTime, 6, 12) },
  { id: 'afternoon', label: 'Afternoon', hours: '12pm - 6pm', matches: (f) => hourBetween(f.arrTime, 12, 18) },
  { id: 'evening', label: 'Evening', hours: '6pm - 12am', matches: (f) => hourBetween(f.arrTime, 18, 24) },
]

// flight.refund in the flight data is 'full', 'partial' or 'none'
export const REFUND_OPTIONS = [
  { id: 'full', label: 'Fully Refundable', matches: (f) => f.refund === 'full' },
  { id: 'partial', label: 'Partially Refundable', matches: (f) => f.refund === 'partial' },
  { id: 'none', label: 'Non-Refundable', matches: (f) => f.refund === 'none' },
]

export const DURATION_OPTIONS = [
  { id: 'upto-2', label: 'Upto 2 hrs', matches: (f) => minutesBetween(f.duration, 0, 120) },
  { id: '2-4', label: '2 - 4 hrs', matches: (f) => minutesBetween(f.duration, 120, 240) },
  { id: '4-6', label: '4 - 6 hrs', matches: (f) => minutesBetween(f.duration, 240, 360) },
  { id: '6-plus', label: 'More than 6 hrs', matches: (f) => minutesBetween(f.duration, 360, Infinity) },
]

// The tick-box groups. filters.departure = ['morning', ...] holds the ticked ids of that group.
// (Airlines are not listed here: they come from the flights themselves, see getAirlines.)
const CHOICE_GROUPS = { departure: DEPARTURE_SLOTS, arrival: ARRIVAL_SLOTS, refund: REFUND_OPTIONS, duration: DURATION_OPTIONS }

// Returns only the flights that pass every filter.
//  - inside one group the choices are "OR"  (Morning OR Evening)
//  - between groups they are "AND"          (IndiGo AND Morning AND refundable)
//  - a group with nothing ticked does not filter anything
export function filterFlights(flights, filters) {
  return flights.filter((flight) => {
    if (flight.price > filters.maxPrice) return false
    if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) return false
    return Object.entries(CHOICE_GROUPS).every(
      ([group, choices]) =>
        filters[group].length === 0 || choices.some((choice) => filters[group].includes(choice.id) && choice.matches(flight))
    )
  })
}

// The number in brackets next to a tick box, e.g. "Morning (3)"
export const countFlights = (flights, choice) => flights.filter(choice.matches).length

// [{ name: 'IndiGo', count: 3 }, ...] – airlines in the results, most flights first
export function getAirlines(flights) {
  const counts = {}
  flights.forEach((f) => { counts[f.airline] = (counts[f.airline] || 0) + 1 })
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

// Lowest / highest price rounded to the nearest 500 (the two ends of the price slider)
export function getPriceBounds(flights) {
  if (flights.length === 0) return { min: 0, max: 0 }
  const prices = flights.map((f) => f.price)
  return {
    min: Math.floor(Math.min(...prices) / 500) * 500,
    max: Math.ceil(Math.max(...prices) / 500) * 500,
  }
}
