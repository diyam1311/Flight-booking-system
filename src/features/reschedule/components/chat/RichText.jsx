// Shows text where **this part** is bold. Lets the backend send plain strings.
export default function RichText({ text }) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i} className="font-bold text-navy">{part}</strong> : part))
}
