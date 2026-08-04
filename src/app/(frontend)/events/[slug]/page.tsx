import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate'
import { formatArticleDate } from '@/lib/content/article-helpers'
import {
  getHospitalEvent,
  getHospitalEvents,
  getRelatedHospitalEvents,
} from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getHospitalEvents().map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const event = getHospitalEvent(slug)

  if (!event) {
    return { title: 'Event Not Found' }
  }

  return {
    title: event.meta?.title || `${event.title} | Hijaz Hospital Events`,
    description: event.meta?.description || event.shortDescription,
  }
}

export default async function HospitalEventPage({ params }: Args) {
  const { slug } = await params
  const event = getHospitalEvent(slug)

  if (!event) {
    notFound()
  }

  return (
    <ArticlePageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Events', href: '/events' },
        { label: event.title },
      ]}
      variant="event"
      title={event.title}
      tagLine={event.tagLine}
      subtitle={event.shortDescription}
      date={formatArticleDate(event.eventDate)}
      heroImage={event.heroImage}
      body={event.content}
      eventType={event.eventType}
      eventDate={formatArticleDate(event.eventDate)}
      eventTime={event.eventTime}
      eventVenue={event.eventVenue}
      eventEntry={event.eventEntry}
      related={getRelatedHospitalEvents(event)}
      relatedHeading="Related events"
    />
  )
}
