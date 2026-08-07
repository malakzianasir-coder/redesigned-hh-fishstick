import Link from 'next/link'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import { toMarketingHero } from '@/lib/content/toMarketingHero'
import type { DonateHubContent, DonationCauseRecord } from '@/lib/content/types'

import { renderDonateSection } from './renderDonateSection'
import { ZakatCalculatorSection } from './ZakatCalculatorSection'

type DonationCauseContentProps = {
  cause: DonationCauseRecord
  donateHub: DonateHubContent
}

/** MarketingIconName keys for hero placeholders — keep in sync with marketingIcons. */
const CAUSE_HERO_ICONS: Record<string, string> = {
  zakat: 'MoonStars',
  general: 'Heart',
  sadaqah: 'HandsPraying',
  'eidi-fitrana': 'Gift',
  'donate-a-meal': 'HandHeart',
  'donate-in-kind': 'Package',
  'sponsor-a-patient': 'UserCircleGear',
  'sponsor-free-surgeries': 'HandHeart',
  'support-a-project': 'Buildings',
}

const DEFAULT_CTA = {
  type: 'cta' as const,
  kicker: 'Support Our Mission',
  heading: 'Help Us Keep Care Within Reach for Every Patient',
  body: 'Your donation supports free treatment, medicines, and welfare programs for deserving patients — fulfilling our mission that financial hardship never stands in the way of care.',
  button: { label: 'Donate Now', href: '/donate' },
}

export function DonationCauseContent({ cause }: DonationCauseContentProps) {
  const showZakatCalculator = Boolean(cause.zakatCalculator?.enabled)
  const hero = toMarketingHero(cause.hero, CAUSE_HERO_ICONS[cause.slug])
  const hasCta = cause.sections.some((section) => section.type === 'cta')
  const sections =
    hasCta || showZakatCalculator ? cause.sections : [...cause.sections, DEFAULT_CTA]

  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: cause.title },
        ]}
      />
      <MarketingHeroSection hero={hero} />
      {cause.jumpLinks && cause.jumpLinks.length > 0 ? <JumpNav links={cause.jumpLinks} /> : null}
      {sections.map(renderDonateSection)}
      {showZakatCalculator && cause.zakatCalculator ? (
        <ZakatCalculatorSection
          heading={cause.zakatCalculator.heading}
          body={cause.zakatCalculator.body}
        />
      ) : null}
      <section id="how-to-donate" className="section-anchor border-t border-dark-gray/15 bg-whitebg">
        <div className="container mx-auto flex flex-col items-center gap-6 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            className="w-full max-w-3xl"
            kicker="How to Donate"
            title={`Support ${cause.title}`}
            lede="Choose the donation method that is most convenient for you."
          />
          <Link href="/donate/how-to-donate" className="btn-primary">
            View donation methods
          </Link>
        </div>
      </section>
      {showZakatCalculator ? <MarketingSupportCTA /> : null}
    </article>
  )
}
