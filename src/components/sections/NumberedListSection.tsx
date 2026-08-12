import React from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { NumberedListSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function NumberedListSection({ section }: { section: NumberedListSectionData }) {
  const { id, kicker, heading, intro, items, background = 'white' } = section

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker={kicker} title={heading} lede={intro} />

        {/* Numbered items grid */}
        <div className="card-grid card-grid--2">
          {items.map((item, index) => (
            <article
              key={index}
              className="card flex gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-e2"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Number badge */}
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-blue text-b14 font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-b16 font-bold leading-[120%] text-primary-blue">
                  {item.title}
                </h3>
                <p className="text-b14 leading-[150%] text-primary-blue/85">{item.content}</p>
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="mt-1 flex flex-col gap-1 pl-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="list-disc text-b14 leading-[150%] text-primary-blue/85"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
