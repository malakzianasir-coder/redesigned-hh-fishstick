import type { Metadata } from 'next'

import { DsCatalogFrame } from '@/components/site/DsCatalogFrame'

export const metadata: Metadata = {
  title: 'DS Illustrations',
  robots: { index: false, follow: false },
}

export default function DsIllustrationsPage() {
  return <DsCatalogFrame src="/ds/illustrations.html" title="Illustration system catalog" />
}
