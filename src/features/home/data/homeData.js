// All homepage text/data lives here so you can later swap it for API data.
// (The city list for the search box is in features/search/data/searchOptions.js)

export const popularRoutes = [
  { from: 'DEL', to: 'GOI', flights: 18, price: '₹3,499' },
  { from: 'BOM', to: 'BLR', flights: 24, price: '₹2,890' },
  { from: 'DEL', to: 'CCU', flights: 14, price: '₹3,800' },
  { from: 'BLR', to: 'HYD', flights: 16, price: '₹2,150' },
]

// ADD IMAGE HERE: put each file in  public/images/gateways/  with exactly these names.

export const gateways = [
  { region: 'Western Coast', name: 'Goa', note: 'Pristine shorelines, Portuguese heritage & coastal cuisine', price: '₹3,499', image: '/images/gateways/goa.jpg', size: 'lg' },
  { region: 'Punjab', name: 'Amritsar', note: 'Food, Golden temple', price: '₹2,500', image: '/images/gateways/amritsar.jpg' },
  { region: 'Kashmir Valley', name: 'Srinagar', note: 'Snow peaks & shikara serenity', price: '₹4,200', image: '/images/gateways/srinagar.jpg' },
  { region: 'Uttarakhand', name: 'Devprayag', note: 'Snow peaks & nature', price: '₹3,200', image: '/images/gateways/devprayag.jpg' },
  { region: 'Rajasthan', name: 'Jaipur', note: 'Palaces, forts & craft bazaars', price: '₹2,100', image: '/images/gateways/jaipur.jpg' },
  { region: 'Assam', name: 'Majuli Island', note: 'Traditional Mishing tribes & vibrant handicrafts', price: '₹5,499', image: '/images/gateways/majuli.jpg', size: 'lg' },
]

export const deals = [
  { airline: 'Air India', plane: 'Boeing 787-9 Dreamliner', seats: '5 Seats Left', from: 'DEL', fromCity: 'DELHI', dep: '08:30AM', depDate: '13 July, 2024', to: 'BOM', toCity: 'MUMBAI', arr: '12:40PM', arrDate: '13 July, 2024', duration: '4h 10m', cabin: 'Business Class', price: '₹2,520' },
  { airline: 'Air India', plane: 'Airbus A350-900', seats: '3 Seats Left', from: 'BOM', fromCity: 'MUMBAI', dep: '08:30AM', depDate: '13 July, 2024', to: 'DEL', toCity: 'DELHI', arr: '12:40PM', arrDate: '13 July, 2024', duration: '4h 10m', cabin: 'Business Class', price: '₹2,850' },
]

export const trust = ['Instant E-Ticket Confirmation', '24/7 Priority Concierge Assistance', 'Zero Hidden Markup Guarantee']
