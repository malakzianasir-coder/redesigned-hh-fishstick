'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { cn } from '@/utilities/ui'

type CategoryFilterProps = {
  categories: string[]
  tags?: string[]
  basePath: string
  paramName?: 'category' | 'tag'
  label?: string
  counts?: Record<string, number>
  allCount?: number
}

export function CategoryFilter({
  categories,
  tags = [],
  basePath,
  paramName = 'category',
  label = 'Filter',
  counts,
  allCount,
}: CategoryFilterProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeValue = searchParams.get(paramName)

  const options =
    paramName === 'tag'
      ? tags.map((tag) => ({ value: tag, label: tag }))
      : categories.map((category) => ({ value: category, label: category }))

  if (options.length === 0) return null

  function buildHref(value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(paramName, value)
    } else {
      params.delete(paramName)
    }
    const query = params.toString()
    const path = pathname === basePath ? basePath : basePath
    return query ? `${path}?${query}` : path
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="field-label-text">{label}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Link
          href={buildHref(null)}
          className={cn('chip', !activeValue && 'is-active')}
          aria-label={allCount != null ? `All, ${allCount}` : 'All'}
        >
          All
          {allCount != null ? <span className="chip-count">{allCount}</span> : null}
        </Link>
        {options.map((option) => {
          const count = counts?.[option.value]
          return (
            <Link
              key={option.value}
              href={buildHref(option.value)}
              className={cn('chip', activeValue === option.value && 'is-active')}
              aria-label={count != null ? `${option.label}, ${count}` : option.label}
            >
              {option.label}
              {count != null ? <span className="chip-count">{count}</span> : null}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
