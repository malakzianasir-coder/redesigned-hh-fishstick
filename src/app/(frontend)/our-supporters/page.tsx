import type { Metadata } from 'next'

import { OurSupportersContent } from '@/components/marketing/OurSupportersContent'
import { getOurSupporters } from '@/lib/content/loaders'

const page = getOurSupporters()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function OurSupportersPage() {
  return <OurSupportersContent page={page} />
}
