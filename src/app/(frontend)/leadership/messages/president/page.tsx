import type { Metadata } from 'next'

import { SingleMessageContent } from '@/components/marketing/SingleMessageContent'
import { getPresidentsMessage } from '@/lib/content/loaders'

const page = getPresidentsMessage()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function PresidentsMessagePage() {
  return <SingleMessageContent page={page} />
}
