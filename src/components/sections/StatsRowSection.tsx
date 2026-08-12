import React from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { StatsRowSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function StatsRowSection({ section }: { section: StatsRowSectionData }) {
  const { id, kicker, heading, stats, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        {heading ? (
          <div className="mb-8">
            <BlockHeader kicker={kicker} title={heading} />
          </div>
        ) : null}
        <div className="card-grid card-grid--3 mx-auto max-w-3xl">
          {stats.map((stat) => (
            <article key={stat.label} className="card p-6 text-center">
              <p className="font-display text-h3M font-bold text-primary-red lg:text-h3">{stat.value}</p>
              <p className="mt-2 text-b14 text-dark-gray">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
