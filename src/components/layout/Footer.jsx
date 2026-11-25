import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import logo from '@/assets/logos/logo.svg'
import { footerColumns } from '@/config/site'

const socials = [Facebook, Twitter, Instagram, Linkedin, Youtube]

export default function Footer() {
  // Figma: 1240 x 466, radius 30, border #C6C6C6, inner padding ~86 / 88
  return (
    <footer className="mx-auto mt-8 max-w-[1240px] px-4 pb-10 md:px-6 xl:px-0">
      <div className="rounded-[30px] border border-[#C6C6C6]/70 bg-white px-6 pt-10 md:px-10 lg:px-[86px] lg:pt-[88px]">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:min-h-[309px] xl:grid-cols-[335px_176px_164px_198px_1fr] xl:gap-0">
          {/* Brand */}
          <div>
            <img src={logo} alt="Mobiyantra" className="h-[36.36px] w-auto" />
            <p className="mt-4 text-xs text-slate-500">Fly Anywhere Across <span className="text-brand">India</span></p>
            <div className="mt-6 flex gap-5 text-brand">
              {socials.map((Icon, i) => <a key={i} href="#" aria-label="Social link"><Icon size={14} /></a>)}
            </div>
          </div>

          {footerColumns.map((c) => (
            <div key={c.title} className="lg:mt-[17px]">
              <h3 className="text-[15px] font-bold leading-[18px]">{c.title}</h3>
              <ul className="mt-[30px] space-y-[18px] text-[13px] leading-[15px] text-slate-500">
                {c.links.map((l) => <li key={l}><a href="#" className="hover:text-brand">{l}</a></li>)}
              </ul>
            </div>
          ))}

          {/* Contacts */}
          <div className="lg:mt-[17px]">
            <h3 className="text-[15px] font-bold leading-[18px]">Contacts us</h3>
            <ul className="mt-[30px] space-y-[18px] text-[13px] leading-[15px] text-slate-500">
              <li className="flex items-center gap-2"><Mail size={13} className="text-navy" /> contact@company.com</li>
              <li className="flex items-center gap-2"><Phone size={13} className="text-navy" /> (414) 687 – 5892</li>
              <li className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0 text-navy" /> <span>794 Mcallister St<br />San Francisco, 94102</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-200 pb-6 pt-7 text-[13px] text-slate-500 lg:mt-0 md:flex-row">
          <p>Copyright © 2026 Mobiyantra</p>
          <p>Good Journey Leads to Amazing Stories</p>
        </div>
      </div>
    </footer>
  )
}
