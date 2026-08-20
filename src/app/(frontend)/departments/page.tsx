import type { Metadata } from 'next'

import { DepartmentsHubContent } from '@/components/hub/DepartmentsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { DepartmentRecord } from '@/lib/content/types'

export const metadata: Metadata = {
  title: 'Clinical Departments | Hijaz Hospital',
  description: 'Explore clinical departments and specialties at Hijaz Hospital.',
}

export default async function DepartmentsHubPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'departments',
    limit: 1000,
    pagination: false,
  })

  const departments: DepartmentRecord[] = result.docs.map((doc) => ({
    slug: doc.slug!,
    title: doc.title,
    category: doc.category,
    categorySlug: doc.categorySlug || undefined,
    description: doc.description || undefined,
    excerpt: doc.excerpt || undefined,
    hero: doc.legacyHero as any,
    jumpLinks: doc.legacyJumpLinks as any,
    sections: (doc.legacySections as any) || [],
  }))

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Clinical Departments' }]} />
      <DepartmentsHubContent departments={departments} />
    </>
  )
}
