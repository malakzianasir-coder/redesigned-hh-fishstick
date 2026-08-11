import type { Metadata } from 'next'

import { DoctorsHubContent } from '@/components/hub/DoctorsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getDoctorsHub } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Heads of Departments | Hijaz Hospital',
  description: 'Meet the heads of departments at Hijaz Hospital.',
}

export default function HeadsOfDepartmentsPage() {
  const hub = getDoctorsHub()

  return (
    <>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Doctors', href: '/doctors' },
          { label: 'Heads of Departments' },
        ]}
      />
      <DoctorsHubContent
        hub={hub}
        initialView="heads"
        showViewTabs={false}
        kicker="Leadership"
        heading="Heads of Departments"
        lede="Department heads leading clinical teams across Hijaz Hospital."
      />
    </>
  )
}
