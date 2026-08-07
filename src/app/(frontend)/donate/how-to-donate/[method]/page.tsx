import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { HowToDonateMethodContent } from '@/components/donate/HowToDonateMethodContent'
import {
  getHowToDonate,
  getHowToDonateMethod,
  getHowToDonateMethods,
} from '@/lib/content/loaders'

type Args = {
  params: Promise<{ method: string }>
}

export async function generateStaticParams() {
  return getHowToDonateMethods().map(({ slug }) => ({ method: slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { method: slug } = await params
  const method = getHowToDonateMethod(slug)
  if (!method) return { title: 'How to Donate | Hijaz Hospital' }
  return {
    title: `${method.title} | How to Donate | Hijaz Hospital`,
    description: method.excerpt,
  }
}

export default async function HowToDonateMethodPage({ params }: Args) {
  const { method: slug } = await params
  const method = getHowToDonateMethod(slug)
  if (!method) notFound()

  return <HowToDonateMethodContent hub={getHowToDonate()} method={method} />
}
