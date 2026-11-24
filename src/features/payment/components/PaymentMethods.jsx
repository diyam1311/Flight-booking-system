import { BadgeIndianRupee, CreditCard, Landmark } from 'lucide-react'
import PaymentOption from './PaymentOption'
import CardForm from './CardForm'
import EmiPlans from './EmiPlans'
import NetBankingPanel from './NetBankingPanel'
import { emiPerMonth, formatRupees } from '../utils/pricing'
import { EMI_MONTHS } from '../data/paymentOptions'

// "OTHER PAYMENT OPTIONS" (Figma: card radius 18, border 1.1px): Credit & Debit Cards, EMI, Net Banking.
//   form : everything from usePaymentForm()        total : amount to pay
export default function PaymentMethods({ form, total }) {
  const { method, openMethod, card, changeCard, emiMonths, setEmiMonths, bank, pickBank, errors } = form
  const lowestEmi = emiPerMonth(total, Math.max(...EMI_MONTHS))

  return (
    <section>
      <h2 className="text-[15px] font-bold uppercase leading-4 tracking-wide">Other Payment Options</h2>

      <div className="mt-[17px] overflow-hidden rounded-[18px] border-[1.13px] border-[#E2E8F0] bg-white">
        <PaymentOption
          icon={<CreditCard size={22} />}
          iconClass="bg-blue-50 text-navy"
          title="Credit & Debit Cards"
          subtitle="Visa, Mastercard, Amex, RuPay, Corporate Travel Card"
          extra={<CardLogos />}
          open={method === 'card'}
          onOpen={() => openMethod('card')}
        >
          <CardForm card={card} errors={errors} onChange={changeCard} />
        </PaymentOption>

        <PaymentOption
          icon={<BadgeIndianRupee size={24} />}
          iconClass="bg-emerald-50 text-emerald-600"
          title="EMI (Easy Monthly Installments)"
          tag="No Cost EMI"
          subtitle={`Credit/Bajaj Card & Cardless Corporate EMI starting at ${formatRupees(lowestEmi)}/mo`}
          open={method === 'emi'}
          onOpen={() => openMethod('emi')}
        >
          <EmiPlans total={total} months={emiMonths} onChange={setEmiMonths} />
        </PaymentOption>

        <PaymentOption
          icon={<Landmark size={22} />}
          iconClass="bg-slate-100 text-slate-600"
          title="Net Banking"
          subtitle="All 40+ Indian Major Banks Available (HDFC, ICICI, SBI, Axis)"
          open={method === 'netbanking'}
          onOpen={() => openMethod('netbanking')}
        >
          <NetBankingPanel bank={bank} error={errors.bank} onPick={pickBank} />
        </PaymentOption>
      </div>
    </section>
  )
}

// tiny card logos on the right of the "Credit & Debit Cards" header
function CardLogos() {
  return (
    <span className="hidden items-center gap-2 sm:flex">
      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">VISA</span>
      <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">MC</span>
      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-indigo-700">AMEX</span>
    </span>
  )
}
