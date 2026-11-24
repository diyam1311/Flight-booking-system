import { fullName } from '@/features/booking/utils/format'
import { formatRupees } from '@/features/payment/utils/pricing'
import { BAGGAGE_ALLOWANCE, SUPPORT_EMAIL } from '../data/ticketData'
import { barcodeBars } from './barcode'
import { getTicketView } from './ticketView'

// Makes the e-ticket PDF and downloads it. Page = A4, all sizes are in points (1 pt = 1/72 inch).
// One boarding pass per passenger, then the payment summary.

// colours (RGB) - same as the website
const NAVY = [1, 49, 114]
const BRAND = [232, 88, 13]
const TEXT = [15, 23, 42]
const MUTED = [100, 116, 139]
const LINE = [226, 232, 240]
const SKY = [2, 132, 199]
const GREEN = [22, 163, 74]

const MARGIN = 40
const TICKET_HEIGHT = 200
const TICKET_GAP = 20
const TICKET_MAIN_WIDTH = 410 // the part left of the dashed line; the barcode is on the right of it

// The built-in PDF font has no rupee sign, so the PDF writes amounts as "INR 6,321"
const money = (amount) => formatRupees(amount).replace('₹', 'INR')

// Writes one piece of text. align: 'left' | 'center' | 'right'. maxWidth: wraps the text into more lines.
function write(doc, value, x, y, { size = 9, bold = false, color = TEXT, align = 'left', maxWidth } = {}) {
  doc.setFont('helvetica', bold ? 'bold' : 'normal')
  doc.setFontSize(size)
  doc.setTextColor(...color)
  const options = { align }
  if (maxWidth) options.maxWidth = maxWidth
  doc.text(String(value), x, y, options)
}

// A line, solid or dashed
function line(doc, x1, y1, x2, y2, { color = LINE, dashed = false } = {}) {
  doc.setDrawColor(...color)
  doc.setLineWidth(0.8)
  doc.setLineDashPattern(dashed ? [3, 3] : [], 0)
  doc.line(x1, y1, x2, y2)
  doc.setLineDashPattern([], 0)
}

// Logo text, booking ID and date at the top of the first page. Returns the y where the page content can start.
function drawHeader(doc, booking, view, right) {
  write(doc, 'MOBIYANTRA', MARGIN, 60, { size: 22, bold: true, color: NAVY })
  write(doc, 'Fly Anywhere Across India', MARGIN, 74, { size: 8, color: MUTED })

  write(doc, 'E-TICKET', right, 54, { size: 16, bold: true, color: BRAND, align: 'right' })
  write(doc, `Booking Reference: ${booking.id}`, right, 70, { size: 9, bold: true, align: 'right' })
  write(doc, `Booked on: ${view.bookedOn}`, right, 83, { size: 8, color: MUTED, align: 'right' })

  line(doc, MARGIN, 98, right, 98)
  write(doc, `Confirmation sent to ${booking.contact.email}`, MARGIN, 116, { size: 8, color: MUTED })
  return 134
}

