import Link from 'next/link'
import React from 'react'

import type { BulletsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function BulletsSection({ section }: { section: BulletsSectionData }) {
  const { id, kicker, heading, items, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor scroll-mt-[140px]', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const text = typeof item === 'string' ? item : item.text
            const icon = typeof item === 'string' ? undefined : item.icon
            return (
              <article key={index} className="card-interactive flex flex-col gap-2 p-5">
                {icon ? (
                  <span className="icon-tile">
                    <SectionIcon name={icon} />
                  </span>
                ) : null}
                <p className="text-b16 font-semibold text-primary-blue">{text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
