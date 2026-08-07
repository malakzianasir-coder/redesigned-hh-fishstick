import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { toMarketingHero } from '@/lib/content/toMarketingHero'
import type { PatientCareHubRecord } from '@/lib/content/types'

import { PatientCareHubSection } from './PatientCareHubSection'

export function PatientCareHubContent({ page }: { page: PatientCareHubRecord }) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: page.title },
        ]}
      />
      <MarketingHeroSection hero={toMarketingHero(page.hero)} />
      <JumpNav links={page.jumpLinks} />
      <PatientCareHubSection
        kicker={page.hub.kicker}
        heading={page.hub.heading}
        lede={page.hub.lede}
        groups={page.hub.groups}
      />
      <MarketingSupportCTA />
    </article>
  )
}
