import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate'
import {
  formatArticleDate,
  SUCCESS_STORY_CATEGORY_LABELS,
} from '@/lib/content/article-helpers'
import {
  getRelatedSuccessStories,
  getSuccessStory,
  getSuccessStories,
} from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getSuccessStories().map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const story = getSuccessStory(slug)

  if (!story) {
    return { title: 'Story Not Found' }
  }

  return {
    title: story.meta?.title || `${story.title} | Hijaz Hospital Success Stories`,
    description: story.meta?.description || story.subHeading,
  }
}

export default async function SuccessStoryPage({ params }: Args) {
  const { slug } = await params
  const story = getSuccessStory(slug)

  if (!story) {
    notFound()
  }

  const body =
    story.format === 'article' && story.articleContent ? story.articleContent : undefined

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
      subtitle={story.subHeading}
      date={formatArticleDate(story.publishedDate)}
      heroImage={story.thumbnail}
      body={body}
      videoUrl={story.format === 'video' ? story.videoUrl : undefined}
      categoryLabel={SUCCESS_STORY_CATEGORY_LABELS[story.category]}
      related={getRelatedSuccessStories(story)}
      relatedHeading="More patient stories"
    />
  )
}
