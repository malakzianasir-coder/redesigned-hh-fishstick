import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { ServiceDetailContent } from '@/components/services/ServiceDetailContent'
import { getService, getServices } from '@/lib/content/loaders'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getServices().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = getService(slug)

  if (!page) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${page.title} | Hijaz Hospital`,
    description: page.description || page.excerpt,
  }
}

export default async function ServicePage({ params }: Args) {
  const { slug } = await params
  const page = getService(slug)

  if (!page) {
    notFound()
  }

  return <ServiceDetailContent page={page} />
}
