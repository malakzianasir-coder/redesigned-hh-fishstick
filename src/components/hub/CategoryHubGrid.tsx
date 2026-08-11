'use client'

import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/utilities/ui'

import { DEPARTMENT_ICON_MAP, SERVICE_ICON_MAP } from './hubIcons'

export type HubCardItem = {
  id: string
  title: string
  excerpt?: string
  categoryLabel: string
  categorySlug: string
  href: string
  icon: string
  linkLabel?: string
  variant?: 'default' | 'outlined'
}

export type HubFilterCategory = {
  slug: string
  label: string
}

type CategoryHubGridProps = {
  kicker: string
  heading: string
  lede: string
  filters: HubFilterCategory[]
  cards: HubCardItem[]
  showFilterCounts?: boolean
}

const ICON_MAP = { ...DEPARTMENT_ICON_MAP, ...SERVICE_ICON_MAP }

function getFilterLabel(
  filter: HubFilterCategory,
  cards: HubCardItem[],
  showCounts: boolean,
): string {
  if (!showCounts || filter.slug === 'all') {
    const count =
      filter.slug === 'all'
        ? cards.length
        : cards.filter((c) => c.categorySlug === filter.slug).length
    return filter.slug === 'all' && showCounts ? `${filter.label} (${count})` : filter.label
  }
  const count = cards.filter((c) => c.categorySlug === filter.slug).length
  return `${filter.label} (${count})`
}

function readHashFilter(filters: HubFilterCategory[]): string {
  if (typeof window === 'undefined') return 'all'
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash || hash === 'all') return 'all'
  return filters.some((filter) => filter.slug === hash) ? hash : 'all'
}

function writeHashFilter(slug: string) {
  if (typeof window === 'undefined') return
  const nextUrl =
    slug === 'all'
      ? `${window.location.pathname}${window.location.search}`
      : `${window.location.pathname}${window.location.search}#${slug}`
  window.history.pushState(null, '', nextUrl)
}

export function CategoryHubGrid({
  kicker,
  heading,
  lede,
  filters,
  cards,
  showFilterCounts = false,
}: CategoryHubGridProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const syncFromHash = () => setActiveFilter(readHashFilter(filters))
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    window.addEventListener('popstate', syncFromHash)

    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href) return

      const currentPath = window.location.pathname
      if (href.startsWith('#') || href.startsWith(`${currentPath}#`)) {
        setTimeout(syncFromHash, 10)
      }
    }
    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      window.removeEventListener('popstate', syncFromHash)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [filters])

  const visibleCards = useMemo(
    () =>
      activeFilter === 'all'
        ? cards
        : cards.filter((card) => card.categorySlug === activeFilter),
    [activeFilter, cards],
  )

  const selectFilter = (slug: string) => {
    setActiveFilter(slug)
    writeHashFilter(slug)
  }

  return (
    <section
      id="hub-filters"
      className="section-anchor bg-white pt-[var(--header-h-expanded)] scroll-mt-[var(--header-h)]"
    >
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mb-10 flex flex-col gap-[6px] text-center">
          <p className="kicker">{kicker}</p>
          <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{heading}</h1>
          <p className="mx-auto max-w-2xl text-b16 text-primary-blue/85">{lede}</p>
        </div>

        <div
          className="mb-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {filters.map((filter) => (
            <button
              key={filter.slug}
              id={`filter-${filter.slug}`}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.slug}
              className={cn('chip', activeFilter === filter.slug && 'is-active')}
              onClick={() => selectFilter(filter.slug)}
            >
              {getFilterLabel(filter, cards, showFilterCounts)}
            </button>
          ))}
        </div>

        <div className="card-grid card-grid--3">
          {visibleCards.map((card) => {
            const IconComponent = ICON_MAP[card.icon as keyof typeof ICON_MAP]
            return (
              <Link
                key={card.id}
                href={card.href}
                className={cn(
                  'card-interactive group flex flex-col gap-3 p-6',
                  card.variant === 'outlined' && 'border-dashed',
                )}
              >
                {IconComponent ? (
                  <span className="icon-tile">
                    <IconComponent size={22} weight="duotone" />
                  </span>
                ) : null}
                <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">
                  {card.categoryLabel}
                </p>
                <h2 className="text-h5M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h5">
                  {card.title}
                </h2>
                {card.excerpt ? (
                  <p className="line-clamp-2 text-b14 text-primary-blue/85">{card.excerpt}</p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                  {card.linkLabel ?? 'View details'}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
