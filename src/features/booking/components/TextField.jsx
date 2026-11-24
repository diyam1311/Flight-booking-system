// Shared styles for the Traveller Details fields.
export const LABEL_CLASS = 'mb-1 block text-xs font-medium leading-4 text-slate-900 group-focus-within:text-brand'
export const BOX_CLASS = 'h-[38px] w-full rounded-lg border bg-white px-4 text-sm outline-none focus:border-brand'
export const ERROR_CLASS = 'mt-1 text-xs text-red-500'

export const borderClass = (error) => (error ? 'border-red-400' : 'border-slate-300')

// One labelled text box in the Figma size. Pass any normal <input> props (value, onChange, placeholder, type ...).
// autoComplete="new-password": Chrome ignores "off" for name / email boxes and fills in the user's own details,
// which is wrong when booking for someone else. Any other value can still be passed in to override this.
export default function TextField({ id, label, error, ...inputProps }) {
  return (
    <div className="group">
      <label htmlFor={id} className={LABEL_CLASS}>{label}</label>
      <input
        id={id}
        name={id}
        autoComplete="new-password"
        aria-invalid={Boolean(error)}
        className={`${BOX_CLASS} placeholder:text-slate-400 ${borderClass(error)}`}
        {...inputProps}
      />
      {error && <p role="alert" className={ERROR_CLASS}>{error}</p>}
    </div>
  )
}
