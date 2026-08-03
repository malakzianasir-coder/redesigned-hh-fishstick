import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import { DetailPageTemplate } from '@/components/templates/DetailPageTemplate'
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

  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-white border-b border-dark-gray/15">
        <div className="container mx-auto px-6 lg:px-[30px] py-3">
          <ol className="flex flex-wrap items-center gap-2 text-b14 text-dark-gray">
            <li>
              <Link href="/" className="text-primary-blue hover:text-primary-red transition-colors">
                Home
              </Link>
            </li>
            <li className="text-dark-gray/40">/</li>
            <li>
              <Link
                href="/departments"
                className="text-primary-blue hover:text-primary-red transition-colors"
              >
                Medical Departments
              </Link>
            </li>
            <li className="text-dark-gray/40">/</li>
            <li>
              <Link
                href={page.categorySlug ? `/departments#${page.categorySlug}` : '/departments'}
                className="text-primary-blue hover:text-primary-red transition-colors"
              >
                {page.category}
              </Link>
            </li>
            <li className="text-dark-gray/40">/</li>
            <li aria-current="page" className="font-semibold text-primary-blue">
              {page.title}
            </li>
          </ol>
        </div>
      </nav>
      <DetailPageTemplate page={page} />
    </>
  )
}
