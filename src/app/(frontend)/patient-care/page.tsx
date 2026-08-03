import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { getPatientCarePages } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Patient Care | Hijaz Hospital',
  description: 'Admission guidance, financial assistance, and patient rights at Hijaz Hospital.',
}

export default function PatientCareHubPage() {
  const pages = getPatientCarePages()

  return (
    <div className="bg-white">
      <section className="container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center mb-10">
          <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">Patient Care</p>
          <h1 className="text-h1M lg:text-h1 font-bold text-primary-blue">Patient Resources</h1>
          <p className="text-b16 text-primary-blue/85 max-w-2xl mx-auto">
            Information to help you navigate admission, welfare support, and your rights as a patient
            at Hijaz Hospital.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/patient-care/${page.slug}`}
              className="card-interactive p-6 flex flex-col gap-3"
            >
              <h2 className="text-h5M lg:text-h5 font-bold text-primary-blue">{page.title}</h2>
              {page.excerpt && (
                <p className="text-b14 text-primary-blue/85 line-clamp-3">{page.excerpt}</p>
              )}
              <span className="text-b14 font-semibold text-primary-blue mt-auto">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
