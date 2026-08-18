import Link from 'next/link'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { ArrowRight, EnvelopeSimple, Phone, PhoneCall } from '@phosphor-icons/react/dist/ssr'

import { HowToDonateMethodIcon, HowToDonateMethodNav } from '@/components/donate/HowToDonateMethodNav'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { BlockHeader } from '@/components/site/BlockHeader'
import type { HowToDonateContent } from '@/lib/content/types'

export function HowToDonateHubContent({ content }: { content: HowToDonateContent }) {
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
      <HowToDonateMethodNav methods={content.methods} />

      <section className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Donation Methods"
            title="Choose the method that works for you"
            lede="Supporting Hijaz Hospital Trust is simple, secure, and impactful. Choose the donation method that is most convenient for you."
          />
          <div className="card-grid card-grid--3">
            {content.methods.map((method) => (
              <InteractiveCard
                key={method.slug}
                href={`/donate/how-to-donate/${method.slug}`}
                className="flex flex-col gap-3 p-6"
              >
                <span className="icon-tile">
                  <HowToDonateMethodIcon name={method.icon} />
                </span>
                <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                  {method.title}
                </h3>
                <p className="text-b14 leading-[150%] text-primary-blue/85">{method.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">
                  View {method.title}
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-anchor border-t border-dark-gray/15 bg-whitebg">
        <div className="container mx-auto grid grid-cols-1 gap-8 px-6 py-[30px] lg:grid-cols-12 lg:gap-16 lg:px-[30px] lg:py-[60px]">
          <InteractiveCard as="div" className="flex flex-col gap-3 p-6 lg:col-span-5 lg:p-8">
            <p className="kicker">Receipts</p>
            <h2 className="text-h4M font-bold text-primary-blue lg:text-h4">
              {content.receipts.heading}
            </h2>
            <p className="text-b16 leading-[150%] text-primary-blue/85">{content.receipts.body}</p>
          </InteractiveCard>

          <InteractiveCard as="div" className="flex flex-col gap-5 border-primary-red/30 bg-redbg p-6 lg:col-span-7 lg:p-8">
            <div className="flex flex-col gap-2">
              <p className="kicker">Donations Office</p>
              <h2 className="text-h4M font-bold text-primary-blue lg:text-h4">
                {content.assistance.heading}
              </h2>
              <p className="text-b16 leading-[150%] text-primary-blue/85">{content.assistance.body}</p>
            </div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-dark-gray/15 bg-white p-4">
                <dt className="field-label-text mb-2 flex items-center gap-2">
                  <PhoneCall size={16} weight="duotone" />
                  UAN
                </dt>
                <dd>
                  <a
                    href={`tel:${content.assistance.uan.replace(/\s+/g, '')}`}
                    className="text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                  >
                    {content.assistance.uan}
                  </a>
                </dd>
              </div>
              <div className="rounded-2xl border border-dark-gray/15 bg-white p-4">
                <dt className="field-label-text mb-2 flex items-center gap-2">
                  <Phone size={16} weight="duotone" />
                  Phone
                </dt>
                <dd>
                  <a
                    href={`tel:${content.assistance.phone.replace(/\s+/g, '')}`}
                    className="text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                  >
                    {content.assistance.phone}
                  </a>
                </dd>
              </div>
              <div className="rounded-2xl border border-dark-gray/15 bg-white p-4">
                <dt className="field-label-text mb-2 flex items-center gap-2">
                  <EnvelopeSimple size={16} weight="duotone" />
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${content.assistance.email}`}
                    className="break-all text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                  >
                    {content.assistance.email}
                  </a>
                </dd>
              </div>
            </dl>
          </InteractiveCard>
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}
