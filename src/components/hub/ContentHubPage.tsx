'use client'

import { ArrowRight } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { HubFilterRail, type HubExternalLink } from '@/components/hub/HubFilterRail'
import { CONTENT_HUB_ICON_MAP } from '@/components/hub/contentHubIcons'
import { readHashSlug, subscribeHashSync, writeHashSlug } from '@/components/hub/hubFilterHash'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import type { MarketingHero } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

export type ContentHubCard = {
  slug: string
  title: string
  excerpt: string
  icon?: string
  href: string
  linkLabel: string
  meta?: string
}

export type ContentHubGroup = {
  id: string
  kicker?: string
  heading: string
  lede?: string
  cta?: { label: string; href: string }
  cards: ContentHubCard[]
}

type ContentHubPageProps = {
  title: string
  breadcrumb: { label: string; href?: string }[]
  hero: MarketingHero
  groups: ContentHubGroup[]
  externals?: HubExternalLink[]
  children?: ReactNode
}

export function ContentHubPage({
  title,
  breadcrumb,
  hero,
  groups,
  externals = [],
  children,
}: ContentHubPageProps) {
  const groupIds = useMemo(() => groups.map((group) => group.id), [groups])
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const syncFromHash = () => setActiveFilter(readHashSlug(groupIds))
    syncFromHash()
    return subscribeHashSync(syncFromHash)
  }, [groupIds])

  const selectFilter = (slug: string) => {
    setActiveFilter(slug)
    writeHashSlug(slug)
  }

  const visibleGroups = useMemo(
    () => (activeFilter === 'all' ? groups : groups.filter((group) => group.id === activeFilter)),
    [activeFilter, groups],
  )

  const filters = useMemo(
    () => [
      { slug: 'all', label: 'All', count: groups.reduce((sum, group) => sum + group.cards.length, 0) },
      ...groups.map((group) => ({
        slug: group.id,
        label: group.heading,
        count: group.cards.length,
      })),
    ],
    [groups],
  )

  return (
    <article>
      <MarketingBreadcrumb items={breadcrumb} />
      <MarketingHeroSection hero={hero} />
      <HubFilterRail
        filters={filters}
        activeFilter={activeFilter}
        onSelect={selectFilter}
        externals={externals}
        ariaLabel={`Filter ${title}`}
      />
      {visibleGroups.map((group, index) => (
        <section
          key={group.id}
          id={group.id}
          className={cn(
            'hub-group section-anchor',
            index % 2 === 0 ? 'bg-whitebg' : 'bg-white',
            index > 0 && 'border-t border-dark-gray/15',
          )}
        >
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <BlockHeader
              kicker={group.kicker}
              title={group.heading}
              lede={group.lede}
              cta={group.cta}
            />
            <div className="card-grid card-grid--3">
              {[...group.cards]
                .sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
                .map((card) => {
                const IconComponent = card.icon
                  ? CONTENT_HUB_ICON_MAP[card.icon as keyof typeof CONTENT_HUB_ICON_MAP]
                  : undefined
                return (
                  <Link
                    key={card.slug}
                    href={card.href}
                    className="card-interactive group flex flex-col gap-3 p-6"
                  >
                    {IconComponent ? (
                      <span className="icon-tile">
                        <IconComponent size={22} weight="duotone" />
                      </span>
                    ) : null}
                    <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                      {card.title}
                    </h3>
                    <p className="text-b14 text-primary-blue/85">{card.excerpt}</p>
                    {card.meta ? <p className="text-b12 text-dark-gray">{card.meta}</p> : null}
                    <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                      {card.linkLabel}
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
      ))}
      {children}
    </article>
  )
}
