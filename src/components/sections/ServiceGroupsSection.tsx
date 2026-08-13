import Link from 'next/link'
import React from 'react'

import { BlockHeader } from '@/components/site/BlockHeader'
import { sectionMeasureClasses } from '@/components/site/sectionMeasures'
import type { ServiceGroupsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { ProcedureFinder } from './ProcedureFinder'
import { ProcedureListPanel } from './ProcedureListPanel'
import { iconForServiceHeading, SectionIcon } from './sectionIcons'

const sectionBackground: Record<'white' | 'muted', string> = {
  white: 'bg-white',
  muted: 'bg-whitebg',
}

function headingsMatch(a?: string, b?: string) {
  return Boolean(a && b && a.trim().toLowerCase() === b.trim().toLowerCase())
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
        <BlockHeader kicker={kicker} title={heading} lede={intro} />

        {layout === 'finder' ? (
          <>
            <ProcedureFinder groups={groups} />
            {footer ? (
              <p
                className={cn(
                  sectionMeasureClasses.centeredColumn,
                  'text-center text-b16 leading-[150%] text-primary-blue/85',
                )}
              >
                {footer}
              </p>
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
              <p
                className={cn(
                  sectionMeasureClasses.centeredColumn,
                  'text-center text-b16 leading-[150%] text-primary-blue/85',
                )}
              >
                {footer}
              </p>
            ) : null}
          </>
        ) : (
          <div className={cn(sectionMeasureClasses.centeredColumn, 'flex flex-col gap-6')}>
            {groups.map((group, index) => {
              const distinct = Boolean(group.heading?.trim()) && !headingsMatch(group.heading, heading)
              return (
                <ProcedureListPanel
                  key={group.slug || group.heading || `group-${index}`}
                  kicker={distinct ? 'Service group' : 'Complete list'}
                  title={distinct ? group.heading! : 'All services'}
                  items={group.items}
                  countLabel={`${group.items.length} service${group.items.length === 1 ? '' : 's'}`}
                />
              )
            })}
            {footer ? (
              <p className="text-center text-b16 leading-[150%] text-primary-blue/85">{footer}</p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  )
}
