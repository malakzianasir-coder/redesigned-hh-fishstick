import React from 'react'

import type { IconGridSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function IconGridSection({ section }: { section: IconGridSectionData }) {
  const { id, kicker, heading, intro, items, background = 'muted' } = section

  return (
    <section id={id} className={cn('section-anchor scroll-mt-[140px]', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          {(Array.isArray(intro) ? intro : typeof intro === 'string' ? [intro] : []).map(
            (paragraph, index) => (
              <p key={index} className="text-b16 text-primary-blue/85">
                {paragraph}
              </p>
            ),
          )}
        </div>
        <div className="card-grid card-grid--6 card-grid--gap-4">
          {items.map((item, index) => (
            <article
              key={item.label}
              className="card-interactive flex flex-col items-center gap-2 p-4 text-center"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="icon-tile">
                <SectionIcon name={item.icon} />
              </span>
              <p className="text-b14 font-semibold text-primary-blue">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
