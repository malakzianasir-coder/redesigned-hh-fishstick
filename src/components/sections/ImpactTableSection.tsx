import React from 'react'

import type { ImpactTableSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function ImpactTableSection({ section }: { section: ImpactTableSectionData }) {
  const { id, kicker, heading, intro, rows, note, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-6 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center lg:text-start">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          {intro ? <p className="text-b16 text-primary-blue/85">{intro}</p> : null}
        </div>
        <div className="card overflow-hidden">
          <div className="hidden border-b border-dark-gray/15 bg-whitebg px-5 py-3 text-b12 font-bold uppercase tracking-kicker text-dark-gray sm:grid sm:grid-cols-2 sm:gap-4">
            <span>Donation</span>
            <span>Impact</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.amount}
              className="grid grid-cols-1 gap-1 border-b border-dark-gray/15 px-5 py-4 last:border-b-0 sm:grid-cols-2 sm:items-baseline sm:gap-4"
            >
              <p className="text-b16 font-bold text-primary-red">{row.amount}</p>
              <p className="text-b14 text-primary-blue/85">{row.impact}</p>
            </div>
          ))}
        </div>
        {note ? <p className="text-b12 text-dark-gray">{note}</p> : null}
      </div>
    </section>
  )
}
