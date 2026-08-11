import type { Metadata } from 'next'

import { DoctorsHubContent } from '@/components/hub/DoctorsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getDoctorsHub } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Find a Doctor | Hijaz Hospital',
  description:
    'Browse Hijaz Hospital consultants and visiting doctors by specialty, department, and role.',
}

export default function DoctorsHubPage() {
  const hub = getDoctorsHub()

  return (
    <>
      <MarketingBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Doctors' }]} />
      <DoctorsHubContent hub={hub} />
    </>
  )
}
