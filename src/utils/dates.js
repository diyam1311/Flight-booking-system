// Dates in the app are plain text like "2026-11-20" (year-month-day, in the user's own time zone).
// Text in this format can be compared directly:  "2026-11-20" < "2026-12-01"  is true.

const pad = (n) => String(n).padStart(2, '0')

// Date object -> "2026-11-20"
export const toISO = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

// "2026-11-20" -> Date object at midnight (local time)
export const parseISO = (iso) => new Date(`${iso}T00:00:00`)

export const todayISO = () => toISO(new Date())

export function addDays(iso, days) {
  const date = parseISO(iso)
  date.setDate(date.getDate() + days)
  return toISO(date)
}

const show = (iso, options) => parseISO(iso).toLocaleDateString('en-GB', options)

export const formatDay = (iso) => show(iso, { day: '2-digit', month: 'short' })                      // "20 Nov"
export const formatWeekday = (iso) => show(iso, { weekday: 'long' })                                 // "Friday"
export const formatLong = (iso) => show(iso, { day: '2-digit', month: 'long', year: 'numeric' })      // "20 November 2026"
export const formatShort = (iso) => show(iso, { day: '2-digit', month: 'short', year: '2-digit' })   // "20 Nov 26"

// Date object -> "November 2026"
export const monthTitle = (date) => date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Every box of a month calendar (the week starts on Monday):
// [null, null, "2026-07-01", "2026-07-02", ...]   (null = empty box before the 1st)
export function monthCells(year, month) {
  const emptyBoxes = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return [
    ...Array(emptyBoxes).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => toISO(new Date(year, month, i + 1))),
  ]
}
