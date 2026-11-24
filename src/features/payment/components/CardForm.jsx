import { Info } from 'lucide-react'
import { getCardBrand } from '../utils/cardRules'

const INPUT = 'h-[47.89px] w-full rounded-[14px] border-[1.13px] bg-white px-5 text-base outline-none transition focus:border-navy'

// Card details of "Credit & Debit Cards" (Figma: fields 740 x 47.9, border 1.13 slate-300, radius 14, 17.5 between fields, 18.1 between expiry and CVV).
//   card : { number, expiry, cvv, name, save }     onChange : one handler for all inputs (uses the input's name)
export default function CardForm({ card, errors, onChange }) {
  const brand = getCardBrand(card.number)

  return (
    <div className="flex flex-col gap-[17.5px]">
      <Field label="Card Number" error={errors.number}>
        <div className="relative">
          <input
            name="number"
            value={card.number}
            onChange={onChange}
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="4532 8900 1244 8921"
            className={`${INPUT} pr-36 tracking-widest ${errors.number ? 'border-red-400' : 'border-slate-300'}`}
          />
          {brand && <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-navy">{brand}</span>}
        </div>
      </Field>

      <div className="grid grid-cols-1 gap-y-[17.5px] sm:grid-cols-2 sm:gap-x-[18.1px]">
        <Field label="Expiry Date" error={errors.expiry}>
          <input
            name="expiry"
            value={card.expiry}
            onChange={onChange}
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            className={`${INPUT} ${errors.expiry ? 'border-red-400' : 'border-slate-300'}`}
          />
        </Field>
        <Field label="CVV / CVC" error={errors.cvv}>
          <div className="relative">
            <input
              name="cvv"
              type="password"
              value={card.cvv}
              onChange={onChange}
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="•••"
              className={`${INPUT} pr-24 ${errors.cvv ? 'border-red-400' : 'border-slate-300'}`}
            />
            <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs text-slate-300"><Info size={12} /> 3-digits</span>
          </div>
        </Field>
      </div>

      <Field label="Cardholder Full Name" error={errors.name}>
        <input
          name="name"
          value={card.name}
          onChange={onChange}
          autoComplete="cc-name"
          placeholder="Name on the card"
          className={`${INPUT} ${errors.name ? 'border-red-400' : 'border-slate-300'}`}
        />
      </Field>

      <label className="mt-[6.5px] -mb-px flex items-center gap-2.5 text-sm text-slate-600">
        <input type="checkbox" name="save" checked={card.save} onChange={onChange} className="h-4 w-4 accent-blue-600" />
        Securely save card for faster corporate procurement (RBI compliant tokenization)
      </label>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold uppercase leading-5 text-slate-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
