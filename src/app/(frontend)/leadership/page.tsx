import type { Metadata } from 'next'

import { LeadershipContent } from '@/components/marketing/LeadershipContent'
import { getLeadership } from '@/lib/content/loaders'

const page = getLeadership()

export const metadata: Metadata = {
  title: `${page.title} | Hijaz Hospital`,
  description: page.description,
}

export default function LeadershipPage() {
  return <LeadershipContent page={page} />
}
