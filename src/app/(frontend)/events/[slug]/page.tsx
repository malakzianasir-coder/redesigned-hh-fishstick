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

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
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
    collection: 'events',
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
  const event = await queryEventBySlug({ slug })

  if (!event) {
    return { title: 'Event Not Found' }
  }

  const legacyMeta: any = event.legacyMeta || {}

  return {
    title: legacyMeta.title || `${event.title} | Hijaz Hospital Events`,
    description: legacyMeta.description || event.shortDescription,
  }
}

export default async function HospitalEventPage({ params }: Args) {
  const { slug } = await params
  const event = await queryEventBySlug({ slug })

  if (!event) {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })
  const relatedResult = await payload.find({
    collection: 'events',
    limit: 3,
    sort: '-eventDate',
    where: {
      and: [
        { slug: { not_equals: slug } },
        { categories: { in: (event.categories || []) as string[] } }
      ]
    }
  })

  const related = relatedResult.docs.map(doc => ({
    slug: doc.slug!,
    title: doc.title,
    excerpt: doc.shortDescription || '',
    category: (doc.categories as string[])?.[0] || 'Events',
    date: doc.eventDate ? formatArticleDate(doc.eventDate) : '',
    href: `/events/${doc.slug}`,
    image: doc.heroImage || undefined,
    variant: 'event' as const,
  }))

  return (
    <ArticlePageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: event.title },
      ]}
      variant="event"
      title={event.title}
      tagLine={event.tagLine || undefined}
      subtitle={event.shortDescription || undefined}
      date={event.eventDate ? formatArticleDate(event.eventDate) : ''}
      heroImage={event.heroImage || undefined}
      body={(event.legacyContent as any) || []}
      eventType={event.eventType || ''}
      eventDate={event.eventDate ? formatArticleDate(event.eventDate) : ''}
      eventTime={event.eventTime || ''}
      eventVenue={event.eventVenue || ''}
      eventEntry={event.eventEntry || ''}
      related={related}
      relatedHeading="Related events"
    />
  )
}
