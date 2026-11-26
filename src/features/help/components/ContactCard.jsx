import { MessageSquare, Phone, Mail } from 'lucide-react'

const CONTACT_ICONS = { chat: MessageSquare, call: Phone, email: Mail }

// One "Still need help?" card. Figma: 185.69 x 143.36, radius 20, padding 20.2 / 16.36.
// Cards with a link (call / email) show a link-button; the chat card shows a normal button.
export default function ContactCard({ contact }) {
  const Icon = CONTACT_ICONS[contact.icon]
  const buttonClass =
    'mb-0 ml-7 mt-auto flex h-[23.6px] w-[112px] items-center justify-center rounded-[4px] border border-brand text-[11.5px] text-brand hover:bg-brand/10'

  return (
    <div className="flex h-[143.36px] w-[185.69px] flex-col rounded-[20px] bg-white px-[16.36px] pb-[20.2px] pt-[18px]">
      <div className="flex items-start gap-[9px]">
        <span className="grid h-[19px] w-[19px] shrink-0 place-items-center rounded-full bg-[#EA580C]/10 text-brand">
          {Icon && <Icon size={10} />}
        </span>
        <div className="min-w-0">
          <h3 className="text-[13.4px] font-semibold leading-4">{contact.title}</h3>
          <p className="mt-1 text-[9.55px] leading-3 text-slate-600">{contact.line1}</p>
          <p className="mt-[3px] text-[9.55px] leading-3 text-slate-500">{contact.line2}</p>
        </div>
      </div>

      {contact.href ? (
        <a href={contact.href} className={buttonClass}>{contact.button}</a>
      ) : (
        // TODO: open the live-chat widget here when the chat service is connected
        <button type="button" className={buttonClass}>{contact.button}</button>
      )}
    </div>
  )
}
