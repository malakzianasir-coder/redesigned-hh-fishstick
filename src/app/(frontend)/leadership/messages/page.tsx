import type { Metadata } from 'next'

import { LeadershipMessagesContent } from '@/components/marketing/LeadershipMessagesContent'
import { getLeadershipMessages } from '@/lib/content/loaders'

const page = getLeadershipMessages()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function LeadershipMessagesPage() {
  return <LeadershipMessagesContent page={page} />
}
