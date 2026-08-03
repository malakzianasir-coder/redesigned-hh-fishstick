import type { Metadata } from 'next'

import { DonatePage } from '@/components/donate/DonatePage'
import { getDonateContent } from '@/lib/content/loaders'

const content = getDonateContent()

export const metadata: Metadata = {
  title: `${content.title} | Hijaz Hospital`,
  description: content.description,
}

export default function DonateRoutePage() {
  return <DonatePage content={content} />
}
