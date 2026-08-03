import type { Metadata } from 'next'

import { OurPurposeContent } from '@/components/marketing/OurPurposeContent'
import { getOurPurpose } from '@/lib/content/loaders'

const page = getOurPurpose()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function OurPurposePage() {
  return <OurPurposeContent page={page} />
}
