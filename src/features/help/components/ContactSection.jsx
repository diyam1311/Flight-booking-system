import ContactCard from './ContactCard'

// "Still need help?" heading + the three contact cards. Figma: 608 wide.
export default function ContactSection({ contacts }) {
  return (
    <section className="lg:-mt-[5px] lg:w-[608px]">
      <h2 className="text-[20px] font-semibold leading-6">Still need help?</h2>
      <p className="mt-2 text-xs leading-[15px] text-slate-600">Our support team is here for you. Choose your preferred way to get in touch.</p>
      <div className="mt-[21px] flex flex-wrap gap-4">
        {contacts.map((c) => <ContactCard key={c.id} contact={c} />)}
      </div>
    </section>
  )
}
