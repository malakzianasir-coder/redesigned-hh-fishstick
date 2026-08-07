import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { WhatYouCanSupportCauseContent } from '@/components/donate/WhatYouCanSupportCauseContent'
import {
  getWhatYouCanSupport,
  getWhatYouCanSupportCause,
  getWhatYouCanSupportCauses,
} from '@/lib/content/loaders'

type Args = {
  params: Promise<{ cause: string }>
}

export async function generateStaticParams() {
  return getWhatYouCanSupportCauses().map(({ slug }) => ({ cause: slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { cause: slug } = await params
  const cause = getWhatYouCanSupportCause(slug)
  if (!cause) return { title: 'What You Can Support | Hijaz Hospital' }
  return {
    title: `${cause.title} | What You Can Support | Hijaz Hospital`,
    description: cause.excerpt,
  }
}

export default async function WhatYouCanSupportCausePage({ params }: Args) {
  const { cause: slug } = await params
  const cause = getWhatYouCanSupportCause(slug)
  if (!cause) notFound()

  return <WhatYouCanSupportCauseContent hub={getWhatYouCanSupport()} cause={cause} />
}
