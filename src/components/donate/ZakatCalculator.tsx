'use client'

import {
  ArrowsClockwise,
  Buildings,
  CaretDown,
  ChartLineUp,
  CheckCircle,
  Coin,
  CoinVertical,
  Coins,
  CreditCard,
  HandCoins,
  Heart,
  Info,
  Package,
  PiggyBank,
  Receipt,
  Scales,
  Users,
  Wallet,
  Warning,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { NisabPrices } from '@/utilities/nisabPrices'

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const ZAKAT_RATE = 0.025 // 2.5%

const GOLD_NISAB_G = 87.48
const SILVER_NISAB_G = 612.36

// Fallback PKR per gram (used until daily rates load or if fetch fails)
const FALLBACK_GOLD_PKR_G = 21795
const FALLBACK_SILVER_PKR_G = 283

// Display conversion from PKR (API base). Rough FX; nisab itself is priced in PKR.
const CURRENCIES = {
  PKR: { symbol: 'Rs ', code: 'PKR', label: 'Pakistani Rupee', fromPkr: 1 },
  USD: { symbol: '$', code: 'USD', label: 'US Dollar', fromPkr: 1 / 278 },
  GBP: { symbol: '£', code: 'GBP', label: 'British Pound', fromPkr: 0.79 / 278 },
  EUR: { symbol: '€', code: 'EUR', label: 'Euro', fromPkr: 0.92 / 278 },
} as const

type CurrencyKey = keyof typeof CURRENCIES
type Basis = 'gold' | 'silver'

type AssetKey =
  | 'gold'
  | 'silver'
  | 'cash'
  | 'deposits'
  | 'loansOut'
  | 'investments'
  | 'stock'
  | 'rental'

type LiabilityKey = 'borrowed' | 'taxes' | 'wages'

const ASSET_FIELDS: { key: AssetKey; label: string; hint?: string; Icon: Icon }[] = [
  { key: 'gold', label: 'Value of gold', Icon: Coin },
  { key: 'silver', label: 'Value of silver', Icon: CoinVertical },
  { key: 'cash', label: 'Cash & bank balance', Icon: Wallet },
  { key: 'deposits', label: 'Saved for future purpose', hint: 'e.g. Hajj, education', Icon: PiggyBank },
  { key: 'loansOut', label: 'Loans given out', hint: 'Expected to be repaid', Icon: HandCoins },
  { key: 'investments', label: 'Investments & shares', Icon: ChartLineUp },
  { key: 'stock', label: 'Business stock value', Icon: Package },
  { key: 'rental', label: 'Rental / trade property', hint: 'Income-yielding', Icon: Buildings },
]

const LIABILITY_FIELDS: { key: LiabilityKey; label: string; hint?: string; Icon: Icon }[] = [
  { key: 'borrowed', label: 'Borrowed money / credit', hint: 'Due within 12 months', Icon: CreditCard },
  { key: 'taxes', label: 'Taxes, rent, bills due', hint: 'Overdue or immediately due', Icon: Receipt },
  { key: 'wages', label: 'Wages due to employees', Icon: Users },
]

const FAQS = [
  {
    q: 'What is Nisab?',
    a: 'Nisab is the minimum wealth a Muslim must possess for one lunar year before Zakat becomes obligatory. It is calculated from the value of 87.48g of gold or 612.36g of silver.',
  },
  {
    q: 'How is Zakat calculated?',
    a: 'Zakat is 2.5% of your net zakatable assets (total assets minus immediate liabilities), provided your net assets meet or exceed the Nisab threshold.',
  },
  {
    q: 'Which basis should I use — gold or silver?',
    a: 'Many scholars favour the silver basis as it is more beneficial to the poor (a lower threshold means more people pay Zakat). You may follow the opinion of your trusted scholar.',
  },
  {
    q: 'How often do I pay Zakat?',
    a: 'Zakat is due once per lunar year (hawl) on the anniversary of the date your wealth first reached Nisab.',
  },
]

/* ------------------------------------------------------------------ */
/*  Number helpers                                                     */
/* ------------------------------------------------------------------ */

const num = (v: string) => {
  if (!v) return 0
  const n = parseFloat(v)
  return Number.isFinite(n) && n >= 0 ? n : 0
}

const fmt = (n: number, symbol: string) =>
  `${symbol}${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function formatPriceUpdatedAt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type ZakatCalculatorProps = {
  initialPrices?: NisabPrices | null
}

export function ZakatCalculator({ initialPrices = null }: ZakatCalculatorProps) {
  const [currency, setCurrency] = useState<CurrencyKey>('PKR')
  const [basis, setBasis] = useState<Basis>('silver')

  const [goldPkrG, setGoldPkrG] = useState(initialPrices?.goldPkrPerGram ?? FALLBACK_GOLD_PKR_G)
  const [silverPkrG, setSilverPkrG] = useState(initialPrices?.silverPkrPerGram ?? FALLBACK_SILVER_PKR_G)
  const [priceUpdatedAt, setPriceUpdatedAt] = useState<string | null>(initialPrices?.updatedAt ?? null)
  const [priceStatus, setPriceStatus] = useState<'loading' | 'daily' | 'fallback'>(
    initialPrices ? 'daily' : 'loading',
  )

  const [assets, setAssets] = useState<Record<AssetKey, string>>({
    gold: '',
    silver: '',
    cash: '',
    deposits: '',
    loansOut: '',
    investments: '',
    stock: '',
    rental: '',
  })
  const [liabilities, setLiabilities] = useState<Record<LiabilityKey, string>>({
    borrowed: '',
    taxes: '',
    wages: '',
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch('/api/nisab-prices', { cache: 'no-store' })
        if (!res.ok) throw new Error('bad status')
        const data = (await res.json()) as NisabPrices
        if (cancelled) return
        if (typeof data.goldPkrPerGram === 'number' && typeof data.silverPkrPerGram === 'number') {
          setGoldPkrG(data.goldPkrPerGram)
          setSilverPkrG(data.silverPkrPerGram)
          if (data.updatedAt) setPriceUpdatedAt(data.updatedAt)
          setPriceStatus('daily')
          return
        }
        throw new Error('bad shape')
      } catch {
        if (!cancelled && !initialPrices) setPriceStatus('fallback')
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [initialPrices])

  const cur = CURRENCIES[currency]

  const nisabValue = useMemo(() => {
    const pkrPerGram = basis === 'gold' ? goldPkrG : silverPkrG
    const grams = basis === 'gold' ? GOLD_NISAB_G : SILVER_NISAB_G
    return pkrPerGram * grams * cur.fromPkr
  }, [basis, goldPkrG, silverPkrG, cur.fromPkr])

  const totalAssets = useMemo(
    () => (Object.keys(assets) as AssetKey[]).reduce((s, k) => s + num(assets[k]), 0),
    [assets],
  )

  const totalLiabilities = useMemo(
    () => (Object.keys(liabilities) as LiabilityKey[]).reduce((s, k) => s + num(liabilities[k]), 0),
    [liabilities],
  )

  const netAssets = totalAssets - totalLiabilities
  const aboveNisab = nisabValue > 0 && netAssets >= nisabValue
  const zakatDue = aboveNisab ? netAssets * ZAKAT_RATE : 0

  const updateAsset = (k: AssetKey, v: string) => setAssets((p) => ({ ...p, [k]: v }))
  const updateLiability = (k: LiabilityKey, v: string) => setLiabilities((p) => ({ ...p, [k]: v }))

  const reset = useCallback(() => {
    setAssets({
      gold: '',
      silver: '',
      cash: '',
      deposits: '',
      loansOut: '',
      investments: '',
      stock: '',
      rental: '',
    })
    setLiabilities({ borrowed: '', taxes: '', wages: '' })
  }, [])

  const donateHref =
    zakatDue > 0
      ? `/donate/zakat/donate?amount=${zakatDue.toFixed(2)}&currency=${cur.code}`
      : '/donate/zakat/donate'

  const summaryProps = {
    symbol: cur.symbol,
    totalAssets,
    totalLiabilities,
    netAssets,
    nisabValue,
    aboveNisab,
    zakatDue,
    donateHref,
    onReset: reset,
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      {/* Calculator */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="card p-6 shadow-e1 lg:col-span-8 lg:p-8"
          aria-label="Zakat calculation form"
        >
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-8 lg:gap-6">
            <div className="flex flex-col gap-2">
              <span className="field-label-text">Currency</span>
              <div className="relative">
                <select
                  aria-label="Select currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyKey)}
                  className="brand-select w-full appearance-none pr-10"
                >
                  {(Object.keys(CURRENCIES) as CurrencyKey[]).map((k) => (
                    <option key={k} value={k}>
                      {CURRENCIES[k].symbol.trim()} {CURRENCIES[k].code} — {CURRENCIES[k].label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary-blue/55">
                  <CaretDown size={16} weight="bold" aria-hidden />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="field-label-text">Nisab basis</span>
              <div className="grid grid-cols-2 gap-2 rounded-full bg-cardbg p-1">
                {(['gold', 'silver'] as Basis[]).map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBasis(b)}
                    aria-pressed={basis === b}
                    className={`min-h-[44px] rounded-full text-b14 font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2 ${
                      basis === b
                        ? 'bg-primary-blue text-white'
                        : 'text-primary-blue/70 hover:text-primary-blue'
                    }`}
                  >
                    {b === 'gold' ? 'Gold' : 'Silver'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-dark-gray/15 bg-primary-blue p-5 lg:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                  <Scales size={20} weight="duotone" aria-hidden />
                </span>
                <div>
                  <p className="text-b12 font-bold uppercase tracking-kicker text-white/55">
                    Nisab Threshold
                  </p>
                  <p className="text-b14 text-white/85">
                    {priceStatus === 'loading' && 'Loading rates…'}
                    {priceStatus === 'daily' && (
                      <>
                        Updated daily • {basis} basis
                        {priceUpdatedAt ? (
                          <>
                            {' '}
                            <span className="text-white/60">
                              ({formatPriceUpdatedAt(priceUpdatedAt)})
                            </span>
                          </>
                        ) : null}
                      </>
                    )}
                    {priceStatus === 'fallback' && `Estimated • ${basis} basis`}
                  </p>
                </div>
              </div>
              <p className="text-h5M font-bold leading-[120%] text-white lg:text-h4">
                {fmt(nisabValue, cur.symbol)}
              </p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-red/10 text-primary-red">
              <Coins size={18} weight="duotone" aria-hidden />
            </span>
            <h3 className="text-h6M font-bold leading-[120%] text-primary-blue lg:text-h5">
              Your Assets
            </h3>
          </div>
          <p className="mb-6 text-b14 leading-[150%] text-primary-blue/70">
            Zakatable wealth held for one lunar year.
          </p>

          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {ASSET_FIELDS.map((f) => (
              <NumberField
                key={f.key}
                id={`asset-${f.key}`}
                label={f.label}
                hint={f.hint}
                symbol={cur.symbol}
                Icon={f.Icon}
                value={assets[f.key]}
                onChange={(v) => updateAsset(f.key, v)}
              />
            ))}
          </div>

          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-red/10 text-primary-red">
              <Receipt size={18} weight="duotone" aria-hidden />
            </span>
            <h3 className="text-h6M font-bold leading-[120%] text-primary-blue lg:text-h5">
              Deductible Liabilities
            </h3>
          </div>
          <p className="mb-6 text-b14 leading-[150%] text-primary-blue/70">
            Money you owe that is due now or within the next 12 months.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {LIABILITY_FIELDS.map((f) => (
              <NumberField
                key={f.key}
                id={`liab-${f.key}`}
                label={f.label}
                hint={f.hint}
                symbol={cur.symbol}
                Icon={f.Icon}
                value={liabilities[f.key]}
                onChange={(v) => updateLiability(f.key, v)}
              />
            ))}
          </div>

          <div className="mt-8 lg:hidden">
            <SummaryPanel {...summaryProps} />
          </div>
        </form>

        <aside className="hidden lg:col-span-4 lg:block">
          <div className="lg:sticky lg:top-[calc(var(--header-h,80px)+16px)]">
            <SummaryPanel {...summaryProps} />
          </div>
        </aside>
      </div>

      {/* How it works */}
      <div className="flex flex-col gap-8">
        <BlockHeader
          kicker="Guidance"
          title="How your Zakat is calculated"
          lede="A transparent, four-step breakdown so you know exactly where the figure comes from."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: '01',
              t: 'Add your assets',
              d: 'Gold, silver, cash, savings, investments, stock and trade goods.',
            },
            {
              n: '02',
              t: 'Subtract liabilities',
              d: 'Debts and obligations due within the next 12 months.',
            },
            {
              n: '03',
              t: 'Compare to Nisab',
              d: 'If your net wealth meets or exceeds the threshold, Zakat is due.',
            },
            {
              n: '04',
              t: 'Pay 2.5%',
              d: 'Your Zakat is 2.5% of your net zakatable assets.',
            },
          ].map((s) => (
            <div key={s.n} className="card p-6 shadow-e1">
              <p className="text-b12 font-bold text-primary-red">{s.n}</p>
              <h4 className="mt-2 text-h6M font-bold leading-[120%] text-primary-blue lg:text-h6">{s.t}</h4>
              <p className="mt-2 text-b14 leading-[150%] text-primary-blue/85">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="flex flex-col gap-8">
        <BlockHeader kicker="Common questions" title="Zakat, explained" />

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i
            return (
              <div key={f.q} className="card overflow-hidden shadow-e1">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 p-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-red/40 lg:p-6"
                >
                  <span className="text-b16 font-bold text-primary-blue lg:text-b18">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-dark-gray/25 text-primary-blue transition-transform duration-300 ${
                      open ? 'rotate-180 border-primary-red bg-primary-red text-white' : ''
                    }`}
                  >
                    <CaretDown size={16} weight="bold" aria-hidden />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-b14 leading-[150%] text-primary-blue/85 lg:px-6 lg:pb-6 lg:text-b16">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-dark-gray/15 bg-redbg p-5 lg:p-6">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-red/10 text-primary-red">
            <Info size={18} weight="duotone" aria-hidden />
          </span>
          <p className="text-b14 leading-[150%] text-primary-blue/85">
            This calculator provides an estimate based on the Hanafi school and metal prices updated
            daily. For complex situations (businesses, agricultural produce, mining, etc.) please
            consult a qualified scholar.
            {priceUpdatedAt ? ` Rates last updated ${formatPriceUpdatedAt(priceUpdatedAt)}.` : ''}
            {priceStatus === 'fallback'
              ? ' Estimated values are shown because current rates could not be loaded.'
              : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function NumberField({
  id,
  label,
  hint,
  symbol,
  Icon: FieldIcon,
  value,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  symbol: string
  Icon: Icon
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-center gap-2 text-b14 font-semibold text-primary-blue">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cardbg text-primary-blue/70">
          <FieldIcon size={14} weight="duotone" aria-hidden />
        </span>
        <span>{label}</span>
      </label>
      {hint ? <span className="-mt-1 text-b12 text-dark-gray">{hint}</span> : null}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-b16 font-bold text-primary-blue/55">
          {symbol.trim()}
        </span>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          placeholder="0.00"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="donation-field pl-9"
          aria-label={`${label} in ${symbol.trim()}`}
        />
      </div>
    </div>
  )
}

function SummaryPanel({
  symbol,
  totalAssets,
  totalLiabilities,
  netAssets,
  nisabValue,
  aboveNisab,
  zakatDue,
  donateHref,
  onReset,
}: {
  symbol: string
  totalAssets: number
  totalLiabilities: number
  netAssets: number
  nisabValue: number
  aboveNisab: boolean
  zakatDue: number
  donateHref: string
  onReset: () => void
}) {
  return (
    <div className="rounded-2xl border border-dark-gray/15 bg-primary-blue p-6 text-white shadow-e2 lg:p-7">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
          <Scales size={18} weight="duotone" aria-hidden />
        </span>
        <h3 className="text-h6M font-bold leading-[120%] lg:text-h6">Your Summary</h3>
      </div>

      <div className="flex flex-col gap-3 text-b14">
        <Row label="Total assets" value={fmt(totalAssets, symbol)} />
        <Row label="Total liabilities" value={`– ${fmt(totalLiabilities, symbol)}`} muted />
        <div className="my-1 h-px bg-white/15" />
        <Row label="Net zakatable wealth" value={fmt(netAssets, symbol)} strong />
        <Row label="Nisab threshold" value={fmt(nisabValue, symbol)} muted />
      </div>

      <div className="mt-5">
        {aboveNisab ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1.5 text-b14 font-semibold text-success">
            <CheckCircle size={16} weight="fill" aria-hidden />
            Above Nisab — Zakat due
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-b14 font-semibold text-white/85">
            <Warning size={16} weight="fill" aria-hidden />
            Below Nisab — no Zakat due
          </span>
        )}
      </div>

      <div className="mt-5 rounded-xl bg-white p-5 text-center">
        <p className="field-label-text">
          Zakat due (2.5%)
        </p>
        <p className="mt-1 text-h2M font-bold leading-[110%] text-primary-blue lg:text-h2">
          {fmt(zakatDue, symbol)}
        </p>
      </div>

      <p className="mt-4 flex items-start gap-2 text-b12 leading-[150%] text-white/70">
        <Info size={14} weight="duotone" aria-hidden className="mt-0.5 shrink-0" />
        <span>
          Zakat is obligatory on every adult Muslim whose wealth reaches the Nisab threshold and has
          been held for one full lunar year.
        </span>
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={donateHref}
          className="btn-primary flex-1"
        >
          <Heart size={18} weight="fill" aria-hidden />
          Pay Zakat
        </Link>
        <button type="button" onClick={onReset} className="btn-on-dark-ghost">
          <ArrowsClockwise size={16} weight="bold" aria-hidden />
          Reset
        </button>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string
  value: string
  muted?: boolean
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={muted ? 'text-white/55' : 'text-white/85'}>{label}</span>
      <span
        className={`font-semibold ${strong ? 'text-b18 text-white' : muted ? 'text-white/70' : 'text-white'}`}
      >
        {value}
      </span>
    </div>
  )
}

export default ZakatCalculator
