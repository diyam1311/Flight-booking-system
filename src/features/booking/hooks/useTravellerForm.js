import { useRef, useState } from 'react'
import { MAX_PASSENGERS } from '@/features/search/data/searchOptions'
import { TITLE_GENDER } from '../data/bookingOptions'
import { hasErrors, validateTravellers } from '../utils/travellerRules'

// Changing one of these means it is no longer the "saved traveller" that was picked
const IDENTITY_FIELDS = ['first', 'middle', 'last', 'dob']

const newPassenger = (key, type, extra = false) => ({
  key, type, extra, // extra = added with "Add Another Passenger" (can be removed again)
  title: '', first: '', middle: '', last: '', gender: '', dob: '', nationality: 'Indian',
  save: false,      // "Save this traveller for future bookings"
  savedId: null,    // id of the saved traveller that was picked from the dropdown
})

// One form per searched passenger:  2 adults + 1 child  ->  Adult, Adult, Child
function startingPassengers(pax, makeKey) {
  const list = []
  const add = (type, count) => { for (let i = 0; i < count; i++) list.push(newPassenger(makeKey(), type)) }
  add('adult', pax.adults)
  add('child', pax.children)
  add('infant', pax.infants)
  return list
}

// Removes the error of the fields that were just edited
function withoutErrors(errors, key, fields) {
  const mine = { ...(errors.passengers[key] ?? {}) }
  fields.forEach((field) => delete mine[field])
  return { ...errors, passengers: { ...errors.passengers, [key]: mine } }
}

// All the state + rules of the Traveller Details form in one place.
export default function useTravellerForm({ search, passengers: savedPassengers, contact: savedContact }) {
  const lastKey = useRef(0)
  const makeKey = () => `passenger-${lastKey.current++}` // a stable id for each form (not the position)

  const [passengers, setPassengers] = useState(() =>
    savedPassengers?.map(p => ({ ...p, key: makeKey() })) ?? startingPassengers(search.pax, makeKey)
  )
  const [contact, setContact] = useState(savedContact ?? { email: '', mobile: '' })
  const [errors, setErrors] = useState({ passengers: {}, contact: {} })

  const patch = (key, changes) =>
    setPassengers((current) => current.map((p) => (p.key === key ? { ...p, ...changes } : p)))

  // Typing / choosing something in a passenger form:  editPassenger('passenger-0', { last: 'Sharma' })
  const editPassenger = (key, changes) => {
    const touchesIdentity = Object.keys(changes).some((field) => IDENTITY_FIELDS.includes(field))
    patch(key, touchesIdentity ? { ...changes, savedId: null } : changes)
    setErrors((current) => withoutErrors(current, key, Object.keys(changes)))
  }

  const setTitle = (key, title) => editPassenger(key, { title, ...(TITLE_GENDER[title] && { gender: TITLE_GENDER[title] }) })

  // Fills the whole form from a saved traveller.
  // Email / mobile of the booking are filled too, but only the ones still empty (never overwrite what was typed).
  const pickSavedTraveller = (key, saved) => {
    const { title, first, middle, last, gender, dob, nationality } = saved
    patch(key, { title, first, middle, last, gender, dob, nationality, savedId: saved.id, save: false })
    setContact((current) => ({ email: current.email || saved.email || '', mobile: current.mobile || saved.mobile || '' }))
    setErrors((current) => ({ passengers: { ...current.passengers, [key]: {} }, contact: {} })) // contact is re-checked on Continue
  }

  // "+ Add new traveller": empties the form again
  const clearPassenger = (key) => {
    patch(key, { title: '', first: '', middle: '', last: '', gender: '', dob: '', nationality: 'Indian', savedId: null })
    setErrors((current) => ({ ...current, passengers: { ...current.passengers, [key]: {} } }))
  }

  const canAddPassenger = passengers.length < MAX_PASSENGERS
  const addPassenger = () => {
    if (canAddPassenger) setPassengers((current) => [...current, newPassenger(makeKey(), 'adult', true)])
  }
  const removePassenger = (key) => setPassengers((current) => current.filter((p) => p.key !== key))

  const editContact = (field, value) => {
    setContact((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const { [field]: removed, ...rest } = current.contact // eslint-disable-line no-unused-vars
      return { ...current, contact: rest }
    })
  }

  // Runs all the checks and shows the messages. Returns true when the form is fine.
  const validate = () => {
    const found = validateTravellers(passengers, contact, search.depart)
    setErrors(found)
    return !hasErrors(found)
  }

  return {
    passengers, contact, errors, canAddPassenger,
    editPassenger, setTitle, pickSavedTraveller, clearPassenger,
    addPassenger, removePassenger, editContact, validate,
  }
}
