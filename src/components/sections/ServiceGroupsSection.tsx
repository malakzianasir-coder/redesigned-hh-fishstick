import Link from 'next/link'
import React from 'react'

import type { ServiceGroupsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { ProcedureFinder } from './ProcedureFinder'
import { SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

export function ServiceGroupsSection({ section }: { section: ServiceGroupsSectionData }) {
  const {
    id,
    kicker,
    heading,
    intro,
    groups,
    background = 'muted',
    layout = 'stack',
    footer,
  } = section

  return (
    <section id={id} className={cn('section-anchor scroll-mt-[140px]', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          {intro ? <p className="text-b16 text-primary-blue/85">{intro}</p> : null}
        </div>

        {layout === 'finder' ? (
          <ProcedureFinder groups={groups} />
        ) : layout === 'links' ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group, index) => {
                const content = (
                  <>
                    <span className="icon-tile">
                      <SectionIcon name={group.icon} />
                    </span>
                    <span className="flex-1 text-h6M font-bold text-primary-blue lg:text-h6">
                      {group.heading}
                    </span>
                    <SectionIcon name="arrow-up-right" size={18} className="text-dark-gray" />
                  </>
                )

                if (group.href) {
                  return (
                    <Link
                      key={group.slug || group.heading}
                      href={group.href}
                      className="card-interactive flex items-center gap-3 p-5"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {content}
                    </Link>
                  )
                }

                return (
                  <article
                    key={group.slug || group.heading}
                    className="card-interactive flex items-center gap-3 p-5"
                  >
                    {content}
                  </article>
                )
              })}
            </div>
            {footer ? (
              <p className="mx-auto max-w-3xl text-center text-b16 text-primary-blue/85">{footer}</p>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <article key={group.slug || group.heading} className="card p-6 lg:p-8">
                <h3 className="mb-4 text-h5M font-bold text-primary-blue lg:text-h5">{group.heading}</h3>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="proc-item">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
