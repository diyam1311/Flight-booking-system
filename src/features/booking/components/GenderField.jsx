import { GENDERS } from '../data/bookingOptions'
import { ERROR_CLASS } from './TextField'

// Male / Female / Other radio buttons. `name` must be different for every passenger.
export default function GenderField({ name, value, onChange, error }) {
  return (
    <fieldset aria-invalid={Boolean(error)}>
      <legend className="mb-1 text-xs font-medium leading-4 text-slate-900">Gender</legend>
      <div className="flex h-[38px] items-center gap-8 text-sm">
        {GENDERS.map((gender) => (
          <label key={gender} className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={name}
              value={gender}
              checked={value === gender}
              onChange={() => onChange(gender)}
              className="h-4 w-4 accent-[#013172]"
            />
            {gender}
          </label>
        ))}
      </div>
      {error && <p role="alert" className={ERROR_CLASS}>{error}</p>}
    </fieldset>
  )
}
