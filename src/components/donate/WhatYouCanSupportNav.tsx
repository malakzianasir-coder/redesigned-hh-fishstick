import Link from 'next/link'

import {
  MARKETING_ICON_MAP,
  type MarketingIconName,
} from '@/components/marketing/marketingIcons'
import type { WhatYouCanSupportCause } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type WhatYouCanSupportNavProps = {
  causes: WhatYouCanSupportCause[]
  activeSlug?: string
}

export function WhatYouCanSupportNav({ causes, activeSlug }: WhatYouCanSupportNavProps) {
  return (
    <nav className="border-y border-dark-gray/15 bg-white" aria-label="What you can support">
      <div className="container mx-auto px-6 py-3 lg:px-[30px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="field-label-text mr-1">Support</span>
          <Link
            href="/donate/what-you-can-support"
            className={cn('chip', !activeSlug && 'is-active')}
          >
            Overview
          </Link>
          {causes.map((cause) => (
            <Link
              key={cause.slug}
              href={`/donate/what-you-can-support/${cause.slug}`}
              className={cn('chip', activeSlug === cause.slug && 'is-active')}
            >
              {cause.navLabel}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function SupportCauseIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = MARKETING_ICON_MAP[name as MarketingIconName]
  if (!Icon) return null
  return <Icon size={size} weight="duotone" />
}
