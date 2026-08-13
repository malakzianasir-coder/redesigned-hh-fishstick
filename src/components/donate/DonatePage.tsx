import { ContentHubPage } from '@/components/hub/ContentHubPage'
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
          kicker: 'Donate',
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
          kicker: 'Donate',
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
        {
          id: 'how-to-donate',
          kicker: 'Donate',
          heading: 'How to Donate',
          lede:
            'Online, mobile wallet, bank transfer, cheque, pick-up, and more — choose the method that is most convenient for you. Open How to Donate for step-by-step details and account information.',
          cta: { label: 'See donation methods', href: '/donate/how-to-donate' },
          cards: [],
        },
      ]}
      externals={[{ label: 'Zakat Calculator', href: '/donate/zakat' }]}
    >
      {content.zakatCalculator.enabled ? (
        <ZakatCalculatorSection
          heading={content.zakatCalculator.heading}
          body={content.zakatCalculator.body}
        />
      ) : null}
    </ContentHubPage>
  )
}
