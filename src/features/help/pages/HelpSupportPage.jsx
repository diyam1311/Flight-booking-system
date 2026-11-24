import { useMemo, useState } from 'react'
import { BookOpen } from 'lucide-react'
import HelpSearch from '../components/HelpSearch'
import SectionTitle from '../components/SectionTitle'
import TopicCard from '../components/TopicCard'
import ManageBookingBanner from '../components/ManageBookingBanner'
import ContactSection from '../components/ContactSection'
import FaqCard from '../components/FaqCard'
import { useHelpContent } from '../hooks/useHelpContent'

// Keep only the items whose text contains what the user typed.
const matches = (query, ...texts) => texts.some((t) => t.toLowerCase().includes(query))

// Split a list in two columns: the first half on the left, the rest on the right.
const splitInTwo = (list) => {
  const half = Math.ceil(list.length / 2)
  return [list.slice(0, half), list.slice(half)]
}

// "Help & Support" page (Figma frame 1440 wide). Navbar + Footer come from MainLayout.
// The search box filters the topics and the FAQs while you type.
export default function HelpSupportPage() {
  const { topics, faqs, contacts } = useHelpContent()
  const [query, setQuery] = useState('')
  const [openTopic, setOpenTopic] = useState(null) // id of the topic that shows its answer
  const [openFaq, setOpenFaq] = useState(null)     // id of the FAQ that shows its answer

  const q = query.trim().toLowerCase()
  const shownTopics = useMemo(() => topics.filter((t) => matches(q, t.title, t.summary, t.answer)), [topics, q])
  const shownFaqs = useMemo(() => faqs.filter((f) => matches(q, f.question, f.answer)), [faqs, q])

  const [topicsLeft, topicsRight] = splitInTwo(shownTopics)
  const [faqsLeft, faqsRight] = splitInTwo(shownFaqs)
  const nothingFound = q && shownTopics.length === 0 && shownFaqs.length === 0

  // clicking the open item again closes it
  const toggle = (setOpen) => (id) => setOpen((current) => (current === id ? null : id))

  return (
    <main className="px-4 pb-10 pt-10 lg:pt-[65px]">
      <div className="mx-auto max-w-[1240px]">
        {/* Figma: title block 1240 x 90, 14 gap */}
        <h1 className="text-[32px] font-semibold leading-[1.1] lg:text-[45px] lg:leading-[49px]">Welcome to the Help Center</h1>
        <p className="mt-[14px] text-base leading-6 lg:text-[18px] lg:leading-[27px]">Find quick answers and get help with your journey.</p>

        <HelpSearch value={query} onChange={setQuery} className="mt-[35px]" />

        {nothingFound ? (
          <p className="mt-[48px] rounded-[20px] bg-white p-8 text-center text-sm text-slate-600">
            No results for &ldquo;{query}&rdquo;. Try another word, or contact our support team below.
          </p>
        ) : (
          <>
            {shownTopics.length > 0 && (
              <>
                <SectionTitle icon={BookOpen} title="Popular Help Topics" subtitle="Quick answers to the most common questions." className="mt-[48px]" />
                <div className="mt-[26px] grid items-start gap-6 lg:grid-cols-[608px_608px]">
                  <TopicCard topics={topicsLeft} openId={openTopic} onToggle={toggle(setOpenTopic)} />
                  {topicsRight.length > 0 && <TopicCard topics={topicsRight} openId={openTopic} onToggle={toggle(setOpenTopic)} />}
                </div>
              </>
            )}
          </>
        )}

        {/* Figma: banner 595.78 wide, 36 gap, contact block 608 wide */}
        <div className="mt-[38px] flex flex-col gap-9 lg:flex-row lg:items-start">
          <ManageBookingBanner />
          <ContactSection contacts={contacts} />
        </div>

        {shownFaqs.length > 0 && (
          <>
            <SectionTitle title="Frequently Asked Questions" subtitle="Find quick answers to common queries." className="mt-[53px]" />
            <div className="mt-[26px] flex flex-col items-start gap-6 lg:flex-row lg:gap-[26px]">
              <FaqCard faqs={faqsLeft} openId={openFaq} onToggle={toggle(setOpenFaq)} />
              {faqsRight.length > 0 && <FaqCard faqs={faqsRight} openId={openFaq} onToggle={toggle(setOpenFaq)} />}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
