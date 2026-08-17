import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { DonationCheckout } from '@/components/donate/DonationCheckout'
import { getDonation, getDonations } from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ amount?: string; currency?: string }>
}

export async function generateStaticParams() {
  return getDonations().map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const cause = getDonation(slug)
  if (!cause) return { title: 'Donation Not Found' }
  return { title: `Donate to ${cause.title} | Hijaz Hospital` }
}

export default async function DonateCausePage({ params, searchParams }: Args) {
  const { slug } = await params
  const { amount } = await searchParams
  const cause = getDonation(slug)
  if (!cause) notFound()

  return (
    <DonationCheckout
      title={`Donate to ${cause.title}`}
      causeLabel={cause.title}
      causeSlug={cause.slug}
      initialAmount={amount}
    />
  )
}
