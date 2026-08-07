import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { PatientWelfareDetailContent } from '@/components/patient-welfare/PatientWelfareDetailContent'
import { getPatientWelfare, getPatientWelfarePages } from '@/lib/content/loaders'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getPatientWelfarePages().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = getPatientWelfare(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: `${page.title} | Hijaz Hospital`,
    description: page.description || page.excerpt,
  }
}

export default async function PatientWelfarePage({ params }: Args) {
  const { slug } = await params
  const page = getPatientWelfare(slug)

  if (!page) {
    notFound()
  }

  return <PatientWelfareDetailContent page={page} />
}
