import type { Metadata } from 'next'
import React from 'react'

import { LabTestsHubContent } from '@/components/hub/LabTestsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const GLOBAL_CTA = {
  type: 'cta' as const,
  kicker: 'Support Our Mission',
  heading: 'Help Us Keep Care Within Reach for Every Patient',
  body: 'Your donation supports free treatment, medicines, and welfare programs for deserving patients — fulfilling our mission that financial hardship never stands in the way of care.',
  button: { label: 'Donate Now', href: '/donate' },
}

export const metadata: Metadata = {
  title: 'Lab Tests | Hijaz Hospital',
  description:
    'Browse diagnostic laboratory tests with specimen type and reporting times at Hijaz Hospital.',
}

export default async function LabTestsPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'lab-tests',
    limit: 5000,
    pagination: false,
  })

  const tests = result.docs.map(doc => ({
    slug: doc.slug!,
    name: doc.name,
    category: doc.category || '',
    reportingTime: doc.reportingTime || '',
    specimen: doc.specimen || '',
    isOutsourced: doc.isOutsourced || false,
    alsoKnownAs: (doc.alsoKnownAs as string[]) || [],
    description: (doc.legacyDescription as any) || undefined,
    preparation: (doc.legacyPreparation as any) || undefined,
  }))

  const categories = Array.from(new Set(tests.map(t => t.category))).filter(Boolean).sort()

  const hub = {
    kicker: 'Diagnostics',
    heading: 'List of Tests Available',
    lede: 'Search our laboratory test directory. Reporting times and specimen requirements shown — rates withheld from public UI per project policy.',
    categories,
    tests,
  }

  return (
    <>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Diagnostics', href: '/services#diagnostics' },
          { label: 'Lab Tests' },
        ]}
      />
      <LabTestsHubContent hub={hub as any} />
      <GlobalCtaSection section={GLOBAL_CTA} />
    </>
  )
}
