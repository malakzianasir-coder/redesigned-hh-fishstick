import type { Metadata } from 'next'

import { DepartmentsHubContent } from '@/components/hub/DepartmentsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getDepartments } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Medical Departments | Hijaz Hospital',
  description: 'Explore medical departments and specialties at Hijaz Hospital.',
}

export default function DepartmentsHubPage() {
  const departments = getDepartments()

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Medical Departments' }]} />
      <DepartmentsHubContent departments={departments} />
    </>
  )
}
