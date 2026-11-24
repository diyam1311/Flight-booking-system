import { useState } from 'react'
import { filterFlights, getPriceBounds } from '../utils/filterRules'

const NOTHING_TICKED = { airlines: [], departure: [], arrival: [], refund: [], duration: [] }

// Keeps the filter choices and gives back the flights that match them.
// Usage:  const { filters, filteredFlights, toggle, setMaxPrice, clearAll } = useFlightFilters(flights)
export default function useFlightFilters(flights) {
  const [ticked, setTicked] = useState(NOTHING_TICKED)
  const [priceLimit, setPriceLimit] = useState(null) // null = slider at the far right = no price limit

  const bounds = getPriceBounds(flights)
  const filters = { ...ticked, maxPrice: priceLimit ?? bounds.max }

  // tick / untick one box:  toggle('airlines', 'IndiGo')
  const toggle = (group, id) =>
    setTicked({
      ...ticked,
      [group]: ticked[group].includes(id) ? ticked[group].filter((x) => x !== id) : [...ticked[group], id],
    })

  const clearAll = () => {
    setTicked(NOTHING_TICKED)
    setPriceLimit(null)
  }

  // number shown on the "Filters" badge
  const tickedCount = Object.values(ticked).reduce((sum, list) => sum + list.length, 0)
  const activeCount = tickedCount + (filters.maxPrice < bounds.max ? 1 : 0)

  return { filters, bounds, filteredFlights: filterFlights(flights, filters), activeCount, toggle, setMaxPrice: setPriceLimit, clearAll }
}
