'use client'

import {
  ArrowRight,
  Coins,
  Copy,
  DeviceMobile,
  EnvelopeOpen,
  PersonArmsSpread,
  QrCode,
  Truck,
} from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { HomeWaysToGive } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type WaysToGiveSectionProps = {
  content: HomeWaysToGive
}

type TabId = 'online' | 'jazzcash' | 'bank' | 'other'

const OTHER_WAY_ICONS = {
  EnvelopeOpen,
  PersonArmsSpread,
  Coins,
  Truck,
  DeviceMobile,
  QrCode,
}

function CopyChip({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="copy-chip">
      <Copy size={14} weight="bold" />
      {copied ? 'Copied' : label ?? 'Copy'}
    </button>
  )
}

export function WaysToGiveSection({ content }: WaysToGiveSectionProps) {
  const [activeTab, setActiveTab] = useState<TabId>('online')
  const [selectedAmount, setSelectedAmount] = useState(content.online.amounts[0]?.value ?? '500')

  const tabs: { id: TabId; label: string }[] = [
    { id: 'online', label: 'Donate Online' },
    { id: 'jazzcash', label: 'JazzCash Till' },
    { id: 'bank', label: 'Bank Transfer' },
    { id: 'other', label: 'Other Ways' },
  ]

  return (
    <section id="ways-to-give" className="section-anchor border-t border-dark-gray/15 bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader
          kicker={content.kicker}
          title={content.heading}
          lede={content.lede}
          cta={content.cta}
        />

        <div className="ways-rail" role="tablist" aria-label="Donation methods">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={cn('chip', activeTab === tab.id && 'is-active')}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'online' && (
          <div className="ways-panel is-active" role="tabpanel">
            <div className="card flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:gap-8 lg:p-8">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="kicker">{content.online.kicker}</p>
                <h3 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">
                  {content.online.heading}
                </h3>
                <p className="text-b14 leading-[150%] text-primary-blue/85">{content.online.body}</p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Suggested amounts">
                  {content.online.amounts.map((amount) => (
                    <button
                      key={amount.value}
                      type="button"
                      className={cn('ways-amount chip', selectedAmount === amount.value && 'is-active')}
                      onClick={() => setSelectedAmount(amount.value)}
                    >
                      {amount.label}
                    </button>
                  ))}
                </div>
                <Link href={content.online.ctaHref} className="btn-primary min-h-[44px] px-5 text-b14">
                  {content.online.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jazzcash' && (
          <div className="ways-panel is-active" role="tabpanel">
            <article className="card till-hero p-6 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                <div className="flex flex-1 flex-col gap-3">
                  <p className="kicker">{content.jazzcash.kicker}</p>
                  <h3 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">
                    {content.jazzcash.heading}
                  </h3>
                  <p className="text-b14 leading-[150%] text-primary-blue/85">{content.jazzcash.body}</p>
                  <dl className="mt-2 flex flex-col gap-3">
                    <div className="flex flex-col gap-2 border-b border-dark-gray/15 pb-3 sm:flex-row sm:items-center sm:justify-between">
                      <dt className="text-b14 text-dark-gray">Account Title</dt>
                      <dd className="text-b14 font-semibold text-primary-blue">{content.jazzcash.accountTitle}</dd>
                    </div>
                    <div className="flex flex-col gap-2">
                      <dt className="text-b14 text-dark-gray">Till ID</dt>
                      <dd className="flex flex-wrap items-center gap-3">
                        <span className="till-id">{content.jazzcash.tillId}</span>
                        <CopyChip value={content.jazzcash.tillId} label="Copy Till ID" />
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-dark-gray/15 bg-whitebg p-5">
                  <div
                    className="flex h-36 w-36 items-center justify-center rounded-xl bg-cardbg text-primary-blue/40"
                    aria-hidden="true"
                  >
                    <QrCode size={64} weight="duotone" />
                  </div>
                  <p className="max-w-[160px] text-center text-b12 text-dark-gray">{content.jazzcash.qrNote}</p>
                </div>
              </div>
            </article>
          </div>
        )}

        {activeTab === 'bank' && (
          <div className="ways-panel is-active" role="tabpanel">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.bankAccounts.map((account) => (
                <article key={account.title} className="card ways-bank-card flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <div className="bank-logo">
                      {account.logo ? (
                        <Image
                          src={account.logo}
                          alt={account.bank}
                          width={56}
                          height={36}
                          className="max-h-[36px] max-w-[56px] object-contain"
                        />
                      ) : (
                        <span className="text-b12 font-bold text-primary-blue">{account.bank}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{account.title}</h3>
                      <p className="text-b12 text-dark-gray">{account.bank}</p>
                    </div>
                  </div>
                  <dl className="flex flex-col gap-2 text-b14">
                    {account.fields.map((field) => (
                      <div
                        key={field.label}
                        className="flex items-center justify-between gap-3 border-b border-dark-gray/15 pb-2"
                      >
                        <dt className="text-dark-gray">{field.label}</dt>
                        <dd className="flex items-center gap-2 text-right font-mono text-primary-blue">
                          {field.value}
                          {field.copyValue ? <CopyChip value={field.copyValue} /> : null}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'other' && (
          <div className="ways-panel is-active" role="tabpanel">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.otherWays.map((way) => {
                const IconComponent = OTHER_WAY_ICONS[way.icon as keyof typeof OTHER_WAY_ICONS]
                return (
                  <Link
                    key={way.title}
                    href={way.href ?? '/donate'}
                    className="card-interactive group flex flex-col gap-3 p-6"
                  >
                    {IconComponent ? (
                      <span className="icon-tile">
                        <IconComponent size={22} weight="duotone" />
                      </span>
                    ) : null}
                    <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                      {way.title}
                    </h3>
                    <p className="text-b14 leading-[150%] text-primary-blue/85">{way.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                      {way.linkLabel ?? 'View details'}
                      <ArrowRight
                        size={16}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-center text-b14 leading-[150%] text-primary-blue/70 lg:text-start">
          Need assistance? Donations Office — UAN:{' '}
          <a
            href="tel:+9242111044529"
            className="font-semibold text-primary-red transition-colors duration-200 hover:text-primary-blue"
          >
            {content.contact.uan}
          </a>{' '}
          · Phone:{' '}
          <a
            href="tel:+923214045125"
            className="font-semibold text-primary-red transition-colors duration-200 hover:text-primary-blue"
          >
            {content.contact.phone}
          </a>{' '}
          ·{' '}
          <a
            href={`mailto:${content.contact.email}`}
            className="font-semibold text-primary-red transition-colors duration-200 hover:text-primary-blue"
          >
            {content.contact.email}
          </a>
        </p>
      </div>
    </section>
  )
}
