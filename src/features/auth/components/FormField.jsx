// One labelled input with optional left icon, right-side element and error message.
export default function FormField({ id, label, error, icon: Icon, rightSlot, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[10px] font-semibold text-slate-800">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        )}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          className={`h-9 w-full rounded-[9.33px] border bg-white text-[11px] outline-none placeholder:text-slate-400 focus:border-navy ${
            Icon ? 'pl-9' : 'pl-3.5'
          } ${rightSlot ? 'pr-10' : 'pr-3.5'} ${error ? 'border-red-400' : 'border-slate-200'}`}
          {...inputProps}
        />
        {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {error && (
        <p role="alert" className="mt-1 text-[10px] text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
