import Link from 'next/link'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { SupportCauseIcon, WhatYouCanSupportNav } from '@/components/donate/WhatYouCanSupportNav'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import type { WhatYouCanSupportCause, WhatYouCanSupportContent } from '@/lib/content/types'

type WhatYouCanSupportCauseContentProps = {
  hub: WhatYouCanSupportContent
  cause: WhatYouCanSupportCause
}

export function WhatYouCanSupportCauseContent({ hub, cause }: WhatYouCanSupportCauseContentProps) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: 'What You Can Support', href: '/donate/what-you-can-support' },
          { label: cause.title },
        ]}
      />
      <MarketingHeroSection hero={cause.hero} />
      <WhatYouCanSupportNav causes={hub.causes} activeSlug={cause.slug} />

      <section className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader kicker="Donate" title={cause.tagline} />
          <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
            {cause.body.map((paragraph) => (
              <p key={paragraph} className="text-b16 leading-[150%] text-primary-blue/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {cause.impactTable ? <ImpactTableBlock table={cause.impactTable} /> : null}

      {cause.optionItems && cause.optionItems.length > 0 ? (
        <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <BlockHeader
              kicker="Donate"
              title={cause.listHeading || 'Ways to help'}
            />
            <div className="card-grid card-grid--2">
              {cause.optionItems.map((item) => (
                <InteractiveCard as="article" key={item.title} className="flex flex-col gap-3 p-6">
                  <span className="icon-tile">
                    <SupportCauseIcon name={cause.icon} />
                  </span>
                  <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{item.title}</h3>
                  <p className="text-b14 leading-[150%] text-primary-blue/85">{item.body}</p>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {cause.items && cause.items.length > 0 ? (
        <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <BlockHeader kicker="Details" title={cause.listHeading || 'Details'} />
            <div className="card-grid card-grid--3">
              {cause.items.map((item) => (
                <InteractiveCard as="article" key={item} className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary-red" aria-hidden />
                  <p className="text-b14 font-semibold leading-[150%] text-primary-blue">{item}</p>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-anchor border-t border-dark-gray/15 bg-white">
        <div className="container mx-auto flex max-w-3xl flex-col gap-4 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
          {cause.closing.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0 && cause.closing.length > 1
                  ? 'text-b18 font-semibold leading-[150%] text-primary-blue'
                  : 'text-b16 leading-[150%] text-primary-blue/85'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="How to Donate"
            title={`Support ${cause.title}`}
            lede="Choose the donation method that is most convenient for you."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/donate/how-to-donate" className="btn-primary">
              View donation methods
            </Link>
            <Link href="/donate/what-you-can-support" className="btn-ghost">
              All support options
            </Link>
          </div>
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}

function ImpactTableBlock({
  table,
}: {
  table: NonNullable<WhatYouCanSupportCause['impactTable']>
}) {
  return (
    <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
      <div className="container mx-auto flex flex-col gap-6 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <BlockHeader kicker="Impact" title={table.heading} lede={table.intro} />
        <InteractiveCard as="div" className="overflow-hidden">
          <div className="hidden border-b border-dark-gray/15 bg-cardbg px-4 py-3 text-b12 font-semibold uppercase tracking-kicker text-dark-gray sm:grid sm:grid-cols-2 sm:gap-4">
            <span>Donation</span>
            <span>Impact</span>
          </div>
          {table.rows.map((row) => (
            <div
              key={row.amount}
              className="grid grid-cols-1 gap-1 border-b border-dark-gray/15 px-4 py-3 last:border-b-0 sm:grid-cols-2 sm:items-baseline sm:gap-4"
            >
              <p className="text-b16 font-bold text-primary-red">{row.amount}</p>
              <p className="text-b14 text-primary-blue/85">{row.impact}</p>
            </div>
          ))}
        </InteractiveCard>
        {table.note ? (
          <p className="text-center text-b12 text-dark-gray">{table.note}</p>
        ) : null}
      </div>
    </section>
  )
}
