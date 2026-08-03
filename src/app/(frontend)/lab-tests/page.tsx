import type { Metadata } from 'next'

import { LabTestsHubContent } from '@/components/hub/LabTestsHubContent'
import { getLabTestsHub } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Lab Tests | Hijaz Hospital',
  description:
    'Browse diagnostic laboratory tests with specimen type and reporting times at Hijaz Hospital.',
}

export default function LabTestsPage() {
  const hub = getLabTestsHub()

  return <LabTestsHubContent hub={hub} />
}
