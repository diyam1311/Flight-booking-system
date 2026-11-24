import { useState } from 'react'
import { findCity } from '../data/searchOptions'
import { addDays, todayISO } from '@/utils/dates'

// The form's starting values.
//  - Homepage: no argument -> sensible defaults (Delhi -> Mumbai, tomorrow).
//  - Results page: pass the search the user made, so the bar shows (and can edit) it.
function startingForm(search) {
  if (search) {
    return {
      trip: search.trip,
      from: search.from.code,
      to: search.to.code,
      depart: search.depart,
      ret: search.ret ?? addDays(search.depart, 7), // one way has no return date -> suggest +7 days
      cabin: search.cabin,
      pax: search.pax,
    }
  }
  const tomorrow = addDays(todayISO(), 1)
  return {
    trip: 'One Way',
    from: 'DEL',
    to: 'BOM',
    depart: tomorrow,
    ret: addDays(tomorrow, 7),
    cabin: 'All Class',
    pax: { adults: 1, children: 0, infants: 0 },
  }
}

// All the state + rules of the search form in one place.
// Usage:  const searchForm = useSearchForm()          // homepage
//         const searchForm = useSearchForm(search)    // results page
export default function useSearchForm(initialSearch) {
  const [form, setForm] = useState(() => startingForm(initialSearch))
  const update = (changes) => setForm((current) => ({ ...current, ...changes }))

  // Picking the same city on both sides swaps them instead (so From and To are never equal)
  const setFrom = (code) => update(code === form.to ? { from: code, to: form.from } : { from: code })
  const setTo = (code) => update(code === form.from ? { to: code, from: form.to } : { to: code })
  const swap = () => update({ from: form.to, to: form.from })

  // Return date can never be before the departure date
  const setDepart = (date) => update({ depart: date, ret: form.ret < date ? date : form.ret })

  // What the next pages (loading + results) receive
  const getSearch = () => ({
    trip: form.trip,
    from: findCity(form.from),
    to: findCity(form.to),
    depart: form.depart,
    ret: form.trip === 'One Way' ? null : form.ret,
    cabin: form.cabin,
    pax: form.pax,
  })

  return {
    form,
    oneWay: form.trip === 'One Way',
    setTrip: (trip) => update({ trip }),
    setFrom,
    setTo,
    swap,
    setDepart,
    setRet: (ret) => update({ ret }),
    setCabin: (cabin) => update({ cabin }),
    setPax: (pax) => update({ pax }),
    getSearch,
  }
}
