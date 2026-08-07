import type { Metadata } from 'next'

import { WhatYouCanSupportHubContent } from '@/components/donate/WhatYouCanSupportHubContent'
import { getWhatYouCanSupport } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'What You Can Support | Donate | Hijaz Hospital',
  description:
    'Donate a meal, give in kind, sponsor a patient or surgery, or support a hospital project at Hijaz Hospital Trust.',
}

export default function WhatYouCanSupportPage() {
  return <WhatYouCanSupportHubContent content={getWhatYouCanSupport()} />
}
