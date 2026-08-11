import type { Metadata } from 'next'

import { DsCatalogFrame } from '@/components/site/DsCatalogFrame'

export const metadata: Metadata = {
  title: 'DS Hub & Content Page Patterns',
  robots: { index: false, follow: false },
}

export default function DsHubPagePatternsPage() {
  return (
    <DsCatalogFrame src="/ds/hub-page-patterns.html" title="Hub and content page patterns" />
  )
}
