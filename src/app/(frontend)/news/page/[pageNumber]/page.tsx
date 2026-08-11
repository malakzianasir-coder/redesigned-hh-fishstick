import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { NewsHubContent } from '@/components/hub/NewsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import {
  getFeaturedNews,
  getNewsCategories,
  getNewsHub,
  getNewsPage,
} from '@/lib/content/loaders'

type Args = {
  params: Promise<{ pageNumber: string }>
  searchParams: Promise<{ category?: string }>
}

export async function generateStaticParams() {
  const first = getNewsPage(1)
  return Array.from({ length: first.totalPages }, (_, index) => index + 1)
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

  const hub = getNewsHub()
  const result = getNewsPage(page, undefined, category)

  if (page > result.totalPages) {
    notFound()
  }

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News' }]} />
      <NewsHubContent
        hub={hub}
        result={result}
        categories={getNewsCategories()}
        featured={page === 1 ? getFeaturedNews(2) : []}
        activeCategory={category}
      />
    </>
  )
}
