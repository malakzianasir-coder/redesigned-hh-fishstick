'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlass } from '@phosphor-icons/react'

import { Illustration } from '@/components/Illustration'
import { ILLUSTRATION_PRESETS } from '@/components/Illustration/presets'
import { BlockHeader } from '@/components/site/BlockHeader'
import { cn } from '@/utilities/ui'

const LIVE_PRESETS: Record<string, string> = {
  'page/patient-welfare': '/patient-welfare',
  'page/financial-assistance': '/patient-welfare/financial-assistance',
  'page/admission-process': '/patient-welfare/admission-process',
  'page/patient-rights': '/patient-welfare/patient-rights',
  'page/free-medical-camps': '/patient-welfare/free-medical-camps',
  'page/dialysis-support': '/patient-welfare/dialysis-support',
  'page/free-medicines': '/patient-welfare/free-medicines',
  'page/free-meals': '/patient-welfare/free-meals',
  'page/sehat-sahulat': '/patient-welfare/sehat-sahulat',
  'page/patient-information-guide': '/patient-welfare/patient-information-guide',
  'page/donate': '/donate',
  'page/thank-you': '/thank-you',
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live pages' },
  { id: 'departments', label: 'Departments' },
  { id: 'services', label: 'Services' },
  { id: 'pages', label: 'Pages' },
] as const

type FilterId = (typeof FILTERS)[number]['id']

type PresetEntry = {
  key: string
  title: string
  collection: string
  icon: string
  motif: string
  href?: string
}

const PRESETS: PresetEntry[] = Object.entries(ILLUSTRATION_PRESETS).map(([key, preset]) => ({
  key,
  title: preset.title || key,
  collection: preset.collection || 'pages',
  icon: preset.icon,
  motif: preset.motif || 'pulse',
  href: LIVE_PRESETS[key],
}))

export function IllustrationsCatalog() {
  const [filter, setFilter] = useState<FilterId>('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()

    return PRESETS.filter((preset) => {
      if (filter === 'live' && !preset.href) return false
      if (filter === 'departments' && preset.collection !== 'departments') return false
      if (filter === 'services' && preset.collection !== 'services') return false
      if (filter === 'pages' && preset.collection !== 'pages') return false
      if (!q) return true
      return (
        preset.title.toLowerCase().includes(q) ||
        preset.key.toLowerCase().includes(q) ||
        preset.icon.toLowerCase().includes(q)
      )
    })
  }, [filter, query])

  const groups =
    filter === 'all' || filter === 'live'
      ? [
          { id: 'live-group', label: 'Live pages', items: visible.filter((item) => item.href) },
          {
            id: 'departments-group',
            label: 'Departments',
            items: visible.filter((item) => item.collection === 'departments' && !item.href),
          },
          {
            id: 'services-group',
            label: 'Services',
            items: visible.filter((item) => item.collection === 'services' && !item.href),
          },
          {
            id: 'pages-group',
            label: 'Pages',
            items: visible.filter((item) => item.collection === 'pages' && !item.href),
          },
        ].filter((group) => group.items.length > 0)
      : [{ id: filter, label: FILTERS.find((item) => item.id === filter)?.label || '', items: visible }]

  return (
    <section id="presets" className="section-anchor bg-whitebg">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader
          kicker="Presets"
          title="Illustration catalog"
          lede="Every preset in ILLUSTRATION_PRESETS. Live-page keys match patient welfare, donate, and thank-you heroes. Catalog tiles are static so the grid stays readable."
        />

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn('chip', filter === item.id && 'is-active')}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-md">
            <MagnifyingGlass
              size={18}
              weight="bold"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-gray"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, preset key, or icon…"
              aria-label="Search illustration presets"
              className="search-input"
            />
          </div>
        </div>

        <p className="mt-4 text-b14 text-primary-blue/70">
          {visible.length} preset{visible.length === 1 ? '' : 's'}
        </p>

        {groups.length === 0 ? (
          <p className="mt-8 text-b16 text-primary-blue/85">No presets match that filter.</p>
        ) : (
          <div className="mt-8 flex flex-col gap-12">
            {groups.map((group) => (
              <div key={group.id}>
                <h3 className="text-h6 font-bold text-primary-blue">{group.label}</h3>
                <ul className="card-grid card-grid--3 mt-4">
                  {group.items.map((preset) => (
                    <li key={preset.key}>
                      <article className="card flex h-full flex-col p-5">
                        <div className="mx-auto aspect-square w-full max-w-[220px]">
                          <Illustration
                            preset={preset.key}
                            tone="light"
                            animate={false}
                            className="h-full w-full"
                          />
                        </div>
                        <p className="kicker mt-4">{preset.collection}</p>
                        <h4 className="text-h6 font-bold leading-[120%] text-primary-blue">
                          {preset.title}
                        </h4>
                        <p className="mt-1 font-mono text-b12 text-primary-blue/70">{preset.key}</p>
                        <p className="mt-1 text-b12 text-primary-blue/55">
                          {preset.icon} · {preset.motif}
                        </p>
                        {preset.href ? (
                          <Link
                            href={preset.href}
                            className="mt-3 text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                          >
                            View live page
                          </Link>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
