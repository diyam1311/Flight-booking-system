/**
 * MOCK BACKEND – DEMO ONLY.
 * "Saved travellers" are kept in the browser (localStorage), one list per logged-in user.
 * When your real API is ready, replace the bodies of getSavedTravellers() and saveTravellers()
 * with fetch()/axios calls. Keep the same return shape (an array of travellers) and nothing else needs to change.
 *
 * A traveller looks like:
 *   { id, title, first, middle, last, gender, dob: '1990-10-12', nationality, email, mobile }
 */
// Change the number in this name (v2 -> v3) whenever the saved data changes shape:
// everyone's old saved list is then ignored and the starter travellers below are shown again.
const KEY_PREFIX = 'mobiyantra_saved_travellers_v2_'
const OLD_KEY_PREFIX = 'mobiyantra_saved_travellers_' // first version (no email / mobile), cleaned up below

// Shown to a user who has not saved anyone yet, so the dropdown can be tried right away
const STARTER_TRAVELLERS = [
  { id: 's1', title: 'Mrs', first: 'Kritika', middle: '', last: 'Sharma', gender: 'Female', dob: '1990-10-12', nationality: 'Indian', email: 'kritika@example.com', mobile: '+91 9876543210' },
  { id: 's2', title: 'Ms', first: 'Priya', middle: '', last: 'Sharma', gender: 'Female', dob: '1992-08-14', nationality: 'Indian', email: 'priya@example.com', mobile: '+91 9876500012' },
  { id: 's3', title: 'Master', first: 'Aarav', middle: '', last: 'Sharma', gender: 'Male', dob: '2018-01-05', nationality: 'Indian', email: 'kritika@example.com', mobile: '+91 9876543210' },
]

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms)) // fake network delay

const storageKey = (user) => KEY_PREFIX + (user.id ?? user.email)

function readList(user) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(user)))
    return Array.isArray(saved) ? saved : [...STARTER_TRAVELLERS]
  } catch {
    return [...STARTER_TRAVELLERS]
  }
}

// Same person = same name + date of birth
const sameTraveller = (a, b) =>
  a.first.trim().toLowerCase() === b.first.trim().toLowerCase() &&
  a.last.trim().toLowerCase() === b.last.trim().toLowerCase() &&
  a.dob === b.dob

export async function getSavedTravellers(user) {
  await wait()
  localStorage.removeItem(OLD_KEY_PREFIX + (user.id ?? user.email)) // delete the old saved list
  return readList(user)
}

// Adds the given passengers to the user's saved list (people already saved are skipped).
// `contact` ({ email, mobile } of the booking) is saved with each person, so it can be filled in again next time.
// Returns the updated list.
export async function saveTravellers(user, passengers, contact) {
  await wait()
  const list = readList(user)
  passengers.forEach((p) => {
    if (list.some((saved) => sameTraveller(saved, p))) return
    list.push({
      id: `s${Date.now()}${list.length}`,
      title: p.title, first: p.first.trim(), middle: p.middle.trim(), last: p.last.trim(),
      gender: p.gender, dob: p.dob, nationality: p.nationality,
      email: contact.email.trim(), mobile: contact.mobile.trim(),
    })
  })
  localStorage.setItem(storageKey(user), JSON.stringify(list))
  return list
}
