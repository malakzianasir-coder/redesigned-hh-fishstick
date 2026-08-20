import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { WhatYouCanSupportCauseContent } from '@/components/donate/WhatYouCanSupportCauseContent'
import { getWhatYouCanSupport } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{ cause: string }>
}

const queryCauseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'donation-causes',
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
    collection: 'donation-causes',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  
  return result.docs?.map(({ slug }) => ({ cause: slug! })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { cause: slug } = await params
  const cause = await queryCauseBySlug({ slug })
  if (!cause) return { title: 'What You Can Support | Hijaz Hospital' }
  return {
    title: `${cause.title} | What You Can Support | Hijaz Hospital`,
    description: cause.excerpt,
  }
}

export default async function WhatYouCanSupportCausePage({ params }: Args) {
  const { cause: slug } = await params
  const causeDoc = await queryCauseBySlug({ slug })
  if (!causeDoc) notFound()
  
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

  return <WhatYouCanSupportCauseContent hub={getWhatYouCanSupport()} cause={cause} />
}
