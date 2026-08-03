import type { Metadata } from 'next'

import { DsCatalogFrame } from '@/components/site/DsCatalogFrame'

export const metadata: Metadata = {
  title: 'DS Mega Menu',
  robots: { index: false, follow: false },
}

export default function DsMegaMenuPage() {
  return <DsCatalogFrame src="/ds/mega-menu.html" title="Mega menu design system reference" />
}
