import type { Metadata } from 'next'

import { OurImpactContent } from '@/components/marketing/OurImpactContent'
import { getOurImpact } from '@/lib/content/loaders'

const page = getOurImpact()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function OurImpactPage() {
  return <OurImpactContent page={page} />
}
