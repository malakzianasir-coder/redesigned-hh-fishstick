import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DonationCauseContent } from '@/components/donate/DonationCauseContent'
import { getDonateContent, getDonation, getDonations } from '@/lib/content/loaders'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getDonations().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const cause = getDonation(slug)

  if (!cause) {
    return { title: 'Cause Not Found' }
  }

  return {
    title: `${cause.title} | Donate | Hijaz Hospital`,
    description: cause.description || cause.excerpt,
  }
}

export default async function DonationCausePage({ params }: Args) {
  const { slug } = await params
  const cause = getDonation(slug)

  if (!cause) {
    notFound()
  }

  const donateHub = getDonateContent()

  return <DonationCauseContent cause={cause} donateHub={donateHub} />
}
