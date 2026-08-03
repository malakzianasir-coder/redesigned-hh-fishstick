import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { getServices } from '@/lib/content/loaders'

export const metadata: Metadata = {
  title: 'Hospital Services | Hijaz Hospital',
  description: 'Inpatient, outpatient, diagnostic, and support services at Hijaz Hospital.',
}

export default function ServicesHubPage() {
  const services = getServices()

  return (
    <div className="bg-white">
      <section className="container mx-auto px-6 lg:px-[30px] py-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center mb-10">
          <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">Services</p>
          <h1 className="text-h1M lg:text-h1 font-bold text-primary-blue">Hospital Services</h1>
          <p className="text-b16 text-primary-blue/85 max-w-2xl mx-auto">
            From inpatient care to diagnostics and emergency services — comprehensive support for
            every stage of your healthcare journey.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="card-interactive p-6 flex flex-col gap-3"
            >
              {service.category && (
                <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">
                  {service.category}
                </p>
              )}
              <h2 className="text-h5M lg:text-h5 font-bold text-primary-blue">{service.title}</h2>
              {service.excerpt && (
                <p className="text-b14 text-primary-blue/85 line-clamp-3">{service.excerpt}</p>
              )}
              <span className="text-b14 font-semibold text-primary-blue mt-auto">
                View service →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
