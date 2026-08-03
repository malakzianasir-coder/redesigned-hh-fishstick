import { MediumHero } from '@/components/heros/MediumHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
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
      <MediumHero hero={page.hero} />
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
