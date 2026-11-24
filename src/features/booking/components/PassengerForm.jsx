import { Trash2 } from 'lucide-react'
import TextField from './TextField'
import SelectField from './SelectField'
import DateOfBirthField from './DateOfBirthField'
import GenderField from './GenderField'
import FirstNameField from './FirstNameField'
import { NATIONALITIES, PASSENGER_TYPES } from '../data/bookingOptions'

export default function PassengerForm({ passenger: p, number, errors, savedTravellers, onChange, onTitle, onPick, onClear, onRemove }) {
  const type = PASSENGER_TYPES[p.type]
  const id = (field) => `${p.key}-${field}`
  const text = (field) => (e) => onChange(p.key, { [field]: e.target.value })

  return (
    <section aria-labelledby={id('heading')}>
      <div className="flex h-6 items-center justify-between">
        <h2 id={id('heading')} className="text-base font-bold text-navy">Passenger {number} - {type.label}</h2>
        {p.extra && (
          <button type="button" onClick={() => onRemove(p.key)} className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-500">
            <Trash2 size={12} /> Remove
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-x-[14px] gap-y-6 sm:grid-cols-2 lg:grid-cols-[104px_1fr_1fr_1fr] lg:gap-y-8">
        {/* row 1 */}
        <SelectField id={id('title')} label="Title" hideLabel placeholder="Title" value={p.title} options={type.titles}
          onChange={(title) => onTitle(p.key, title)} error={errors.title} className="lg:mt-5" />
        <FirstNameField id={id('first')} value={p.first} error={errors.first} savedTravellers={savedTravellers} selectedId={p.savedId}
          onChange={(value) => onChange(p.key, { first: value })}
          onPick={(saved) => onPick(p.key, saved)} onAddNew={() => onClear(p.key)} />
        <TextField id={id('middle')} label="Middle Name" placeholder="Middle name (optional)"
          value={p.middle} onChange={text('middle')} error={errors.middle} />
        <TextField id={id('last')} label="Last Name" placeholder="Last name"
          value={p.last} onChange={text('last')} error={errors.last} />

        {/* row 2 */}
        <div className="sm:col-span-2 lg:col-span-2">
          <GenderField name={id('gender')} value={p.gender} onChange={(gender) => onChange(p.key, { gender })} error={errors.gender} />
        </div>
        <DateOfBirthField id={id('dob')} label="Date of Birth" startAge={type.typicalAge} value={p.dob} onChange={(dob) => onChange(p.key, { dob })} error={errors.dob} />
        <SelectField id={id('nationality')} label="Nationality" value={p.nationality} options={NATIONALITIES}
          onChange={(nationality) => onChange(p.key, { nationality })} error={errors.nationality} />
      </div>

      {!p.savedId && (
        <label className="mt-8 flex w-fit cursor-pointer items-center gap-2 text-sm text-slate-500">
          <input type="checkbox" checked={p.save} onChange={(e) => onChange(p.key, { save: e.target.checked })} className="h-4 w-4 accent-[#013172]" />
          Save this traveller for future bookings
        </label>
      )}
    </section>
  )
}
