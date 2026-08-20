import type { Metadata } from 'next'
import React from 'react'

import { DoctorsHubContent } from '@/components/hub/DoctorsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getDoctorsHub } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Visiting Consultants | Hijaz Hospital',
  description: 'Visiting consultants and FMH faculty at Hijaz Hospital.',
}

export default async function VisitingConsultantsPage() {
  const hubStatic = getDoctorsHub()

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'doctors',
    limit: 1000,
    pagination: false,
  })

  const dynamicDoctors = result.docs.map(doc => ({
    slug: doc.slug!,
    name: doc.name,
    specialty: doc.specialty || '',
    department: doc.department || '',
    tags: (doc.tags || []) as string[],
    role: doc.role || '',
    image: (doc.image as any) || undefined,
  }))

  const hub = {
    ...hubStatic,
    doctors: dynamicDoctors as any[],
  }

  return (
    <>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Doctors', href: '/doctors' },
          { label: 'Visiting Consultants' },
        ]}
      />
      <DoctorsHubContent
        hub={hub}
        initialView="visiting"
        showViewTabs={false}
        kicker="Visiting Faculty"
        heading="Visiting Consultants"
        lede="Visiting consultants and FMH faculty who support specialist care at Hijaz Hospital."
      />
    </>
  )
}
