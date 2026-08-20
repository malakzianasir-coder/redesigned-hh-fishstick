import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { DepartmentDetailContent } from '@/components/departments/DepartmentDetailContent'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { DepartmentRecord } from '@/lib/content/types'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const queryDepartmentBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'departments',
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
  const departments = await payload.find({
    collection: 'departments',
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })

  return departments.docs?.map(({ slug }) => ({ slug })) || []
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const doc = await queryDepartmentBySlug({ slug })

  if (!doc) {
    return { title: 'Department Not Found' }
  }

  return {
    title: `${doc.title} | Hijaz Hospital`,
    description: doc.description || doc.excerpt,
  }
}

export default async function DepartmentPage({ params }: Args) {
  const { slug } = await params
  const doc = await queryDepartmentBySlug({ slug })

  if (!doc) {
    notFound()
  }

  // Map the Payload Document to the legacy DepartmentRecord format for now
  const pageRecord: DepartmentRecord = {
    slug: doc.slug!,
    title: doc.title,
    category: doc.category,
    categorySlug: doc.categorySlug || undefined,
    description: doc.description || undefined,
    excerpt: doc.excerpt || undefined,
    hero: doc.legacyHero as any,
    jumpLinks: doc.legacyJumpLinks as any,
    sections: (doc.legacySections as any) || [],
  }

  return <DepartmentDetailContent page={pageRecord} />
}
