'use client'

import { MagnifyingGlass } from '@phosphor-icons/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { LabTestRecord } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

import { LabTestDrawer } from './LabTestDrawer'

type LabTestsTableProps = {
  kicker: string
  heading: string
  lede: string
  categories: string[]
  tests: LabTestRecord[]
}

type SourceFilter = 'all' | 'in-house' | 'outsourced'

export function LabTestsTable({ kicker, heading, lede, categories, tests }: LabTestsTableProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [specimen, setSpecimen] = useState('all')
  const [turnaround, setTurnaround] = useState('all')
  const [source, setSource] = useState<SourceFilter>('all')
  const [active, setActive] = useState<LabTestRecord | null>(null)

  const specimens = useMemo(
    () =>
      Array.from(new Set(tests.map((t) => t.specimen).filter(Boolean) as string[])).sort(),
    [tests],
  )

  const turnarounds = useMemo(
    () =>
      Array.from(new Set(tests.map((t) => t.reportingTime).filter(Boolean) as string[])).sort(),
    [tests],
  )

  const categoryCounts = useMemo(() => {
    const q = search.trim().toLowerCase()
    const pool = tests.filter((test) => {
      if (specimen !== 'all' && test.specimen !== specimen) return false
      if (turnaround !== 'all' && test.reportingTime !== turnaround) return false
      if (source === 'in-house' && test.isOutsourced) return false
      if (source === 'outsourced' && !test.isOutsourced) return false
      if (q) {
        const aka = (test.alsoKnownAs || []).map((a) => a.name).join(' ')
        const hay = `${test.name} ${aka}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    const byCategory: Record<string, number> = { all: pool.length }
    for (const cat of categories) {
      byCategory[cat] = pool.filter((test) => test.category === cat).length
    }
    return byCategory
  }, [tests, search, specimen, turnaround, source, categories])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return [...tests]
      .filter((test) => {
        if (category !== 'all' && test.category !== category) return false
        if (specimen !== 'all' && test.specimen !== specimen) return false
        if (turnaround !== 'all' && test.reportingTime !== turnaround) return false
        if (source === 'in-house' && test.isOutsourced) return false
        if (source === 'outsourced' && !test.isOutsourced) return false
        if (q) {
          const aka = (test.alsoKnownAs || []).map((a) => a.name).join(' ')
          const hay = `${test.name} ${aka}`.toLowerCase()
          if (!hay.includes(q)) return false
        }
        return true
      })
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))
  }, [tests, search, category, specimen, turnaround, source])

  const openTest = useCallback((test: LabTestRecord) => {
    setActive(test)
    const url = new URL(window.location.href)
    url.searchParams.set('test', test.slug)
    window.history.replaceState({}, '', url.toString())
  }, [])

  const closeTest = useCallback(() => {
    setActive(null)
    const url = new URL(window.location.href)
    url.searchParams.delete('test')
    window.history.replaceState({}, '', url.toString())
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('test')
    if (!slug) return
    const found = tests.find((t) => t.slug === slug)
    if (found) setActive(found)
  }, [tests])

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mb-8 text-center">
          <p className="kicker">{kicker}</p>
          <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{heading}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-b16 text-primary-blue/85">{lede}</p>
        </div>

        <div className="sticky top-[88px] z-sticky mb-6 rounded-2xl border border-dark-gray/15 bg-white/95 p-4 shadow-e1 backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={18}
                weight="bold"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search test name or alias…"
                aria-label="Search lab tests"
                className="search-input !rounded-xl"
              />
            </div>
            <select
              value={specimen}
              onChange={(e) => setSpecimen(e.target.value)}
              aria-label="Filter by specimen"
              className="min-h-[44px] rounded-xl border border-dark-gray/25 bg-white px-4 text-b14 text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40"
            >
              <option value="all">All specimens</option>
              {specimens.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={turnaround}
              onChange={(e) => setTurnaround(e.target.value)}
              aria-label="Filter by turnaround time"
              className="min-h-[44px] rounded-xl border border-dark-gray/25 bg-white px-4 text-b14 text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40"
            >
              <option value="all">All turnaround times</option>
              {turnarounds.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as SourceFilter)}
              aria-label="Filter by source"
              className="min-h-[44px] rounded-xl border border-dark-gray/25 bg-white px-4 text-b14 text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40"
            >
              <option value="all">In-house & outsourced</option>
              <option value="in-house">In-house</option>
              <option value="outsourced">Outsourced</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              role="tab"
              aria-selected={category === 'all'}
              aria-label={`All, ${categoryCounts.all ?? 0}`}
              className={cn('chip', category === 'all' && 'is-active')}
              onClick={() => setCategory('all')}
            >
              All
              <span className="chip-count">{categoryCounts.all ?? 0}</span>
            </button>
            {categories.map((cat) => {
              const count = categoryCounts[cat] ?? 0
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  aria-label={`${cat}, ${count}`}
                  className={cn('chip', category === cat && 'is-active')}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                  <span className="chip-count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="card mx-auto max-w-4xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-b14">
              <thead>
                <tr className="border-b border-dark-gray/15 bg-cardbg text-left">
                  <th className="px-4 py-3 font-semibold text-primary-blue">Test Name</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Category</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Reporting Time</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Specimen</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Source</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-primary-blue/70">
                      No tests match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((test, index) => (
                    <tr
                      key={`${test.slug}-${index}`}
                      className="cursor-pointer border-b border-dark-gray/15 transition-colors hover:bg-whitebg"
                      onClick={() => openTest(test)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          openTest(test)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${test.name}`}
                    >
                      <td className="px-4 py-3 font-semibold text-primary-blue">{test.name}</td>
                      <td className="px-4 py-3 text-primary-blue/85">{test.category}</td>
                      <td className="px-4 py-3 text-primary-blue/85">{test.reportingTime || '—'}</td>
                      <td className="px-4 py-3 text-primary-blue/85">{test.specimen || '—'}</td>
                      <td className="px-4 py-3">
                        {test.isOutsourced ? (
                          <span className="chip border-warning/40 bg-warning/10 text-b12 text-warning">
                            Outsourced
                          </span>
                        ) : (
                          <span className="text-b12 text-dark-gray">In-house</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <p className="border-t border-dark-gray/15 p-4 text-center text-b12 text-dark-gray">
            Showing {filtered.length} of {tests.length} tests — rates available at the hospital counter
          </p>
        </div>
      </div>

      <LabTestDrawer test={active} onClose={closeTest} />
    </section>
  )
}
