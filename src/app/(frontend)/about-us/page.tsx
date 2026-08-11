import type { Metadata } from 'next'

import { ContentHubPage } from '@/components/hub/ContentHubPage'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { getAboutUs } from '@/lib/content/loaders'

const page = getAboutUs()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function AboutUsPage() {
  return (
    <ContentHubPage
      title={page.title}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: page.title }]}
      hero={page.hero}
      groups={page.groups}
      externals={page.externals}
    >
      <MarketingSupportCTA />
    </ContentHubPage>
  )
}