// One boarding pass (the ticket of ONE passenger) starting at the given y
function drawTicket(doc, { y, view, passenger, booking, width }) {
  const x = MARGIN
  const x0 = x + 22                 // where the texts start
  const middle = x + 205            // centre of the "2h 15m" part
  const toX = x + 240               // where the arrival part starts

  doc.setFillColor(255, 255, 255)
  doc.setDrawColor(...LINE)
  doc.setLineWidth(0.8)
  doc.rect(x, y, width, TICKET_HEIGHT, 'FD')
  doc.setFillColor(...NAVY)
  doc.rect(x, y, 5, TICKET_HEIGHT, 'F')

  // airline
  write(doc, view.airline, x0, y + 27, { size: 12, bold: true })
  write(doc, view.flightCode, x0, y + 40, { size: 8, color: MUTED })

  // DEL 09:20 ...... 2h 15m ...... BOM 11:35
  write(doc, view.fromCode, x0, y + 84, { size: 26, bold: true })
  write(doc, view.depTime, x0 + 62, y + 70, { size: 11, bold: true })
  write(doc, view.fromAirport, x0 + 62, y + 82, { size: 7, color: MUTED, maxWidth: 95 })

  write(doc, view.duration, middle, y + 68, { size: 8, color: MUTED, align: 'center' })
  line(doc, middle - 28, y + 78, middle + 28, y + 78, { color: SKY, dashed: true })
  write(doc, view.stops, middle, y + 94, { size: 8, bold: true, color: SKY, align: 'center' })

  write(doc, view.toCode, toX, y + 84, { size: 26, bold: true })
  write(doc, view.arrTime, toX + 62, y + 70, { size: 11, bold: true })
  write(doc, view.toAirport, toX + 62, y + 82, { size: 7, color: MUTED, maxWidth: 95 })

  line(doc, x + 5, y + 112, x + TICKET_MAIN_WIDTH, y + 112)

  // the facts of this passenger: 4 columns, 2 rows
  const facts = [
    ['Passenger Name', fullName(passenger)],
    ['Booking Reference', booking.id],
    ['Seat Number', passenger.seat],
    ['Baggage Allowance', BAGGAGE_ALLOWANCE],
    ['Boarding Time', view.boardingTime],
    ['Ticket Number', passenger.ticketNumber],
    ['Gate No.', booking.gate],
    ['Terminal', view.terminals],
  ]
  facts.forEach(([label, value], i) => {
    const factX = x0 + (i % 4) * 92
    const factY = y + 131 + Math.floor(i / 4) * 35
    write(doc, label, factX, factY, { size: 7, color: MUTED })
    write(doc, value, factX, factY + 13, { size: 9, bold: true, maxWidth: 86 })
  })

  // dashed cut line + barcode
  line(doc, x + TICKET_MAIN_WIDTH, y + 12, x + TICKET_MAIN_WIDTH, y + TICKET_HEIGHT - 12, { color: [203, 213, 225], dashed: true })
  const barcodeHeight = 140
  const scale = barcodeHeight / 181 // the website draws the barcode 181 high
  doc.setFillColor(...TEXT)
  barcodeBars(passenger.ticketNumber, 181).forEach((bar) => {
    doc.rect(x + TICKET_MAIN_WIDTH + 36, y + 30 + bar.top * scale, 48, bar.height * scale, 'F')
  })
}

// "Payment Summary": the prices of the booking. Returns the y below it.
function drawSummary(doc, { y, booking, view, width }) {
  const { fare, seat, fee, discount, total } = booking.breakdown
  const x = MARGIN
  const right = x + width

  write(doc, 'Payment Summary', x, y, { size: 12, bold: true, color: NAVY })
  const rows = [
    ['Base Fare', money(fare)],
    ['Seat Selection', money(seat)],
    ['Convenience Fees', money(fee)],
    ['Discount (SPECIAL)', `- ${money(discount)}`],
  ]
  rows.forEach(([label, amount], i) => {
    const rowY = y + 26 + i * 22
    write(doc, label, x, rowY, { size: 9, color: MUTED })
    write(doc, amount, right, rowY, { size: 9, bold: true, align: 'right' })
    line(doc, x, rowY + 7, right, rowY + 7)
  })

  const totalY = y + 26 + rows.length * 22 + 10
  write(doc, 'Total Paid', x, totalY, { size: 12, bold: true })
  write(doc, money(total), right, totalY, { size: 12, bold: true, align: 'right' })
  write(doc, `Payment Successful - paid on ${view.bookedOn}`, x, totalY + 20, { size: 8, bold: true, color: GREEN })
  return totalY + 30
}

// Same small note at the bottom of every page
function drawFooters(doc, pageWidth, pageHeight) {
  const pages = doc.getNumberOfPages()
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page)
    write(doc, `Computer-generated e-ticket. Please carry a valid photo ID to the airport. Need help? ${SUPPORT_EMAIL}`, pageWidth / 2, pageHeight - 28, { size: 7, color: MUTED, align: 'center' })
    write(doc, `Page ${page} of ${pages}`, pageWidth / 2, pageHeight - 18, { size: 7, color: MUTED, align: 'center' })
  }
}

// Builds the PDF of a booking and saves it as "E-Ticket-ID-3486.pdf" in the user's downloads.
export async function downloadETicketPdf(booking) {
  // jsPDF is loaded only now (when the button is clicked), so it does not slow down the first page load
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const width = pageWidth - MARGIN * 2
  const view = getTicketView(booking)

  let y = drawHeader(doc, booking, view, MARGIN + width)

  booking.passengers.forEach((passenger) => {
    if (y + TICKET_HEIGHT > pageHeight - 50) { // no space left on this page -> next page
      doc.addPage()
      y = MARGIN
    }
    drawTicket(doc, { y, view, passenger, booking, width })
    y += TICKET_HEIGHT + TICKET_GAP
  })

  if (y + 150 > pageHeight - 50) {
    doc.addPage()
    y = MARGIN
  }
  drawSummary(doc, { y: y + 10, booking, view, width })

  drawFooters(doc, pageWidth, pageHeight)
  doc.save(`E-Ticket-${booking.id}.pdf`)
}
