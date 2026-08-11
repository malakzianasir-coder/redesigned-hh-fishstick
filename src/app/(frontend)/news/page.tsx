import type { Metadata } from 'next'

import { NewsHubContent } from '@/components/hub/NewsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import {
  getFeaturedNews,
  getNewsCategories,
  getNewsHub,
  getNewsPage,
} from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'News | Hijaz Hospital',
  description: 'Latest news, announcements, and updates from Hijaz Hospital.',
}

type Args = {
  searchParams: Promise<{ category?: string }>
}

export default async function NewsPage({ searchParams }: Args) {
  const { category } = await searchParams
  const hub = getNewsHub()
  const result = getNewsPage(1, undefined, category)
  const featured = getFeaturedNews(2)

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
      <NewsHubContent
        hub={hub}
        result={result}
        categories={getNewsCategories()}
        featured={featured}
        activeCategory={category}
      />
    </>
  )
}
