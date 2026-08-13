'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import type { ServiceGroup } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { ProcedureListPanel } from './ProcedureListPanel'
import { iconForServiceHeading, SectionIcon } from './sectionIcons'

type RailGroup = ServiceGroup & {
  slug: string
  icon?: string
  heading: string
}

type ProcedureFinderProps = {
  groups: ServiceGroup[]
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const pattern = new RegExp(`(${escapeRegExp(query)})`, 'ig')
  const parts = text.split(pattern)
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={`${part}-${index}`} className="rounded bg-redbg px-0.5 text-primary-red">
            {part}
          </mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  )
}

export function ProcedureFinder({ groups }: ProcedureFinderProps) {
  const rail = useMemo<RailGroup[]>(() => {
    const allItems = groups
      .flatMap((group) => group.items ?? [])
      .filter((item): item is string => typeof item === 'string')
      .sort((a, b) => a.localeCompare(b))
    return [
      {
        slug: 'all',
        icon: 'list-checks',
        heading: 'All Procedures',
        items: allItems,
      },
      ...groups.map((group) => ({
        ...group,
        slug: group.slug || (group.heading ?? '').toLowerCase().replace(/\s+/g, '-') || 'group',
        icon: group.icon || iconForServiceHeading(group.heading),
        heading: group.heading || 'Services',
      })),
    ]
  }, [groups])

  const allItems = useMemo(
    () =>
      groups
        .flatMap((group) =>
          (group.items ?? []).map((text) => ({ text, group: group.heading ?? '' })),
        )
        .filter((item) => typeof item.text === 'string')
        .sort((a, b) => a.text.localeCompare(b.text)),
    [groups],
  )

  const [groupIndex, setGroupIndex] = useState(0)
  const [query, setQuery] = useState('')

  const setGroup = useCallback(
    (index: number) => {
      setGroupIndex(index)
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `#${rail[index]?.slug || ''}`)
      }
    },
    [rail],
  )

  useEffect(() => {
    const syncFromHash = () => {
      const currentSlug = window.location.hash.replace('#', '')
      const index = rail.findIndex((group) => group.slug === currentSlug)
      if (index > 0) setGroupIndex(index)
    }

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
  }, [rail])

  const trimmedQuery = query.trim()
  const isSearching = trimmedQuery.length > 0

  const matches = useMemo(() => {
    if (!trimmedQuery) return []
    const needle = trimmedQuery.toLowerCase()
    return allItems.filter((item) => item.text.toLowerCase().includes(needle))
  }, [allItems, trimmedQuery])

  const activeGroup = rail[groupIndex] ?? rail[0]
  const totalProcedures = allItems.length

  return (
    <div className="flex flex-col gap-6">
      <div className="relative mx-auto w-full max-w-xl">
        <SectionIcon
          name="magnifying-glass"
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="search-input"
          placeholder={`Search ${totalProcedures} procedures — e.g. hernia, laparoscopic, cataract…`}
          aria-label="Search procedures"
        />
      </div>

      {!isSearching ? (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div
              className="group-rail group-scroll flex flex-col gap-1 rounded-2xl border border-dark-gray/15 bg-white p-2"
              role="tablist"
              aria-label="Service groups"
            >
              {rail.map((group, index) => (
                <button
                  key={group.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === groupIndex}
                  className={cn('group-btn', index === groupIndex && 'is-active')}
                  onClick={() => setGroup(index)}
                >
                  <span className="icon-tile !h-9 !w-9 !text-lg">
                    <SectionIcon name={group.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-start font-bold text-primary-blue">
                    {group.heading}
                  </span>
                  <span className="count">{group.items.length}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 hidden items-center gap-3 lg:flex">
              <button
                type="button"
                className="btn-ghost flex-1"
                onClick={() => setGroup((groupIndex - 1 + rail.length) % rail.length)}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn-ghost flex-1"
                onClick={() => setGroup((groupIndex + 1) % rail.length)}
              >
                Next
              </button>
            </div>
          </div>

          <div className="lg:col-span-8" aria-live="polite">
            {activeGroup ? (
              <ProcedureListPanel
                kicker={groupIndex === 0 ? 'Complete list' : 'Service group'}
                title={activeGroup.heading}
                items={activeGroup.items}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="card p-6 lg:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-dark-gray/15 pb-4">
            <p className="text-b14 text-dark-gray">
              <span className="font-bold text-primary-blue">{matches.length}</span> procedure
              {matches.length === 1 ? '' : 's'} match your search
            </p>
            <button
              type="button"
              className="btn-ghost min-h-9 px-3 text-b12"
              onClick={() => setQuery('')}
            >
              Clear search
            </button>
          </div>

          {matches.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
              {matches.map((match) => (
                <div
                  key={`${match.group}-${match.text}`}
                  className="flex flex-col gap-1 border-b border-dark-gray/15 py-2.5 last:border-b-0"
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-red" aria-hidden />
                    <span className="text-b14 leading-[150%] text-primary-blue/85">
                      <HighlightedText text={match.text} query={trimmedQuery} />
                    </span>
                  </div>
                  {match.group ? <span className="ml-3.5 group-badge w-fit">{match.group}</span> : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <span className="icon-tile">
                <SectionIcon name="magnifying-glass" />
              </span>
              <p className="text-b16 font-semibold text-primary-blue">No procedures match your search</p>
              <p className="text-b14 text-dark-gray">Try a different term, or browse the service groups.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
