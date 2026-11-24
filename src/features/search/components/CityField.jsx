import { findCity, cities } from '../data/searchOptions'

// Big city name + airport. A real <select> sits invisibly on top, so clicking opens the city list.
// showCode: true -> "Delhi (DEL)", false -> "Delhi".  nameClass: text size of the city name.
export default function CityField({ label, value, onChange, showCode = false, nameClass = 'text-2xl' }) {
  const city = findCity(value)
  return (
    <div className="relative min-w-0">
      <p className="text-[10px] font-medium tracking-widest text-slate-400">{label}</p>
      <p className={`font-semibold leading-8 ${nameClass}`}>{showCode ? `${city.city} (${city.code})` : city.city}</p>
      <p className="truncate text-xs text-slate-400">{city.airport}</p>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {cities.map((c) => <option key={c.code} value={c.code}>{c.city} ({c.code})</option>)}
      </select>
    </div>
  )
}
