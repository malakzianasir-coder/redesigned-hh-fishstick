import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { ServiceDetailContent } from '@/components/services/ServiceDetailContent'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { ServiceRecord } from '@/lib/content/types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
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
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return services.docs?.map(({ slug }) => ({ slug })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const doc = await queryServiceBySlug({ slug })

  if (!doc) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${doc.title} | Hijaz Hospital`,
    description: doc.description || doc.excerpt,
  }
}

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const doc = await queryServiceBySlug({ slug })

  if (!doc) {
    notFound()
  }

  const pageRecord: ServiceRecord = {
    slug: doc.slug!,
    title: doc.title,
    category: doc.category || undefined,
    categorySlug: doc.categorySlug || undefined,
    description: doc.description || undefined,
    excerpt: doc.excerpt || undefined,
    hero: doc.legacyHero as any,
    jumpLinks: doc.legacyJumpLinks as any,
    sections: (doc.legacySections as any) || [],
  }

  return <ServiceDetailContent page={pageRecord} />
}
