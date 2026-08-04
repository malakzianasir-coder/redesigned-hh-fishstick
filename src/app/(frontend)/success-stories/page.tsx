import type { Metadata } from 'next'

import { SuccessStoriesHubContent } from '@/components/hub/SuccessStoriesHubContent'
import { SUCCESS_STORY_CATEGORY_LABELS } from '@/lib/content/article-helpers'
import {
  getFeaturedSuccessStories,
  getSuccessStoriesByCategory,
  getSuccessStoriesHub,
} from '@/lib/content/loaders'
import type { SuccessStoryCategory } from '@/lib/content/types'

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
  const hub = getSuccessStoriesHub()
  const stories = getSuccessStoriesByCategory(activeCategory)
  const featured = getFeaturedSuccessStories(1)

  return (
    <SuccessStoriesHubContent
      hub={hub}
      stories={stories}
      featured={featured}
      activeCategory={activeCategory}
    />
  )
}
