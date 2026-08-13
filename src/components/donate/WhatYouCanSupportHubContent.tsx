import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { SupportCauseIcon, WhatYouCanSupportNav } from '@/components/donate/WhatYouCanSupportNav'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import type { WhatYouCanSupportContent } from '@/lib/content/types'

export function WhatYouCanSupportHubContent({ content }: { content: WhatYouCanSupportContent }) {
  const causes = [...content.causes].sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Donate', href: '/donate' },
          { label: content.title },
        ]}
      />
      <MarketingHeroSection hero={content.hero} />
      <WhatYouCanSupportNav causes={causes} />

      <section className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Donate"
            title="Choose how your gift makes an impact"
            lede="From nourishing meals and essential supplies to patient sponsorships, free surgeries, and hospital projects — every contribution strengthens care for deserving patients."
          />
          <div className="card-grid card-grid--3">
            {causes.map((cause) => (
              <Link
                key={cause.slug}
                href={`/donate/what-you-can-support/${cause.slug}`}
                className="card-interactive group flex flex-col gap-3 p-6"
              >
                <span className="icon-tile">
                  <SupportCauseIcon name={cause.icon} />
                </span>
                <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                  {cause.title}
                </h3>
                <p className="text-b14 leading-[150%] text-primary-blue/85">{cause.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                  View {cause.title}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
        <div className="container mx-auto flex flex-col items-center gap-6 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            className="w-full max-w-3xl"
            kicker="How to Donate"
            title="Ready to give?"
            lede="Choose the donation method that is most convenient for you — online, mobile wallet, bank transfer, and more."
          />
          <Link href="/donate/how-to-donate" className="btn-primary">
            View donation methods
          </Link>
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}
