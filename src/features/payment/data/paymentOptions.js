// Fixed choices of the payment page.

// How long the user has to finish paying (the orange timer in the header)
export const PAYMENT_SESSION_MINUTES = 12

// "No Cost EMI": the number of months the amount can be split into
export const EMI_MONTHS = [3, 6, 9]

// Banks of "Net Banking". `short` + `color` draw the round logo placeholder
// (when you have the real logo files, put them in this feature's assets/ folder and show them instead).
export const BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', short: 'HD', color: 'bg-[#004C8F]' },
  { id: 'icici', name: 'ICICI Bank', short: 'IC', color: 'bg-[#F37E20]' },
  { id: 'sbi', name: 'SBI', short: 'SB', color: 'bg-[#1D4F9F]' },
  { id: 'axis', name: 'Axis Bank', short: 'AX', color: 'bg-[#97144D]' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', short: 'KM', color: 'bg-[#ED1C24]' },
  { id: 'pnb', name: 'Punjab National Bank', short: 'PN', color: 'bg-[#A20E37]' },
  { id: 'bob', name: 'Bank of Baroda', short: 'BB', color: 'bg-[#F15A22]' },
  { id: 'indusind', name: 'IndusInd Bank', short: 'IB', color: 'bg-[#8B1E3F]' },
  { id: 'yes', name: 'Yes Bank', short: 'YB', color: 'bg-[#0066B3]' },
  { id: 'canara', name: 'Canara Bank', short: 'CB', color: 'bg-[#0072BC]' },
]
