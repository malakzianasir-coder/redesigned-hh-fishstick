import type { ReactNode } from 'react'

import { sectionMeasureClasses } from '@/components/site/sectionMeasures'
import { cn } from '@/utilities/ui'

type CenteredSectionStackProps = {
  children: ReactNode
  className?: string
  /** Match ContentSection prose width: full on mobile, 2/3 centered at lg. */
  width?: 'twoThirds' | 'prose'
}

/**
 * DS §9.1 companion: when a section uses a centered BlockHeader (no CTA),
 * wrap header + body in this stack so kicker/title/prose share one centered column.
 * Do not pair a centered BlockHeader with a left-flush max-width body.
 */
export function CenteredSectionStack({
  children,
  className,
  width = 'twoThirds',
}: CenteredSectionStackProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-col gap-4 text-center',
        width === 'twoThirds' ? 'lg:w-2/3' : sectionMeasureClasses.lede,
        className,
      )}
    >
      {children}
    </div>
  )
}
