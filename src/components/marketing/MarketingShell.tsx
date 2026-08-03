import Link from 'next/link'

import type { JumpLink } from '@/lib/content/types'

type MarketingBreadcrumbProps = {
  items: { label: string; href?: string }[]
}

export function MarketingBreadcrumb({ items }: MarketingBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-dark-gray/15 bg-white">
      <div className="container mx-auto px-6 py-3 lg:px-[30px]">
        <ol className="flex flex-wrap items-center gap-2 text-b14 text-dark-gray">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-dark-gray/40">/</span> : null}
              {item.href ? (
                <Link href={item.href} className="text-primary-blue transition-colors hover:text-primary-red">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-primary-blue">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export function JumpNav({ links }: { links: JumpLink[] }) {
  return (
    <nav className="sticky-bar" aria-label="On this page">
      <div className="container mx-auto px-6 py-3 lg:px-[30px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="field-label-text mr-1">On this page</span>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="chip">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
