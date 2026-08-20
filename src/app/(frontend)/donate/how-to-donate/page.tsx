import type { Metadata } from 'next'

import { HowToDonateHubContent } from '@/components/donate/HowToDonateHubContent'
import { getHowToDonate } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'How to Donate | Hijaz Hospital',
  description:
    'Supporting Hijaz Hospital Trust is simple, secure, and impactful. Choose the donation method that is most convenient for you.',
}

export default async function HowToDonatePage() {
  let content = getHowToDonate()

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: 'how-to-donate' } },
      limit: 1,
    })
    const doc = res.docs?.[0]
    if (doc?.legacyRawData) {
      content = doc.legacyRawData as any
    }
  } catch (e) {}

  return <HowToDonateHubContent content={content as any} />
}
