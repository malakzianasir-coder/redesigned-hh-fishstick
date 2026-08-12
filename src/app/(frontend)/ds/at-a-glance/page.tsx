import type { Metadata } from 'next'

import { DsCatalogFrame } from '@/components/site/DsCatalogFrame'

export const metadata: Metadata = {
  title: 'DS At a Glance',
  robots: { index: false, follow: false },
}

export default function DsAtAGlancePage() {
  return <DsCatalogFrame src="/ds/at-a-glance.html" title="At a Glance" />
}
