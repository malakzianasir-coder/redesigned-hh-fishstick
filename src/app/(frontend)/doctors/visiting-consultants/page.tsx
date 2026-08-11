import type { Metadata } from 'next'

import { DoctorsHubContent } from '@/components/hub/DoctorsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { getDoctorsHub } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Visiting Consultants | Hijaz Hospital',
  description: 'Visiting consultants and FMH faculty at Hijaz Hospital.',
}

export default function VisitingConsultantsPage() {
  const hub = getDoctorsHub()

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
