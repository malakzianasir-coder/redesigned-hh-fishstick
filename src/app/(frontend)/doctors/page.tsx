import type { Metadata } from 'next'

import { DoctorsHubContent } from '@/components/hub/DoctorsHubContent'
import { getDoctorsHub } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Find a Doctor | Hijaz Hospital',
  description:
    'Browse Hijaz Hospital consultants and visiting doctors by specialty, department, and role.',
}

export default function DoctorsHubPage() {
  const hub = getDoctorsHub()

  return <DoctorsHubContent hub={hub} />
}
