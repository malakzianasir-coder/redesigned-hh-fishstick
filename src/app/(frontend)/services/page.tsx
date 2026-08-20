import type { Metadata } from 'next'
import React from 'react'

import { ServicesHubContent } from '@/components/hub/ServicesHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { ServiceRecord } from '@/lib/content/types'

export const metadata: Metadata = {
  title: 'Hospital Services | Hijaz Hospital',
  description: 'Inpatient, outpatient, diagnostic, and support services at Hijaz Hospital.',
}

export default async function ServicesHubPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'services',
    limit: 1000,
    pagination: false,
  })

  const services: ServiceRecord[] = result.docs.map((doc) => ({
    slug: doc.slug!,
    title: doc.title,
    category: doc.category || undefined,
    categorySlug: doc.categorySlug || undefined,
    description: doc.description || undefined,
    excerpt: doc.excerpt || undefined,
    hero: doc.legacyHero as any,
    jumpLinks: doc.legacyJumpLinks as any,
    sections: (doc.legacySections as any) || [],
  }))

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
      <ServicesHubContent services={services} />
    </>
  )
}
