import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate'
import {
  formatArticleDate,
  SUCCESS_STORY_CATEGORY_LABELS,
} from '@/lib/content/article-helpers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{ slug: string }>
}

const queryStoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'success-stories',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'success-stories',
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  
  return result.docs?.map(({ slug }) => ({ slug: slug! })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const story = await queryStoryBySlug({ slug })

  if (!story) {
    return { title: 'Story Not Found' }
  }

  const legacyMeta: any = {} // Legacy success stories didn't really have meta fields, but just in case

  return {
    title: legacyMeta.title || `${story.title} | Hijaz Hospital Success Stories`,
    description: legacyMeta.description || story.subHeading,
  }
}

export default async function SuccessStoryPage({ params }: Args) {
  const { slug } = await params
  const story = await queryStoryBySlug({ slug })

  if (!story) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })
  const relatedResult = await payload.find({
    collection: 'success-stories',
    limit: 3,
    sort: '-publishedDate',
    where: {
      slug: { not_equals: slug }
    }
  })

  const related = relatedResult.docs.map(doc => ({
    slug: doc.slug!,
    title: doc.heading || doc.title,
    excerpt: doc.subHeading || '',
    category: SUCCESS_STORY_CATEGORY_LABELS[doc.category as import('@/lib/content/types').SuccessStoryCategory] || 'Success Story',
    date: doc.publishedDate ? formatArticleDate(doc.publishedDate) : '',
    href: `/success-stories/${doc.slug}`,
    image: doc.thumbnail || undefined,
    variant: 'story' as const,
  }))

  const body = story.format === 'article' && story.legacyContent ? (story.legacyContent as any) : undefined

  return (
    <ArticlePageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Success Stories', href: '/success-stories' },
        { label: story.heading || story.title },
      ]}
      variant="story"
      title={story.heading || story.title}
      tagLine={story.title}
      subtitle={story.subHeading || undefined}
      date={story.publishedDate ? formatArticleDate(story.publishedDate) : ''}
      heroImage={story.thumbnail || undefined}
      body={body}
      videoUrl={story.format === 'video' ? story.videoUrl || undefined : undefined}
      categoryLabel={SUCCESS_STORY_CATEGORY_LABELS[story.category as import('@/lib/content/types').SuccessStoryCategory]}
      related={related}
      relatedHeading="More patient stories"
    />
  )
}
