import Link from 'next/link'

type MarketingBreadcrumbProps = {
  items: { label: string; href?: string }[]
}

export function MarketingBreadcrumb({ items }: MarketingBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-dark-gray/15 bg-white pt-[var(--header-h-expanded)]">
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

export { JumpNav } from '@/components/sections/JumpNav'
