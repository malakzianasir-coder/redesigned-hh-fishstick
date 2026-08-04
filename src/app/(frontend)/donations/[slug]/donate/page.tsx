import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MockDonationFlow } from '@/components/donate/MockDonationFlow'
import { getDonation, getDonations } from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getDonations().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const cause = getDonation(slug)
  if (!cause) return { title: 'Donation Mockup Not Found' }
  return { title: `${cause.title} Donation Mockup | Hijaz Hospital` }
}

export default async function DonationCauseMockPage({ params }: Args) {
  const { slug } = await params
  const cause = getDonation(slug)
  if (!cause) notFound()

  return <MockDonationFlow title="Cause Donation Mockup" causeLabel={cause.title} />
}
