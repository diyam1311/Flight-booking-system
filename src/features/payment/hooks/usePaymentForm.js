import { useState } from 'react'
import { formatCardNumber, formatCvv, formatExpiry, validateCard } from '../utils/cardRules'

// Everything the user picks or types on the payment page.
//   method : the option that is open - 'card' | 'emi' | 'netbanking'
//   validate() : checks the open option, returns true when the payment can go ahead
// (Instant UPI needs nothing from the user, so it does not use this form.)
export default function usePaymentForm(cardholderName) {
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: cardholderName, save: true })
  const [emiMonths, setEmiMonths] = useState(3)
  const [bank, setBank] = useState('')
  const [errors, setErrors] = useState({})

  const openMethod = (next) => {
    setMethod(next)
    setErrors({})
  }

  // one handler for all card inputs: the input's "name" says which field changed
  const changeCard = (e) => {
    const { name, type, value, checked } = e.target
    const clean = { number: formatCardNumber, expiry: formatExpiry, cvv: formatCvv }
    const newValue = type === 'checkbox' ? checked : clean[name] ? clean[name](value) : value
    setCard((current) => ({ ...current, [name]: newValue }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const pickBank = (id) => {
    setBank(id)
    setErrors({})
  }

  const validate = () => {
    let found = {}
    if (method === 'card') found = validateCard(card)
    if (method === 'netbanking' && !bank) found = { bank: 'Select your bank to continue' }
    setErrors(found)
    return Object.keys(found).length === 0
  }

  return { method, openMethod, card, changeCard, emiMonths, setEmiMonths, bank, pickBank, errors, validate }
}
