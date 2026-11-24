import { TOPICS, FAQS, CONTACTS } from '../data/helpData'

// All data of the Help & Support page comes from here.
// BACKEND: replace the body with a real call, for example
//   const res = await fetch(`${API_BASE_URL}/v1/help`); return res.json()
// It must return { topics, faqs, contacts } shaped like helpData.js. Nothing else needs to change.
export async function getHelpContent() {
  return { topics: TOPICS, faqs: FAQS, contacts: CONTACTS }
}
