import delhi from '../assests/city-delhi.png'
import bangalore from '../assests/city-bangalore.png'

const CITY_PHOTOS = { DEL: delhi, BLR: bangalore, GOI: '/images/gateways/goa.jpg' }

// Drawings (24 x 24 grid) for the cities that have no photo yet: Mumbai, Hyderabad, Kolkata.
const DRAWINGS = {
  BOM: <path d="M4 20V10h3v-2h10v2h3v10h-3v-7a5 5 0 0 0-10 0v7zM12 3l2 3h-4z" />,                       // Gateway of India
  HYD: <path d="M4 20V9l1-3 1 3v11zm14 0V9l1-3 1 3v11zM8 20v-8l1-4 1 4v8zm6 0v-8l1-4 1 4v8zM8 14h8v6H8z" />, // Charminar
  CCU: <path d="M3 18h18v2H3zM5 18V8l3 4 4-8 4 8 3-4v10h-2v-5l-1 1-4-7-4 7-1-1v5z" />,                  // Howrah Bridge
}

// Small picture of a city (Figma: 49 x 44.5, radius 6). Photo if we have one, otherwise a drawing, otherwise the airport code.
export default function CityThumb({ code }) {
  const base = 'mr-4 h-[44.5px] w-[49px] shrink-0 rounded-md'

  if (CITY_PHOTOS[code]) return <img src={CITY_PHOTOS[code]} alt="" className={`${base} object-cover`} />

  return (
    <span className={`${base} grid place-items-center bg-gradient-to-br from-orange-200 to-sky-200 text-navy`} aria-hidden="true">
      {DRAWINGS[code] ? <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">{DRAWINGS[code]}</svg> : <b className="text-xs">{code}</b>}
    </span>
  )
}
