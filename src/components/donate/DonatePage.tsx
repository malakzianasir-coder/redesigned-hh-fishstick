import { ContentHubPage } from '@/components/hub/ContentHubPage'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import type { DonateHubContent } from '@/lib/content/types'

import { ZakatCalculatorSection } from './ZakatCalculatorSection'

export function DonatePage({ content }: { content: DonateHubContent }) {
  return (
    <ContentHubPage
      title={content.title}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: content.title }]}
      hero={content.hero}
      groups={[
        {
          id: 'ways-to-give',
          kicker: 'Ways to Give',
          heading: 'Ways to Give',
          lede: 'Explore the different ways you can support our mission and make a lasting impact.',
          cards: content.givingTypes.map((cause) => ({
            slug: cause.slug,
            title: cause.title,
            excerpt: cause.excerpt,
            icon: cause.icon,
            href: cause.href,
            linkLabel: cause.linkLabel ?? cause.title,
            meta: cause.meta,
          })),
        },
        {
          id: 'what-you-can-support',
          kicker: 'What You Can Support',
          heading: 'What You Can Support',
          lede: 'From nourishing meals and essential supplies to patient sponsorships, free surgeries, and hospital projects.',
          cta: { label: 'View all options', href: '/donate/what-you-can-support' },
          cards: content.supportCauses.map((cause) => ({
            slug: cause.slug,
            title: cause.title,
            excerpt: cause.excerpt,
            icon: cause.icon,
            href: cause.href,
            linkLabel: cause.linkLabel ?? cause.title,
            meta: cause.meta,
          })),
        },
      ]}
      externals={[
        { label: 'How to Donate', href: '/donate/how-to-donate' },
        { label: 'Zakat Calculator', href: '/donate/zakat' },
      ]}
    >
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
    </ContentHubPage>
  )
}
