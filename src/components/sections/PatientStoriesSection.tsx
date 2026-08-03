import Link from 'next/link'
import React from 'react'

import type { PatientStoriesSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function PatientStoriesSection({ section }: { section: PatientStoriesSectionData }) {
  const { id, kicker, heading, intro, departmentName, background = 'muted' } = section

  return (
    <section id={id} className={cn('section-anchor scroll-mt-[140px]', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          {intro ? <p className="text-b16 text-primary-blue/85">{intro}</p> : null}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="card flex flex-col items-start gap-3 border-dashed p-6">
            <span className="group-badge">CMS placeholder</span>
            <p className="text-b14 text-dark-gray">
              Auto-pulls published success stories filtered to the{' '}
              <strong>{departmentName || 'department'}</strong> department. Story cards appear here once
              stories are tagged in Admin.
            </p>
            <Link
              href="/success-stories"
              className="mt-auto text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
            >
              Browse all success stories →
            </Link>
          </article>
        </div>
      </div>
    </section>
  )
}
