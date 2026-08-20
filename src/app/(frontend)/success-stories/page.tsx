import type { Metadata } from 'next'
import React from 'react'

import { SuccessStoriesHubContent } from '@/components/hub/SuccessStoriesHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { SUCCESS_STORY_CATEGORY_LABELS } from '@/lib/content/article-helpers'
import { getSuccessStoriesHub } from '@/lib/content/loaders'
import type { SuccessStoryCategory } from '@/lib/content/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Success Stories | Hijaz Hospital',
  description: 'Patient success stories of hope, recovery, and compassionate care at Hijaz Hospital.',
}

type Args = {
  searchParams: Promise<{ category?: string }>
}

function resolveCategory(label?: string): SuccessStoryCategory | undefined {
  if (!label) return undefined
  const entry = Object.entries(SUCCESS_STORY_CATEGORY_LABELS).find(([, value]) => value === label)
  return entry ? (entry[0] as SuccessStoryCategory) : undefined
}

export default async function SuccessStoriesPage({ searchParams }: Args) {
  const { category: categoryLabel } = await searchParams
  const activeCategory = resolveCategory(categoryLabel)
  const hubStatic = getSuccessStoriesHub()
  
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'success-stories',
    limit: 1000,
    pagination: false,
    sort: '-publishedDate',
  })
  
  const allStories = result.docs.map(doc => ({
    slug: doc.slug!,
    title: doc.title,
    heading: doc.heading || '',
    subHeading: doc.subHeading || '',
    category: (doc.category as any) || 'life-saving-treatments',
    format: (doc.format as any) || 'article',
    thumbnail: doc.thumbnail || '',
    videoUrl: doc.videoUrl || undefined,
    publishedDate: doc.publishedDate || '',
    featured: doc.featured || false,
    departments: (doc.departments as string[]) || [],
    services: (doc.services as string[]) || [],
    articleContent: (doc.legacyContent as any) || [],
  }))

  const stories = activeCategory ? allStories.filter(s => s.category === activeCategory) : allStories
  const featured = allStories.filter(s => s.featured).slice(0, 1)

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Success Stories' }]} />
      <SuccessStoriesHubContent
        hub={hubStatic}
        stories={stories as any}
        featured={featured as any}
        activeCategory={activeCategory}
      />
    </>
  )
}
