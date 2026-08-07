import React from 'react'

import type { BulletsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function BulletsSection({ section }: { section: BulletsSectionData }) {
  const { id, kicker, heading, intro, items, layout = 'cards', background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor scroll-mt-[140px]', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          {heading ? (
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          ) : null}
          {intro ? <p className="text-b16 text-primary-blue/85">{intro}</p> : null}
        </div>
        {layout === 'chips' ? (
          <div className="card mx-auto w-full max-w-4xl p-6 lg:p-8">
            <div className="flex flex-wrap justify-center gap-2">
              {items.map((item, index) => {
                const text = typeof item === 'string' ? item : item.text
                return (
                  <span key={index} className="chip">
                    {text}
                  </span>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="card-grid card-grid--2">
            {items.map((item, index) => {
              const text = typeof item === 'string' ? item : item.text
              const icon = typeof item === 'string' ? 'check-circle' : item.icon || 'check-circle'
              return (
                <article key={index} className="card-interactive flex items-start gap-3 p-5">
                  <span className="icon-tile shrink-0">
                    <SectionIcon name={icon} />
                  </span>
                  <p className="text-b16 font-semibold leading-[150%] text-primary-blue">{text}</p>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
