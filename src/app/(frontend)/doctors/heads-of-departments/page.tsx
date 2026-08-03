import type { Metadata } from 'next'

import { DoctorsHubContent } from '@/components/hub/DoctorsHubContent'
import { getDoctorsHub } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Heads of Departments | Hijaz Hospital',
  description: 'Meet the heads of departments at Hijaz Hospital.',
}

export default function HeadsOfDepartmentsPage() {
  const hub = getDoctorsHub()

  return (
    <DoctorsHubContent
      hub={hub}
      initialView="heads"
      showViewTabs={false}
      kicker="Leadership"
      heading="Heads of Departments"
      lede="Department heads leading clinical teams across Hijaz Hospital."
    />
  )
}
