import type { Metadata } from 'next'

import { HowToDonateHubContent } from '@/components/donate/HowToDonateHubContent'
import { getHowToDonate } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'How to Donate | Hijaz Hospital',
  description:
    'Supporting Hijaz Hospital Trust is simple, secure, and impactful. Choose the donation method that is most convenient for you.',
}

export default function HowToDonatePage() {
  return <HowToDonateHubContent content={getHowToDonate()} />
}
