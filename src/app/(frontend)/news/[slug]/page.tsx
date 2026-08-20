import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate'
import { formatArticleDate } from '@/lib/content/article-helpers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{ slug: string }>
}

const queryNewsBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
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
    collection: 'news',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  
  return result.docs?.map(({ slug }) => ({ slug: slug! })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const article = await queryNewsBySlug({ slug })

  if (!article) {
    return { title: 'News Not Found' }
  }
  
  const legacyMeta: any = article.legacyMeta || {}

  return {
    title: legacyMeta.title || `${article.title} | Hijaz Hospital`,
    description: legacyMeta.description || article.shortDescription,
  }
}

export default async function NewsArticlePage({ params }: Args) {
  const { slug } = await params
  const article = await queryNewsBySlug({ slug })

  if (!article) {
    notFound()
  }
  
  // Need to fetch related news. Let's do a simple query for articles in same category
  const payload = await getPayload({ config: configPromise })
  const relatedResult = await payload.find({
    collection: 'news',
    limit: 3,
    sort: '-publishedAt',
    where: {
      and: [
        { slug: { not_equals: slug } },
        { categories: { in: (article.categories || []) as string[] } }
      ]
    }
  })
  
  const related = relatedResult.docs.map(doc => ({
    slug: doc.slug!,
    title: doc.title,
    excerpt: doc.shortDescription || '',
    category: (doc.categories as string[])?.[0] || 'News',
    date: doc.publishedAt ? formatArticleDate(doc.publishedAt) : '',
    href: `/news/${doc.slug}`,
    image: doc.heroImage || undefined,
    variant: 'news' as const,
  }))

  const authorData: any = article.author || {}

  return (
    <ArticlePageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'News', href: '/news' },
        { label: article.title },
      ]}
      variant="news"
      title={article.title}
      tagLine={article.tagLine || undefined}
      subtitle={article.shortDescription || undefined}
      author={authorData.name}
      date={article.publishedAt ? formatArticleDate(article.publishedAt) : ''}
      heroImage={article.heroImage || undefined}
      body={(article.legacyContent as any) || []}
      related={related}
      relatedHeading="Related news"
    />
  )
}
