import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import { DepartmentDetailContent } from '@/components/departments/DepartmentDetailContent'
import { getDepartment, getDepartments } from '@/lib/content/loaders'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getDepartments().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = getDepartment(slug)

  if (!page) {
    return { title: 'Department Not Found' }
  }

  return {
    title: `${page.title} | Hijaz Hospital`,
    description: page.description || page.excerpt,
  }
}

export default async function DepartmentPage({ params }: Args) {
  const { slug } = await params
  const page = getDepartment(slug)

  if (!page) {
    notFound()
  }

  return <DepartmentDetailContent page={page} />
}
