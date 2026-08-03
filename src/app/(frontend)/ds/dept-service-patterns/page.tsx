import type { Metadata } from 'next'

import { DsCatalogFrame } from '@/components/site/DsCatalogFrame'

export const metadata: Metadata = {
  title: 'DS Dept & Service Patterns',
  robots: { index: false, follow: false },
}

export default function DsDeptServicePatternsPage() {
  return (
    <DsCatalogFrame src="/ds/dept-service-patterns.html" title="Department and service UI patterns" />
  )
}
