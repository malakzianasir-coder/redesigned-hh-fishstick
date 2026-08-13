import Link from 'next/link'

import { CopyChip } from '@/components/donate/CopyChip'
import { BankAccountCard, QrPlaceholder } from '@/components/donate/DonationMethodPanels'
import { HowToDonateMethodIcon, HowToDonateMethodNav } from '@/components/donate/HowToDonateMethodNav'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import type { HowToDonateContent, HowToDonateMethod } from '@/lib/content/types'

type HowToDonateMethodContentProps = {
  hub: HowToDonateContent
  method: HowToDonateMethod
}

export function HowToDonateMethodContent({ hub, method }: HowToDonateMethodContentProps) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: 'How to Donate', href: '/donate/how-to-donate' },
          { label: method.title },
        ]}
      />
      <MarketingHeroSection hero={method.hero} />
      <HowToDonateMethodNav methods={hub.methods} activeSlug={method.slug} />

      {method.slug === 'online' ? <OnlineBody method={method} /> : null}
      {method.slug === 'mobile-wallet' ? <MobileWalletBody method={method} /> : null}
      {method.slug === 'bank-transfer' ? <BankTransferBody method={method} /> : null}
      {method.slug === 'meezan-app' ? <MeezanAppBody method={method} /> : null}
      {method.slug === 'cheque' ? <ChequeBody method={method} /> : null}
      {method.slug === 'pick-up' ? <PickUpBody method={method} /> : null}

      <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
          <BlockHeader kicker="Need another method?" title="Browse all ways to donate" />
          <Link href="/donate/how-to-donate" className="btn-ghost">
            Back to How to Donate
          </Link>
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}

function OnlineBody({ method }: { method: HowToDonateMethod }) {
  return (
    <section className="section-anchor bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader
          kicker="Process"
          title={method.shortTitle ?? method.title}
          lede={(method.body ?? []).join(' ')}
          cta={method.cta}
        />
      </div>
    </section>
  )
}

function MobileWalletBody({ method }: { method: HowToDonateMethod }) {
  const wallet = method.wallet
  if (!wallet) return null

  return (
    <section className="section-anchor bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        {method.intro ? (
          <BlockHeader kicker="Process" title={method.shortTitle ?? method.title} lede={method.intro} />
        ) : null}
        <article className="card flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:gap-10 lg:p-8">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <HowToDonateMethodIcon name="DeviceMobile" />
              </span>
              <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{wallet.provider}</h3>
            </div>
            <dl className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 border-b border-dark-gray/15 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-b14 text-dark-gray">Account Title</dt>
                <dd className="text-b14 font-semibold text-primary-blue">{wallet.accountTitle}</dd>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="text-b14 text-dark-gray">Till ID</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-h5M font-bold text-primary-red lg:text-h5">
                    {wallet.tillId}
                  </span>
                  <CopyChip value={wallet.tillId} label="Copy Till ID" />
                </dd>
              </div>
            </dl>
          </div>
          <QrPlaceholder note={wallet.qrNote} />
        </article>
      </div>
    </section>
  )
}

function BankTransferBody({ method }: { method: HowToDonateMethod }) {
  return (
    <section className="section-anchor bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader
          kicker="Process"
          title={method.shortTitle ?? method.title}
          lede={method.intro}
        />
        <div className="card-grid card-grid--3">
          {(method.bankAccounts ?? []).map((account) => (
            <BankAccountCard key={account.title} account={account} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MeezanAppBody({ method }: { method: HowToDonateMethod }) {
  return (
    <>
      <section className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Process"
            title={method.shortTitle ?? method.title}
            lede={method.intro}
          />
          <div>
            {method.categoriesHeading ? (
              <p className="mb-4 text-center text-b14 font-semibold text-primary-blue">
                {method.categoriesHeading}
              </p>
            ) : null}
            <div className="card-grid card-grid--2">
              {(method.categories ?? []).map((category) => (
                <article key={category.title} className="card-interactive flex flex-col gap-3 p-6">
                  <span className="icon-tile">
                    <HowToDonateMethodIcon
                      name={category.title.startsWith('Zakat') ? 'MoonStars' : 'Heart'}
                    />
                  </span>
                  <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{category.title}</h3>
                  <p className="text-b14 leading-[150%] text-primary-blue/85">{category.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {method.qr ? (
        <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <BlockHeader
              kicker="QR Code"
              title={method.qr.heading}
              lede={method.qr.body}
            />
            <div className="flex justify-center">
              <QrPlaceholder note={method.qr.placeholderNote} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

function ChequeBody({ method }: { method: HowToDonateMethod }) {
  return (
    <section className="section-anchor bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker="Process" title={method.shortTitle ?? method.title} lede={method.intro} />
        <article className="card mx-auto flex max-w-3xl flex-col gap-6 p-6 lg:p-8">
          <p className="text-center text-b16 leading-[150%] text-primary-blue/85">
            Donations may also be made through cheque or bank draft payable to:{' '}
            <strong className="font-semibold text-primary-blue">{method.payableTo}</strong>
          </p>
          <div className="rounded-2xl border border-dark-gray/15 bg-whitebg p-5 text-center">
            <p className="field-label-text mb-2">Address</p>
            <address className="not-italic text-b16 leading-[150%] text-primary-blue">
              {(method.addressLines ?? []).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          {method.footer ? (
            <p className="text-center text-b14 leading-[150%] text-primary-blue/85">{method.footer}</p>
          ) : null}
        </article>
      </div>
    </section>
  )
}

function PickUpBody({ method }: { method: HowToDonateMethod }) {
  return (
    <section className="section-anchor bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader
          kicker="Process"
          title={method.shortTitle ?? method.title}
          lede={method.intro}
        />
        {method.itemsIntro ? (
          <p className="mx-auto max-w-3xl text-center text-b16 font-semibold text-primary-blue">
            {method.itemsIntro}
          </p>
        ) : null}
        <div className="card-grid card-grid--3">
          {(method.items ?? []).map((item) => (
            <article key={item} className="card flex items-start gap-3 p-5">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary-red" aria-hidden />
              <p className="text-b14 font-semibold leading-[150%] text-primary-blue">{item}</p>
            </article>
          ))}
        </div>
        {method.arrange ? (
          <p className="mx-auto max-w-3xl text-center text-b16 leading-[150%] text-primary-blue/85">
            {method.arrange}
          </p>
        ) : null}
        {method.closing ? (
          <p className="mx-auto max-w-3xl text-center text-b18 font-semibold leading-[150%] text-primary-blue">
            {method.closing}
          </p>
        ) : null}
      </div>
    </section>
  )
}
