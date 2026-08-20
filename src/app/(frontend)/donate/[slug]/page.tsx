import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { DonationCauseContent } from '@/components/donate/DonationCauseContent'
import { getDonateContent } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{
    slug: string
  }>
}

/** Reserved under /donate — handled by dedicated routes, not giving-type cause pages. */
const RESERVED_SLUGS = new Set(['how-to-donate', 'what-you-can-support', 'mock'])

const queryGeneralCauseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'donation-causes',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      and: [
        { slug: { equals: slug } },
        { kind: { equals: 'general' } }
      ]
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'donation-causes',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      kind: { equals: 'general' }
    },
    select: { slug: true },
  })

  return result.docs
    ?.filter(({ slug }) => slug && !RESERVED_SLUGS.has(slug))
    .map(({ slug }) => ({ slug: slug! })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  if (RESERVED_SLUGS.has(slug)) {
    return { title: 'Donate | Hijaz Hospital' }
  }

  const cause = await queryGeneralCauseBySlug({ slug })

  if (!cause) {
    return { title: 'Cause Not Found' }
  }

  return {
    title: `${cause.title} | Donate | Hijaz Hospital`,
    description: cause.description || cause.excerpt,
  }
}

export default async function DonateSubpage({ params }: Args) {
  const { slug } = await params

  if (RESERVED_SLUGS.has(slug)) {
    notFound()
  }

  const causeDoc = await queryGeneralCauseBySlug({ slug })

  if (!causeDoc) {
    notFound()
  }
  
  const cause: any = {
    slug: causeDoc.slug,
    kind: causeDoc.kind,
    title: causeDoc.title,
    description: causeDoc.description,
    excerpt: causeDoc.excerpt,
    bankAccountKeys: causeDoc.bankAccountKeys,
    zakatCalculator: causeDoc.zakatCalculator,
    hero: causeDoc.legacyHero,
    jumpLinks: causeDoc.legacyJumpLinks,
    sections: causeDoc.legacySections,
  }

  const donateHub = getDonateContent()

  return <DonationCauseContent cause={cause} donateHub={donateHub} />
}
