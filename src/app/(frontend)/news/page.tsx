import type { Metadata } from 'next'

import { NewsHubContent } from '@/components/hub/NewsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getNewsHub } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { DEFAULT_ARTICLE_PAGE_SIZE, paginate } from '@/lib/content/pagination'

export const metadata: Metadata = {
  title: 'News | Hijaz Hospital',
  description: 'Latest news, announcements, and updates from Hijaz Hospital.',
}

type Args = {
  searchParams: Promise<{ category?: string }>
}

export default async function NewsPage({ searchParams }: Args) {
  const { category } = await searchParams
  const hubStatic = getNewsHub()
  
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'news',
    limit: 1000,
    pagination: false,
    sort: '-publishedAt',
  })
  
  const allArticles = result.docs.map(doc => ({
    slug: doc.slug!,
    title: doc.title,
    tagLine: doc.tagLine || undefined,
    shortDescription: doc.shortDescription || '',
    heroImage: doc.heroImage || undefined,
    content: (doc.legacyContent as any) || [],
    categories: (doc.categories as string[]) || [],
    tags: (doc.tags as string[]) || [],
    author: (doc.author as any) || undefined,
    publishedAt: doc.publishedAt || '',
    featured: doc.featured || false,
    meta: (doc.legacyMeta as any) || undefined,
  }))
  
  // Extract categories
  const categoriesSet = new Set<string>()
  allArticles.forEach(a => a.categories.forEach(c => categoriesSet.add(c)))
  const categories = Array.from(categoriesSet).sort()
  
  // Filter by category if provided
  const filteredArticles = category ? allArticles.filter(a => a.categories.includes(category)) : allArticles
  
  // Paginate
  const paginatedResult = paginate(filteredArticles, 1, DEFAULT_ARTICLE_PAGE_SIZE)
  
  // Featured
  const featured = allArticles.filter(a => a.featured).slice(0, 2)

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
      <NewsHubContent
        hub={hubStatic}
        result={paginatedResult as any}
        categories={categories}
        featured={featured as any}
        activeCategory={category}
      />
    </>
  )
}
