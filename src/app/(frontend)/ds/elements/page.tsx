import type { Metadata } from 'next'

import { DsCatalogFrame } from '@/components/site/DsCatalogFrame'

export const metadata: Metadata = {
  title: 'DS Elements',
  robots: { index: false, follow: false },
}

export default function DsElementsPage() {
  return <DsCatalogFrame src="/ds/elements.html" title="Design system elements inventory" />
}
