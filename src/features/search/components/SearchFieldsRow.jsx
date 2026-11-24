import { useRef, useState } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { todayISO } from '@/utils/dates'
import CityField from './CityField'
import DateField from './DateField'
import CalendarPopup from './CalendarPopup'

// The row  FROM | TO | DEPARTURE | RETURN  + the calendar that opens under it.
// Used by the homepage search card AND the results page summary bar.
//  variant:    'home' or 'results' (only the text sizes differ)
//  searchForm: the object returned by useSearchForm()
const STYLES = {
  home: { cityName: 'text-2xl', showCode: false, dayClass: 'text-lg' },
  results: { cityName: 'text-xl lg:text-[28px]', showCode: true, dayClass: 'text-sm' },
}

// every box of the row (Figma: 94px high on desktop)
const cell = 'relative lg:flex lg:h-[94px] lg:flex-col lg:justify-center'

export default function SearchFieldsRow({ variant, searchForm, className = '' }) {
  const { form, oneWay, setFrom, setTo, swap, setDepart, setRet } = searchForm
  const style = STYLES[variant]

  const [openField, setOpenField] = useState(null) // null (closed) | 'depart' | 'return'
  const ref = useRef(null)
  useClickOutside(ref, () => setOpenField(null), openField !== null)

  // Clicking Return on a one way trip switches to Round Trip ("Book round trip for great savings")
  const openReturn = () => {
    if (oneWay) return
    setOpenField('return')
  }

  const pickDate = (date) => {
    if (openField === 'depart') {
      setDepart(date)
      setOpenField(oneWay ? null : 'return') // round trip: go on and choose the return date
    } else {
      setRet(date)
      setOpenField(null)
    }
  }

  return (
    <div ref={ref} className={`relative flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_1fr_186px_186px] lg:gap-0 ${className}`}>
      <div className={`${cell} lg:pl-[23px]`}>
        <CityField label="FROM" value={form.from} onChange={setFrom} showCode={style.showCode} nameClass={style.cityName} />
      </div>

      <div className={`${cell} max-lg:pr-10 lg:border-l lg:border-slate-200 lg:pl-[30px]`}>
        <button
          type="button"
          onClick={swap}
          aria-label="Swap cities"
          className="absolute top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border bg-white shadow-sm max-lg:right-0 lg:left-0 lg:-translate-x-1/2"
        >
          <ArrowLeftRight size={14} />
        </button>
        <CityField label="TO" value={form.to} onChange={setTo} showCode={style.showCode} nameClass={style.cityName} />
      </div>

      <div className="grid grid-cols-2 gap-5 lg:contents">
        <div className={`${cell} lg:border-l lg:border-slate-200 lg:px-6`}>
          <DateField label="DEPARTURE" value={form.depart} dayClass={style.dayClass} onClick={() => setOpenField('depart')} />
        </div>
        <div className={`${cell} lg:border-l lg:border-slate-200 lg:pl-[27px] lg:pr-6`}>
          <DateField label="RETURN" value={form.ret}  faded={oneWay} dayClass={style.dayClass} onClick={openReturn} />
        </div>
      </div>

      {openField && (
        <CalendarPopup
          selecting={openField}
          depart={form.depart}
          ret={form.ret}
          oneWay={oneWay}
          minDate={openField === 'return' ? form.depart : todayISO()}
          onPick={pickDate}
        />
      )}
    </div>
  )
}
