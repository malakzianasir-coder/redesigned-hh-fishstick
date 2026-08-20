import type { Metadata } from 'next'

import { ContentHubPage } from '@/components/hub/ContentHubPage'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { getAboutUs } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function generateMetadata(): Promise<Metadata> {
  const fallback = getAboutUs()
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    })
    const doc = res.docs?.[0]
    if (doc) {
      return {
        title: `${doc.title || fallback.title} | Hijaz Hospital`,
        description: doc.description || fallback.description,
      }
    }
  } catch (e) {}

  return {
    title: `${fallback.title} | Hijaz Hospital`,
    description: fallback.description,
  }
}

export default async function AboutUsPage() {
  let page = getAboutUs()

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: 'about-us' } },
      limit: 1,
    })
    const doc = res.docs?.[0]
    if (doc) {
      page = (doc.legacyRawData as any) || {
        ...page,
        title: doc.title || page.title,
        description: doc.description || page.description,
        hero: doc.legacyHero || page.hero,
        groups: doc.legacyGroups || page.groups,
        externals: doc.legacyExternals || page.externals,
      }
    }
  } catch (e) {}

  return (
    <ContentHubPage
      title={page.title}
      breadcrumb={[{ label: 'Home', href: '/' }, { label: page.title }]}
      hero={page.hero as any}
      groups={page.groups as any}
      externals={page.externals as any}
    >
      <MarketingSupportCTA />
    </ContentHubPage>
  )
}
