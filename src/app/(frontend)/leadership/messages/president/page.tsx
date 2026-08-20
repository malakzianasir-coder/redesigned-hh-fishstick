import type { Metadata } from 'next'

import { SingleMessageContent } from '@/components/marketing/SingleMessageContent'
import { getPresidentsMessage } from '@/lib/content/loaders'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function generateMetadata(): Promise<Metadata> {
  const fallback = getPresidentsMessage()
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: 'presidents-message' } },
      limit: 1,
    })
    const doc = res.docs?.[0]
    if (doc) {
      return {
        title: `${doc.title || fallback.title} | Hijaz Hospital`,
        description: doc.description || fallback.description,
      }
    }
  } catch (e) {}

  return {
    title: `${fallback.title} | Hijaz Hospital`,
    description: fallback.description,
  }
}

export default async function PresidentsMessagePage() {
  let page = getPresidentsMessage()

  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: 'presidents-message' } },
      limit: 1,
    })
    const doc = res.docs?.[0]
    if (doc?.legacyRawData) {
      page = doc.legacyRawData as any
    }
  } catch (e) {}

  return <SingleMessageContent page={page as any} />
}
