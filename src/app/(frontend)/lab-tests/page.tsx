import type { Metadata } from 'next'

import { LabTestsHubContent } from '@/components/hub/LabTestsHubContent'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import { getLabTestsHub } from '@/lib/content/loaders'

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

export default function LabTestsPage() {
  const hub = getLabTestsHub()

  return (
    <>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Diagnostics', href: '/services#diagnostics' },
          { label: 'Lab Tests' },
        ]}
      />
      <LabTestsHubContent hub={hub} />
      <GlobalCtaSection section={GLOBAL_CTA} />
    </>
  )
}
