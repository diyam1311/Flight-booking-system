// Choices used by the flight search form (homepage + results page).

export const cities = [
  { code: 'DEL', city: 'Delhi', airport: 'Indira Gandhi International Airport, T-3' },
  { code: 'BOM', city: 'Mumbai', airport: 'Chhatrapati Shivaji Maharaj International Airport' },
  { code: 'BLR', city: 'Bengaluru', airport: 'Kempegowda International Airport' },
  { code: 'HYD', city: 'Hyderabad', airport: 'Rajiv Gandhi International Airport' },
  { code: 'CCU', city: 'Kolkata', airport: 'Netaji Subhas Chandra Bose International Airport' },
  { code: 'GOI', city: 'Goa', airport: 'Dabolim / Manohar International Airport' },
]

export const findCity = (code) => cities.find((c) => c.code === code)

export const TRIP_TYPES = ['One Way', 'Round Trip', 'Multi City']
export const CABIN_CLASSES = ['All Class', 'Economy', 'Premium Economy', 'Business']
export const MAX_PASSENGERS = 9
