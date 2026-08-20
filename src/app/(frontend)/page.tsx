import type { Metadata } from 'next'

import { HomePage } from '@/components/home/HomePage'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Hijaz Hospital — Compassionate Care for All',
  description:
    'Hijaz Hospital provides free and subsidized healthcare to deserving patients across Lahore. Donate, explore services, and learn about our mission.',
}

export default async function Page() {
  let content: any = undefined
  let doctors: any[] | undefined = undefined

  try {
    const payload = await getPayload({ config: configPromise })
    const pageRes = await payload.find({
      collection: 'legacy-pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })
    if (pageRes.docs?.[0]?.legacyRawData) {
      content = pageRes.docs[0].legacyRawData
    }

    const doctorsRes = await payload.find({
      collection: 'doctors',
      limit: 1000,
      pagination: false,
    })
    if (doctorsRes.docs?.length > 0) {
      doctors = doctorsRes.docs.map(d => ({
        slug: d.slug,
        name: d.name,
        specialty: d.specialty,
        department: d.department,
        role: d.role,
        image: d.image,
        tags: d.tags,
      }))
    }
  } catch (error) {
    // Graceful fallback to static loaders if database not initialized
  }

  return <HomePage content={content} doctors={doctors} />
}
