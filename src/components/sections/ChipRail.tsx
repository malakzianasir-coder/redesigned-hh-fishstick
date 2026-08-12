'use client'

import { ArrowSquareOut } from '@phosphor-icons/react'
import Link from 'next/link'

import { cn } from '@/utilities/ui'

export type ChipRailLink = {
  label: string
  href: string
  active?: boolean
}

type ChipRailProps = {
  label?: string
  items?: ChipRailLink[]
  externals?: ChipRailLink[]
  ariaLabel: string
  className?: string
}

function isHash(href: string) {
  return href.startsWith('#')
}

export function ChipRail({ label, items = [], externals = [], ariaLabel, className }: ChipRailProps) {
  if (!items.length && !externals.length) return null

  return (
    <nav className={cn('sticky-bar', className)} aria-label={ariaLabel}>
      <div className="container mx-auto px-6 py-4 lg:px-[30px]">
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
          {items.length > 0 ? (
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-2">
              {label ? <span className="field-label-text lg:mr-1">{label}</span> : null}
              {items.map((item) => {
                const className = cn('chip', item.active && 'is-active')
                if (isHash(item.href)) {
                  return (
                    <a key={`${item.href}-${item.label}`} href={item.href} className={className}>
                      {item.label}
                    </a>
                  )
                }
                return (
                  <Link key={`${item.href}-${item.label}`} href={item.href} className={className}>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ) : null}
          {items.length > 0 && externals.length > 0 ? (
            <div className="hidden h-6 w-px bg-dark-gray/15 lg:block" aria-hidden="true" />
          ) : null}
          {externals.length > 0 ? (
            <div className="flex flex-col items-center gap-2 lg:flex-wrap lg:flex-row lg:items-center lg:justify-center lg:gap-2">
              {externals.map((item) => (
                <a
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                  <ArrowSquareOut size={16} weight="bold" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
