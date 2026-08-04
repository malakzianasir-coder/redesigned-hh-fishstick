import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LandingMockupPage } from '@/components/landing/LandingMockupPage'
import { getLandingPage, getLandingPages } from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getLandingPages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = getLandingPage(slug)
  if (!page) return { title: 'Landing Page Not Found' }

  return {
    title: page.meta?.title || `${page.title} | Hijaz Hospital`,
    description: page.meta?.description,
  }
}

export default async function LandingPageRoute({ params }: Args) {
  const { slug } = await params
  const page = getLandingPage(slug)
  if (!page) notFound()

  return <LandingMockupPage page={page} />
}
