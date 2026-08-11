'use client'

import { ArrowSquareOut } from '@phosphor-icons/react'

import { cn } from '@/utilities/ui'

export type HubFilterItem = {
  slug: string
  label: string
  count: number
}

export type HubExternalLink = {
  label: string
  href: string
}

type HubFilterRailProps = {
  filters: HubFilterItem[]
  activeFilter: string
  onSelect: (slug: string) => void
  externals?: HubExternalLink[]
  ariaLabel?: string
}

export function HubFilterRail({
  filters,
  activeFilter,
  onSelect,
  externals = [],
  ariaLabel = 'Filter by topic',
}: HubFilterRailProps) {
  if (!filters.length && !externals.length) return null

  return (
    <div className="border-t border-dark-gray/15 bg-white">
      <div className="container mx-auto px-6 py-4 lg:px-[30px]">
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
          {filters.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label={ariaLabel}>
              {filters.map((filter) => (
                <button
                  key={filter.slug}
                  id={`filter-${filter.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === filter.slug}
                  aria-label={`${filter.label}, ${filter.count}`}
                  className={cn('chip', activeFilter === filter.slug && 'is-active')}
                  onClick={() => onSelect(filter.slug)}
                >
                  {filter.label}
                  <span className="chip-count">{filter.count}</span>
                </button>
              ))}
            </div>
          ) : null}
          {filters.length > 0 && externals.length > 0 ? (
            <div className="hidden h-6 w-px bg-dark-gray/15 lg:block" aria-hidden="true" />
          ) : null}
          {externals.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {externals.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <ArrowSquareOut size={16} weight="bold" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
