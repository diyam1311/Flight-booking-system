export const SORT_OPTIONS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Earliest Departure']

// Returns a sorted copy of the flights ("Recommended" keeps the order from the service)
export function sortFlights(flights, sortBy) {
  const list = [...flights]
  if (sortBy === 'Price: Low to High') list.sort((a, b) => a.price - b.price)
  if (sortBy === 'Price: High to Low') list.sort((a, b) => b.price - a.price)
  if (sortBy === 'Earliest Departure') list.sort((a, b) => a.depTime.localeCompare(b.depTime))
  return list
}
