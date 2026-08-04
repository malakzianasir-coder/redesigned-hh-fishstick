'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { cn } from '@/utilities/ui'

type CategoryFilterProps = {
  categories: string[]
  tags?: string[]
  basePath: string
  paramName?: 'category' | 'tag'
  label?: string
}

export function CategoryFilter({
  categories,
  tags = [],
  basePath,
  paramName = 'category',
  label = 'Filter',
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
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref(null)}
          className={cn('chip', !activeValue && 'bg-primary-blue text-white')}
        >
          All
        </Link>
        {options.map((option) => (
          <Link
            key={option.value}
            href={buildHref(option.value)}
            className={cn('chip', activeValue === option.value && 'bg-primary-blue text-white')}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
