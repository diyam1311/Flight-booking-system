import { useState } from 'react'
import { Info, Search } from 'lucide-react'
import { BANKS } from '../data/paymentOptions'

// Net Banking: search box + bank tiles (Figma: search 38 high, tiles 80 high, 13 between rows).
// Clicking a tile selects the bank.
export default function NetBankingPanel({ bank, error, onPick }) {
  const [search, setSearch] = useState('')
  const shown = BANKS.filter((b) => b.name.toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div className="mt-[5px] pb-5">
      <div className="relative mr-[13px]">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your bank"
          className="h-[38px] w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-navy"
        />
      </div>

      {shown.length === 0 && <p className="mt-5 text-center text-xs text-slate-400">No bank found. Try another name.</p>}

      <div className="mt-5 grid grid-cols-2 gap-x-[3px] gap-y-[13px] sm:grid-cols-5">
        {shown.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onPick(b.id)}
            aria-pressed={b.id === bank}
            className={`flex h-[80px] flex-col items-center gap-[9px] rounded-[14px] border px-2 pt-[13px] text-center ${
              b.id === bank ? 'border-navy bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <span className={`grid h-7 w-7 place-items-center rounded-full text-[9px] font-bold text-white ${b.color}`}>{b.short}</span>
            <span className="text-[11px] font-medium leading-3">{b.name}</span>
          </button>
        ))}
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <p className="mr-[13px] mt-[17px] flex h-[39px] items-center gap-2 rounded-xl bg-blue-50 px-4 text-xs text-blue-600">
        <Info size={14} className="shrink-0" /> You will be redirected to your selected bank’s secure page to complete the payment.
      </p>
    </div>
  )
}
