import { sectionMeasureClasses } from '@/components/site/sectionMeasures'
import type { ServiceGroup } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { ProcedureListPanel } from './ProcedureListPanel'

export function headingsMatch(a?: string, b?: string) {
  return Boolean(a && b && a.trim().toLowerCase() === b.trim().toLowerCase())
}

/** Canonical stack panels for service / procedure lists (Patient Care + Diagnostics). */
export function normalizeServiceGroups(groups: ServiceGroup[]): ServiceGroup[] {
  return [...groups]
    .sort((a, b) => (a.heading ?? '').localeCompare(b.heading ?? ''))
    .map((group) => ({
      ...group,
      items: group.items
        ? [...group.items]
            .filter((item): item is string => typeof item === 'string')
            .sort((a, b) => a.localeCompare(b))
        : group.items,
    }))
}

type ServiceListStackProps = {
  groups: ServiceGroup[]
  sectionHeading: string
  footer?: string
  className?: string
}

export function ServiceListStack({
  groups,
  sectionHeading,
  footer,
  className,
}: ServiceListStackProps) {
  return (
    <div className={cn(sectionMeasureClasses.centeredColumn, 'flex flex-col gap-6', className)}>
      {groups.map((group, index) => {
        const distinct = Boolean(group.heading?.trim()) && !headingsMatch(group.heading, sectionHeading)
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
  )
}
