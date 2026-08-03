'use client'

import { MagnifyingGlass } from '@phosphor-icons/react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import type { LabTestRecord } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type LabTestsTableProps = {
  kicker: string
  heading: string
  lede: string
  categories: string[]
  tests: LabTestRecord[]
}

export function LabTestsTable({ kicker, heading, lede, categories, tests }: LabTestsTableProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tests.filter((test) => {
      if (category !== 'all' && test.category !== category) return false
      if (q && !test.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [tests, search, category])

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mb-8 text-center">
          <p className="kicker">{kicker}</p>
          <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{heading}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-b16 text-primary-blue/85">{lede}</p>
        </div>

        <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-4">
          <div className="relative">
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
              placeholder="Search test name…"
              aria-label="Search lab tests"
              className="search-input !rounded-xl"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              role="tab"
              aria-selected={category === 'all'}
              className={cn('chip', category === 'all' && 'is-active')}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                className={cn('chip', category === cat && 'is-active')}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="card mx-auto max-w-4xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-b14">
              <thead>
                <tr className="border-b border-dark-gray/15 bg-cardbg text-left">
                  <th className="px-4 py-3 font-semibold text-primary-blue">Test Name</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Category</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Reporting Time</th>
                  <th className="px-4 py-3 font-semibold text-primary-blue">Specimen</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-primary-blue/70">
                      No tests match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((test) => (
                    <tr key={test.slug} className="border-b border-dark-gray/15 transition-colors hover:bg-whitebg">
                      <td className="px-4 py-3 font-semibold text-primary-blue">{test.name}</td>
                      <td className="px-4 py-3 text-primary-blue/85">{test.category}</td>
                      <td className="px-4 py-3 text-primary-blue/85">{test.reportingTime || '—'}</td>
                      <td className="px-4 py-3 text-primary-blue/85">{test.specimen || '—'}</td>
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

        <p className="mx-auto mt-6 max-w-4xl text-center text-b14 text-dark-gray">
          For pathology services and booking, visit{' '}
          <Link href="/services/pathology" className="font-semibold text-primary-red hover:text-primary-blue">
            Pathology service →
          </Link>
        </p>
      </div>
    </section>
  )
}
