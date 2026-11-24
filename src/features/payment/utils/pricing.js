// Money rules of the payment page. When the real price API is ready, replace getPriceBreakdown().

// Extra charges (the amounts shown in the Figma design).
// They are placeholders until the add-ons page exists: then SEAT_FEE should come from the seats the user chose.
const SEAT_FEE = 630         // per traveller
const CONVENIENCE_FEE = 149  // per booking
const SPECIAL_DISCOUNT = 300 // promo code "SPECIAL", per booking

// -> { fare, seat, fee, discount, total }
//    fare  = price of the SELECTED flight x number of travellers
//    total = fare + seat + fee - discount   (this is the "Total Due")
export function getPriceBreakdown(flight, travellerCount) {
  const fare = flight.price * travellerCount
  const seat = SEAT_FEE * travellerCount
  return {
    fare,
    seat,
    fee: CONVENIENCE_FEE,
    discount: SPECIAL_DISCOUNT,
    total: fare + seat + CONVENIENCE_FEE - SPECIAL_DISCOUNT,
  }
}

// 6321 -> "₹ 6,321"
export const formatRupees = (amount) => `₹ ${amount.toLocaleString('en-IN')}`

// What one EMI payment costs (rounded up to the next rupee)
export const emiPerMonth = (total, months) => Math.ceil(total / months)
