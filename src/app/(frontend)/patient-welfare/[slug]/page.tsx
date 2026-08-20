import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { PatientWelfareDetailContent } from '@/components/patient-welfare/PatientWelfareDetailContent'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const queryPatientWelfareBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'patient-welfare-pages',
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
    collection: 'patient-welfare-pages',
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  
  return result.docs?.map(({ slug }) => ({ slug: slug! })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await queryPatientWelfareBySlug({ slug })

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: `${page.title} | Hijaz Hospital`,
    description: page.description || page.excerpt,
  }
}

export default async function PatientWelfarePage({ params }: Args) {
  const { slug } = await params
  const pageDoc = await queryPatientWelfareBySlug({ slug })

  if (!pageDoc) {
    notFound()
  }
  
  const page: any = {
    slug: pageDoc.slug,
    title: pageDoc.title,
    category: pageDoc.category,
    categorySlug: pageDoc.categorySlug,
    description: pageDoc.description,
    excerpt: pageDoc.excerpt,
    hero: pageDoc.legacyHero,
    jumpLinks: pageDoc.legacyJumpLinks,
    sections: pageDoc.legacySections,
  }

  return <PatientWelfareDetailContent page={page} />
}
