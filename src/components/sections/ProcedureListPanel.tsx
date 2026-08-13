import type { ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type ProcedureListPanelProps = {
  kicker?: string
  title: string
  items: string[]
  countLabel?: string
  className?: string
  /** When rendering highlighted search matches, pass custom rows instead of plain items. */
  children?: ReactNode
}

export function ProcedureRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 border-b border-dark-gray/15 py-2.5 last:border-b-0">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-red" aria-hidden />
      <span className="text-b14 leading-[150%] text-primary-blue/85">{children}</span>
    </div>
  )
}

export function ProcedureListPanel({
  kicker = 'Service group',
  title,
  items,
  countLabel,
  className,
  children,
}: ProcedureListPanelProps) {
  const count = items.length
  const badge =
    countLabel ??
    `${count} procedure${count === 1 ? '' : 's'}`

  return (
    <article className={cn('card p-6 lg:p-8', className)}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-dark-gray/15 pb-4">
        <div className="flex flex-col gap-[6px]">
          {kicker ? <p className="kicker">{kicker}</p> : null}
          <h3 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">{title}</h3>
        </div>
        <span className="rounded-full bg-whitebg px-3 py-1 text-b12 font-semibold text-dark-gray">
          {badge}
        </span>
      </div>
      {children ?? (
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          {items.map((item) => (
            <ProcedureRow key={item}>{item}</ProcedureRow>
          ))}
        </div>
      )}
    </article>
  )
}
