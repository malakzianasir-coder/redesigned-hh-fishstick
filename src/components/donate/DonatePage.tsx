import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import type { DonateHubContent } from '@/lib/content/types'

import { DonationCauseGrid } from './DonationCauseGrid'
import { ZakatCalculatorSection } from './ZakatCalculatorSection'

export function DonatePage({ content }: { content: DonateHubContent }) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: content.title },
        ]}
      />
      <MarketingHeroSection hero={content.hero} />
      <JumpNav links={content.jumpLinks} />
      <DonationCauseGrid
        id="ways-to-give"
        kicker="Ways to Give"
        heading="Ways to Give"
        lede="Explore the different ways you can support our mission and make a lasting impact."
        causes={content.givingTypes}
        background="whitebg"
      />
      <DonationCauseGrid
        id="what-you-can-support"
        kicker="What You Can Support"
        heading="What You Can Support"
        lede="From nourishing meals and essential supplies to patient sponsorships, free surgeries, and hospital projects."
        causes={content.supportCauses}
        background="white"
        cta={{ label: 'View all options', href: '/donate/what-you-can-support' }}
      />
      <div id="how-to-donate" className="section-anchor">
        <GlobalCtaSection
          section={{
            type: 'cta',
            kicker: 'How to Donate',
            heading: 'How to Donate',
            body: 'Supporting Hijaz Hospital Trust is simple, secure, and impactful. Your contribution helps us provide quality healthcare to deserving patients and strengthens our mission of serving humanity with compassion and dignity. Choose the donation method that is most convenient for you.',
            button: { label: 'View donation methods', href: '/donate/how-to-donate' },
          }}
        />
      </div>
      {content.zakatCalculator.enabled ? (
        <ZakatCalculatorSection
          heading={content.zakatCalculator.heading}
          body={content.zakatCalculator.body}
        />
      ) : null}
    </article>
  )
}
