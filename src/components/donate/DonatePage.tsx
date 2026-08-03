import { MediumHero } from '@/components/heros/MediumHero'
import { WaysToGiveSection } from '@/components/home/WaysToGiveSection'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
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
      <MediumHero hero={content.hero} />
      <JumpNav links={content.jumpLinks} />
      <DonationCauseGrid
        id="ways-to-give"
        kicker="Ways to Give"
        heading="Choose How You Give"
        lede="Zakat, Sadaqah, general donations, and seasonal giving — each supports free care for deserving patients."
        causes={content.givingTypes}
        background="whitebg"
      />
      <DonationCauseGrid
        id="what-you-can-support"
        kicker="What You Can Support"
        heading="Support Programs & Projects"
        causes={content.supportCauses}
        background="white"
      />
      <WaysToGiveSection
        content={content.waysToGive}
        sectionId="how-to-donate"
        hideBlockHeaderCta
      />
      {content.receiptsNote ? (
        <section className="border-t border-dark-gray/15 bg-whitebg">
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="card bg-white p-6 lg:p-8">
              <p className="text-b16 text-primary-blue/85">{content.receiptsNote}</p>
              <p className="mt-4 text-b14 text-primary-blue/70">
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
          </div>
        </section>
      ) : null}
      {content.zakatCalculator.enabled ? (
        <ZakatCalculatorSection
          heading={content.zakatCalculator.heading}
          body={content.zakatCalculator.body}
        />
      ) : null}
      <MarketingSupportCTA id="support-cta" />
    </article>
  )
}
