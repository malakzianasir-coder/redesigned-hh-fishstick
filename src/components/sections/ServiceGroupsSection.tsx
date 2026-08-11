import Link from 'next/link'
import React from 'react'

import type { ServiceGroupsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { ProcedureFinder } from './ProcedureFinder'
import { iconForServiceHeading, SectionIcon } from './sectionIcons'

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
    groups: rawGroups,
    background = 'muted',
    layout = 'stack',
    footer,
  } = section

  const groups = rawGroups
    ? [...rawGroups]
        .sort((a, b) => (a.heading ?? '').localeCompare(b.heading ?? ''))
        .map((group) => ({
          ...group,
          items: group.items
            ? [...group.items]
                .filter((item): item is string => typeof item === 'string')
                .sort((a, b) => a.localeCompare(b))
            : group.items,
        }))
    : []

  return (
    <section id={id} className={cn('section-anchor', sectionBackground[background])}>
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{heading}</h2>
          {intro ? (
            <p className="mx-auto max-w-2xl text-b16 text-primary-blue/85">{intro}</p>
          ) : null}
        </div>

        {layout === 'finder' ? (
          <>
            <ProcedureFinder groups={groups} />
            {footer ? (
              <p className="mx-auto max-w-3xl text-center text-b16 text-primary-blue/85">{footer}</p>
            ) : null}
          </>
        ) : layout === 'links' ? (
          <>
            <div className="card-grid card-grid--3">
              {groups.map((group, index) => {
                const content = (
                  <>
                    <span className="icon-tile">
                      <SectionIcon name={group.icon || iconForServiceHeading(group.heading)} />
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
                <div className="mb-4 flex items-center gap-3">
                  <span className="icon-tile">
                    <SectionIcon name={group.icon || iconForServiceHeading(group.heading)} />
                  </span>
                  <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{group.heading}</h3>
                </div>
                <ul className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-b14 leading-[150%] text-primary-blue/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-red" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            {footer ? (
              <p className="mx-auto max-w-3xl text-center text-b16 text-primary-blue/85">{footer}</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
