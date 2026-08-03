import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { getDepartments } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Medical Departments | Hijaz Hospital',
  description: 'Explore medical departments and specialties at Hijaz Hospital.',
}

export default function DepartmentsHubPage() {
  const departments = getDepartments()

  return (
    <div className="bg-white">
      <section className="container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center mb-10">
          <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">Departments</p>
          <h1 className="text-h1M lg:text-h1 font-bold text-primary-blue">Medical Departments</h1>
          <p className="text-b16 text-primary-blue/85 max-w-2xl mx-auto">
            Specialist departments delivering comprehensive care across surgery, medicine, diagnostics,
            and allied specialties.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/departments/${dept.slug}`}
              className="card-interactive p-6 flex flex-col gap-3"
            >
              <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">
                {dept.category}
              </p>
              <h2 className="text-h5M lg:text-h5 font-bold text-primary-blue">{dept.title}</h2>
              {dept.excerpt && (
                <p className="text-b14 text-primary-blue/85 line-clamp-3">{dept.excerpt}</p>
              )}
              <span className="text-b14 font-semibold text-primary-blue mt-auto">
                View department →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
