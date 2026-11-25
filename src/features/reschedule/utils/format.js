// Small text helpers for the reschedule pages.

// 5842 -> "₹5,842"      (plus = true: 450 -> "+ ₹450")
export const rupees = (amount, plus = false) => `${plus ? '+ ' : ''}₹${amount.toLocaleString('en-IN')}`

// 7184 -> "01:59:44"   (the "Fare Price Lock" timer)
export const formatClock = (totalSeconds) => {
  const two = (n) => String(n).padStart(2, '0')
  return `${two(Math.floor(totalSeconds / 3600))}:${two(Math.floor((totalSeconds % 3600) / 60))}:${two(totalSeconds % 60)}`
}

// -> "10:15 AM"   (time under a chat message that the user just sent)
export const nowTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
