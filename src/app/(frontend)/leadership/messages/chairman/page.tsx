import type { Metadata } from 'next'

import { SingleMessageContent } from '@/components/marketing/SingleMessageContent'
import { getChairmansMessage } from '@/lib/content/loaders'

const page = getChairmansMessage()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function ChairmansMessagePage() {
  return <SingleMessageContent page={page} />
}
