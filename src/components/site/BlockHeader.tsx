import Link from 'next/link'

import { sectionMeasureClasses } from '@/components/site/sectionMeasures'
import { cn } from '@/utilities/ui'

export type BlockHeaderProps = {
  kicker?: string
  title: string
  lede?: string
  cta?: {
    label: string
    href: string
  }
  className?: string
}

export function BlockHeader({ kicker, title, lede, cta, className }: BlockHeaderProps) {
  return (
    <div className={['block-header', className].filter(Boolean).join(' ')}>
      <div className="block-header__copy flex flex-col gap-[6px]">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">{title}</h2>
        {lede ? (
          <p className={cn('text-b16 leading-[150%] text-primary-blue/85', sectionMeasureClasses.lede)}>
            {lede}
          </p>
        ) : null}
      </div>
      {cta ? (
        <Link href={cta.href} className="btn-ghost block-header__action shrink-0">
          {cta.label}
        </Link>
      ) : null}
    </div>
  )
}
