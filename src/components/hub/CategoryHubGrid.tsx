'use client'

import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { cn } from '@/utilities/ui'

import { HubFilterRail } from './HubFilterRail'
import { readHashSlug, subscribeHashSync, writeHashSlug } from './hubFilterHash'
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
}

const ICON_MAP = { ...DEPARTMENT_ICON_MAP, ...SERVICE_ICON_MAP }

function countForFilter(filter: HubFilterCategory, cards: HubCardItem[]): number {
  if (filter.slug === 'all') return cards.length
  return cards.filter((card) => card.categorySlug === filter.slug).length
}

export function CategoryHubGrid({
  kicker,
  heading,
  lede,
  filters,
  cards,
}: CategoryHubGridProps) {
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const slugs = filters.map((filter) => filter.slug)
    const syncFromHash = () => setActiveFilter(readHashSlug(slugs))
    syncFromHash()
    return subscribeHashSync(syncFromHash)
  }, [filters])

  const visibleCards = useMemo(
    () =>
      (activeFilter === 'all'
        ? cards
        : cards.filter((card) => card.categorySlug === activeFilter)
      ).toSorted((a, b) => (a.title ?? '').localeCompare(b.title ?? '')),
    [activeFilter, cards],
  )

  const selectFilter = (slug: string) => {
    setActiveFilter(slug)
    writeHashSlug(slug)
  }

  const filterItems = filters.map((filter) => ({
    slug: filter.slug,
    label: filter.label,
    count: countForFilter(filter, cards),
  }))

  return (
    <>
      <section
        id="hub-filters"
        className="section-anchor bg-white scroll-mt-[var(--header-h)]"
      >
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">{kicker}</p>
            <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{heading}</h1>
            <p className="mx-auto max-w-2xl text-b16 text-primary-blue/85">{lede}</p>
          </div>
        </div>
      </section>

      <HubFilterRail
        filters={filterItems}
        activeFilter={activeFilter}
        onSelect={selectFilter}
        ariaLabel="Filter by category"
      />

      <section className="bg-white">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:pb-[60px]">
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
                {activeFilter === 'all' ? (
                  <p className="text-b12 font-bold uppercase tracking-kicker text-primary-red">
                    {card.categoryLabel}
                  </p>
                ) : null}
                <h2 className="text-h5M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h5">
                  {card.title}
                </h2>
                {card.excerpt ? (
                  <p className="line-clamp-2 text-b14 text-primary-blue/85">{card.excerpt}</p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                  {card.linkLabel ?? `View ${card.title}`}
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
    </>
  )
}
