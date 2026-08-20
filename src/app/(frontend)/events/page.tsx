import type { Metadata } from 'next'
import React from 'react'

import { EventsHubContent } from '@/components/hub/EventsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getEventsHub, getHolidayCalendar } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Events & Calendar | Hijaz Hospital',
  description: 'Hospital events, awareness campaigns, and the annual observance calendar at Hijaz Hospital.',
}

export default async function EventsPage() {
  const hubStatic = getEventsHub()
  const holidayCalendar = getHolidayCalendar()
  
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    limit: 1000,
    pagination: false,
    sort: '-eventDate',
  })
  
  const dynamicEvents = result.docs.map(doc => ({
    slug: doc.slug!,
    title: doc.title,
    tagLine: doc.tagLine || undefined,
    shortDescription: doc.shortDescription || '',
    heroImage: doc.heroImage || undefined,
    content: (doc.legacyContent as any) || [],
    categories: (doc.categories as string[]) || [],
    eventType: doc.eventType || '',
    eventDate: doc.eventDate || '',
    eventTime: doc.eventTime || '',
    eventVenue: doc.eventVenue || '',
    eventEntry: doc.eventEntry || '',
    featured: doc.featured || false,
    publishedAt: doc.publishedAt || '',
    meta: (doc.legacyMeta as any) || undefined,
  }))

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Events' }]} />
      <EventsHubContent
        hub={hubStatic}
        hospitalEvents={dynamicEvents as any}
        holidayCalendar={holidayCalendar}
      />
    </>
  )
}
