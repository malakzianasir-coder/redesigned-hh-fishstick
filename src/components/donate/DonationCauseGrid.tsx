import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { BlockHeader } from '@/components/site/BlockHeader'
import type { DonationCauseCard } from '@/lib/content/types'

import { DONATION_ICON_MAP } from './donationIcons'

type DonationCauseGridProps = {
  id: string
  kicker: string
  heading: string
  lede?: string
  causes: DonationCauseCard[]
  background?: 'white' | 'whitebg'
}

export function DonationCauseGrid({
  id,
  kicker,
  heading,
  lede,
  causes,
  background = 'whitebg',
}: DonationCauseGridProps) {
  return (
    <section
      id={id}
      className={`section-anchor border-t border-dark-gray/15 ${background === 'white' ? 'bg-white' : 'bg-whitebg'}`}
    >
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker={kicker} title={heading} lede={lede} />
        <div className="card-grid card-grid--3">
          {causes.map((cause) => {
            const IconComponent = DONATION_ICON_MAP[cause.icon as keyof typeof DONATION_ICON_MAP]
            return (
              <Link
                key={cause.slug}
                href={cause.href}
                className="card-interactive group flex flex-col gap-3 p-6"
              >
                {IconComponent ? (
                  <span className="icon-tile">
                    <IconComponent size={22} weight="duotone" />
                  </span>
                ) : null}
                <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                  {cause.title}
                </h3>
                <p className="text-b14 text-primary-blue/85">{cause.excerpt}</p>
                {cause.meta ? <p className="text-b12 text-dark-gray">{cause.meta}</p> : null}
                <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                  {cause.linkLabel ?? 'Learn more'}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
