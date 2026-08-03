'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'

import type { ServiceGroup } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { SectionIcon } from './sectionIcons'

type RailGroup = ServiceGroup & {
  slug: string
  icon?: string
}

type ProcedureFinderProps = {
  groups: ServiceGroup[]
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function HighlightedText({ text, pattern }: { text: string; pattern: RegExp }) {
  const globalPattern = new RegExp(
    pattern.source,
    pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`,
  )
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = globalPattern.exec(text)) !== null) {
    parts.push(text.slice(lastIndex, match.index))
    parts.push(
      <mark key={match.index} className="rounded bg-redbg px-0.5 text-primary-red">
        {match[1]}
      </mark>,
    )
    lastIndex = match.index + match[0].length
  }

  parts.push(text.slice(lastIndex))
  return <>{parts}</>
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <div className="proc-item">
      <span>{children}</span>
    </div>
  )
}

export function ProcedureFinder({ groups }: ProcedureFinderProps) {
  const rail = useMemo<RailGroup[]>(() => {
    const allItems = groups.flatMap((group) =>
      group.items.map((text) => ({ text, group: group.heading })),
    )
    return [
      {
        slug: 'all',
        icon: 'list-checks',
        heading: 'All Procedures',
        items: allItems.map((item) => item.text),
      },
      ...groups.map((group) => ({
        ...group,
        slug: group.slug || group.heading.toLowerCase().replace(/\s+/g, '-'),
      })),
    ]
  }, [groups])

  const allItems = useMemo(
    () => groups.flatMap((group) => group.items.map((text) => ({ text, group: group.heading }))),
    [groups],
  )

  const [groupIndex, setGroupIndex] = useState(0)
  const [query, setQuery] = useState('')

  const setGroup = useCallback(
    (index: number, pushHash = true) => {
      setGroupIndex(index)
      if (pushHash && typeof window !== 'undefined') {
        window.history.replaceState(null, '', `#${rail[index]?.slug || ''}`)
      }
    },
    [rail],
  )

  useEffect(() => {
    const initialSlug = window.location.hash.replace('#', '')
    const initialIndex = rail.findIndex((group) => group.slug === initialSlug)
    if (initialIndex > 0) {
      setGroupIndex(initialIndex)
    }
  }, [rail])

  const trimmedQuery = query.trim()
  const isSearching = trimmedQuery.length > 0
  const searchPattern = useMemo(() => {
    if (!trimmedQuery) return null
    return new RegExp(`(${escapeRegExp(trimmedQuery)})`, 'ig')
  }, [trimmedQuery])

  const matches = useMemo(() => {
    if (!searchPattern) return []
    return allItems.filter((item) => searchPattern.test(item.text))
  }, [allItems, searchPattern])

  const totalProcedures = allItems.length

  return (
    <>
      <div className="relative mx-auto w-full max-w-xl lg:mx-0">
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
          placeholder={`Search ${totalProcedures} procedures — e.g. hernia, laparoscopic, mastectomy…`}
          aria-label="Search procedures"
        />
      </div>

      {!isSearching ? (
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="group-rail group-scroll flex flex-col gap-1" role="tablist" aria-label="Service groups">
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
                  <span className="font-bold text-primary-blue">{group.heading}</span>
                  <span className="count">{group.items.length}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 hidden items-center gap-3 lg:flex">
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

          <div className="relative lg:col-span-8" aria-live="polite">
            {rail.map((group, index) => (
              <article
                key={group.slug}
                role="tabpanel"
                className={cn('panel card p-6 lg:p-8', index === groupIndex && 'is-active')}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div>
                    <p className="kicker">{index === 0 ? 'Complete list' : 'Service group'}</p>
                    <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{group.heading}</h3>
                  </div>
                  <span className="ml-auto text-b14 text-dark-gray">
                    {group.items.length} procedure{group.items.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
                  {group.items.map((item) => (
                    <CheckItem key={item}>{item}</CheckItem>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="card p-6 lg:p-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-b14 text-dark-gray">
              <span className="font-bold text-primary-blue">{matches.length}</span> procedures match your
              search
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
            <div className="grid grid-cols-1 gap-x-8 gap-y-1 md:grid-cols-2">
              {matches.map((match) => (
                <div key={`${match.group}-${match.text}`} className="proc-item !flex-col !items-start gap-1">
                  <span>
                    {searchPattern ? <HighlightedText text={match.text} pattern={searchPattern} /> : match.text}
                  </span>
                  <span className="group-badge">{match.group}</span>
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
    </>
  )
}
