import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { NewsHubContent } from '@/components/hub/NewsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getNewsHub } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { DEFAULT_ARTICLE_PAGE_SIZE, paginate } from '@/lib/content/pagination'

type Args = {
  params: Promise<{ pageNumber: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'news',
    limit: 1000,
    pagination: false,
  })
  
  const totalItems = result.docs.length
  const totalPages = Math.ceil(totalItems / DEFAULT_ARTICLE_PAGE_SIZE)
  
  return Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) => page > 1)
    .map((page) => ({ pageNumber: String(page) }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { pageNumber } = await params
  return {
    title: `News — Page ${pageNumber} | Hijaz Hospital`,
  }
}

export default async function NewsPaginatedPage({ params, searchParams }: Args) {
  const { pageNumber } = await params
  const { category } = await searchParams
  const page = Number(pageNumber)

  if (!Number.isFinite(page) || page < 1) {
    notFound()
  }

  const hubStatic = getNewsHub()
  
  const payload = await getPayload({ config: configPromise })
  const resultData = await payload.find({
    collection: 'news',
    limit: 1000,
    pagination: false,
    sort: '-publishedAt',
  })
  
  const allArticles = resultData.docs.map(doc => ({
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
  const result = paginate(filteredArticles, page, DEFAULT_ARTICLE_PAGE_SIZE)

  if (page > result.totalPages && result.totalPages > 0) {
    notFound()
  }
  
  const featured = page === 1 ? allArticles.filter(a => a.featured).slice(0, 2) : []

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
      <NewsHubContent
        hub={hubStatic}
        result={result as any}
        categories={categories}
        featured={featured as any}
        activeCategory={category}
      />
    </>
  )
}
