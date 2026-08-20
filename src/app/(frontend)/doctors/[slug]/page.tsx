import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import { DoctorProfilePage } from '@/components/doctors/DoctorProfilePage'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

type Args = {
  params: Promise<{ slug: string }>
}

const queryDoctorBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'doctors',
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
  const doctors = await payload.find({
    collection: 'doctors',
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })
  
  return Array.from(new Set(doctors.docs?.map((doctor) => doctor.slug))).map((slug) => ({
    slug: slug!,
  }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const doctor = await queryDoctorBySlug({ slug })

  if (!doctor) return { title: 'Doctor Not Found' }

  return {
    title: `${doctor.name} | Hijaz Hospital`,
    description: `${doctor.specialty} consultant at Hijaz Hospital.`,
  }
}

export default async function DoctorDetailPage({ params }: Args) {
  const { slug } = await params
  const doc = await queryDoctorBySlug({ slug })
  if (!doc) notFound()

  // Map to the legacy Doctor shape for now
  const legacyDoctor = {
    slug: doc.slug!,
    name: doc.name,
    specialty: doc.specialty || '',
    department: doc.department || '',
    tags: (doc.tags || []) as string[],
    role: doc.role || '',
    image: (doc.image as any) || undefined,
  }

  return <DoctorProfilePage doctor={legacyDoctor as any} />
}
