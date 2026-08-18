import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { BlockHeader } from '@/components/site/BlockHeader'
import { sectionMeasureClasses } from '@/components/site/sectionMeasures'
import type { ServiceGroupsSectionData } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { ProcedureFinder } from './ProcedureFinder'
import { normalizeServiceGroups, ServiceListStack } from './serviceListStack'
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

  const groups = rawGroups ? normalizeServiceGroups(rawGroups) : []

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
                    <span className="flex-1 text-b16 font-bold text-primary-blue">
                      {group.heading}
                    </span>
                    <SectionIcon name="arrow-up-right" size={18} className="text-dark-gray" />
                  </>
                )

                return (
                  <InteractiveCard
                    key={group.slug || group.heading}
                    href={group.href}
                    as={group.href ? undefined : 'article'}
                    className="flex items-center gap-3 p-5"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {content}
                  </InteractiveCard>
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
          <ServiceListStack groups={groups} sectionHeading={heading} footer={footer} />
        )}
      </div>
    </section>
  )
}
