import type { Metadata } from 'next'

import { WhatYouCanSupportHubContent } from '@/components/donate/WhatYouCanSupportHubContent'
import { getWhatYouCanSupport } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'What You Can Support | Donate | Hijaz Hospital',
  description:
    'Donate a meal, give in kind, sponsor a patient or surgery, or support a hospital project at Hijaz Hospital Trust.',
}

export default async function WhatYouCanSupportPage() {
  let content = getWhatYouCanSupport()

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'donation-causes',
      limit: 1000,
      pagination: false,
    })
    if (res.docs?.length > 0) {
      const dynamicCauses = res.docs.map((doc: any) => ({
        slug: doc.slug!,
        title: doc.title,
        excerpt: doc.excerpt || '',
        icon: (doc.icon as any) || 'Heart',
        hero: (doc.legacyHero as any) || { title: doc.title },
        sections: (doc.legacySections as any) || [],
      }))

      content = {
        ...content,
        causes: dynamicCauses as any,
      }
    }
  } catch (e) {}

  return <WhatYouCanSupportHubContent content={content as any} />
}
