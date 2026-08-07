import Link from 'next/link'

import {
  MARKETING_ICON_MAP,
  type MarketingIconName,
} from '@/components/marketing/marketingIcons'
import type { HowToDonateMethod } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type HowToDonateMethodNavProps = {
  methods: HowToDonateMethod[]
  activeSlug?: string
}

export function HowToDonateMethodNav({ methods, activeSlug }: HowToDonateMethodNavProps) {
  return (
    <nav
      className="border-y border-dark-gray/15 bg-white"
      aria-label="Donation methods"
    >
      <div className="container mx-auto px-6 py-3 lg:px-[30px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="field-label-text mr-1">Methods</span>
          <Link
            href="/donate/how-to-donate"
            className={cn('chip', !activeSlug && 'is-active')}
          >
            Overview
          </Link>
          {methods.map((method) => (
            <Link
              key={method.slug}
              href={`/donate/how-to-donate/${method.slug}`}
              className={cn('chip', activeSlug === method.slug && 'is-active')}
            >
              {method.navLabel}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function HowToDonateMethodIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = MARKETING_ICON_MAP[name as MarketingIconName]
  if (!Icon) return null
  return <Icon size={size} weight="duotone" />
}
