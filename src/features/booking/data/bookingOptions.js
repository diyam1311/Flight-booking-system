// Choices and rules used by the Traveller Details page.

// Passenger types. The age rules are checked on the day of travel.
//   titles : what can be picked in the "Title" box
//   minAge / maxAge : allowed age in full years (maxAge null = no upper limit)
//   typicalAge : the birth-date calendar opens around this age
export const PASSENGER_TYPES = {
  adult: { label: 'Adult', titles: ['Mr', 'Mrs', 'Ms'], minAge: 12, maxAge: null, typicalAge: 30 },
  child: { label: 'Child', titles: ['Master', 'Miss'], minAge: 2, maxAge: 11, typicalAge: 6 },
  infant: { label: 'Infant', titles: ['Master', 'Miss'], minAge: 0, maxAge: 1, typicalAge: 1 },
}

export const TITLE_GENDER = { Mr: 'Male', Mrs: 'Female', Ms: 'Female', Miss: 'Female', Master: 'Male' }

export const GENDERS = ['Male', 'Female', 'Other']

export const NATIONALITIES = [
  'Indian', 'American', 'Australian', 'Bangladeshi', 'British', 'Canadian', 'French',
  'German', 'Nepalese', 'Singaporean', 'Sri Lankan', 'Emirati', 'Other',
]
