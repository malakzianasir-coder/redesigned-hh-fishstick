import Link from 'next/link'
import React from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { PatientStoriesSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function PatientStoriesSection({ section }: { section: PatientStoriesSectionData }) {
  const { id, kicker, heading, intro, departmentName, background = 'muted' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker={kicker} title={heading} lede={intro} />
        <div className="card-grid card-grid--3">
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
