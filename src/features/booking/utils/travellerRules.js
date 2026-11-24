import { isEmail, isMobile } from '@/utils/validators'
import { parseISO, todayISO } from '@/utils/dates'
import { PASSENGER_TYPES } from '../data/bookingOptions'

// Checks for the Traveller Details form.
// Every check returns an object like { first: 'Enter the first name' } (empty object = all good).

// Letters, spaces and . ' - only (no digits or symbols)
const NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/

// Age in full years on a given day.  ageOn('2020-05-10', '2026-11-20') -> 6
export function ageOn(birthISO, dayISO) {
  const birth = parseISO(birthISO)
  const day = parseISO(dayISO)
  const age = day.getFullYear() - birth.getFullYear()
  const hadBirthday = day.getMonth() > birth.getMonth() || (day.getMonth() === birth.getMonth() && day.getDate() >= birth.getDate())
  return hadBirthday ? age : age - 1
}

function nameError(value, { required, what }) {
  const text = value.trim()
  if (!text) return required ? `Enter the ${what}` : ''
  return NAME_PATTERN.test(text) ? '' : 'Use letters only'
}

function dobError(dob, type, travelDate) {
  if (!dob) return 'Select the date of birth'
  if (dob > todayISO()) return 'Date of birth cannot be in the future'

  const { label, minAge, maxAge } = PASSENGER_TYPES[type]
  const age = ageOn(dob, travelDate)
  if (age < minAge || (maxAge !== null && age > maxAge)) {
    if (maxAge === null) return `${label} must be ${minAge}+ years old on the travel date`
    return `${label} must be ${minAge === 0 ? 'under 2' : `${minAge}-${maxAge}`} years old on the travel date`
  }
  return ''
}

export function validatePassenger(passenger, travelDate) {
  const checks = {
    title: passenger.title ? '' : 'Select a title',
    first: nameError(passenger.first, { required: true, what: 'first name' }),
    middle: nameError(passenger.middle, { required: false }),
    last: nameError(passenger.last, { required: true, what: 'last name' }),
    gender: passenger.gender ? '' : 'Select a gender',
    dob: dobError(passenger.dob, passenger.type, travelDate),
    nationality: passenger.nationality ? '' : 'Select a nationality',
  }
  return keepErrors(checks)
}

export function validateContact(contact) {
  return keepErrors({
    email: isEmail(contact.email) ? '' : 'Enter a valid email address',
    mobile: isMobile(contact.mobile) ? '' : 'Enter a valid 10-digit mobile number',
  })
}

// { first: 'Enter...', last: '' } -> { first: 'Enter...' }
const keepErrors = (checks) => Object.fromEntries(Object.entries(checks).filter(([, message]) => message))

// Checks the whole form. Result: { passengers: { [passengerKey]: {...} }, contact: {...} }
export function validateTravellers(passengers, contact, travelDate) {
  return {
    passengers: Object.fromEntries(passengers.map((p) => [p.key, validatePassenger(p, travelDate)])),
    contact: validateContact(contact),
  }
}

export const hasErrors = (errors) =>
  Object.values(errors.passengers).some((e) => Object.keys(e).length > 0) || Object.keys(errors.contact).length > 0
