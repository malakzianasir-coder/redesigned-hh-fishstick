import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DonationCauseContent } from '@/components/donate/DonationCauseContent'
import { getDonateContent, getDonation, getDonations } from '@/lib/content/loaders'

type Args = {
  params: Promise<{
    slug: string
  }>
}

/** Reserved under /donate — handled by dedicated routes, not giving-type cause pages. */
const RESERVED_SLUGS = new Set(['how-to-donate', 'what-you-can-support', 'mock'])

export async function generateStaticParams() {
  return getDonations()
    .filter(({ slug, kind }) => !RESERVED_SLUGS.has(slug) && kind === 'general')
    .map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  if (RESERVED_SLUGS.has(slug)) {
    return { title: 'Donate | Hijaz Hospital' }
  }

  const cause = getDonation(slug)

  if (!cause) {
    return { title: 'Cause Not Found' }
  }

  return {
    title: `${cause.title} | Donate | Hijaz Hospital`,
    description: cause.description || cause.excerpt,
  }
}

export default async function DonateSubpage({ params }: Args) {
  const { slug } = await params

  if (RESERVED_SLUGS.has(slug)) {
    notFound()
  }

  const cause = getDonation(slug)

  // Support causes live under /donate/what-you-can-support/[cause]
  if (!cause || cause.kind !== 'general') {
    notFound()
  }

  const donateHub = getDonateContent()

  return <DonationCauseContent cause={cause} donateHub={donateHub} />
}
