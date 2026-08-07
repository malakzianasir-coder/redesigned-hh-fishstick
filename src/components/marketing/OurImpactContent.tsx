import {
  Buildings,
  GraduationCap,
  Hospital,
  Medal,
  Microscope,
  Student,
  Trophy,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { HeadlineStatsGrid } from '@/components/marketing/HeadlineStatsGrid'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import type { OurImpactRecord } from '@/lib/content/types'

export function OurImpactContent({ page }: { page: OurImpactRecord }) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/our-purpose' },
          { label: page.title },
        ]}
      />
      <MarketingHeroSection hero={page.hero} />
      <JumpNav links={page.jumpLinks} />

      {page.award ? (
        <section id="award" className="section-anchor bg-white">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">{page.award.kicker}</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{page.award.kicker}</h2>
            </div>
            <article className="card-interactive flex flex-col items-start gap-6 p-6 lg:flex-row lg:p-8">
              <div className="logo-slot h-24 w-24 text-[36px]">
                <Medal size={36} weight="duotone" />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <span className="icon-tile">
                  <Trophy size={22} weight="duotone" />
                </span>
                <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{page.award.title}</h3>
                {page.award.body.map((paragraph) => (
                  <p key={paragraph} className="text-b16 text-primary-blue/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {page.healthPartners ? (
        <section id="health-partners" className="section-anchor bg-whitebg">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">Our Health Partners</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Health Partners</h2>
              <p className="mx-auto max-w-3xl text-b16 text-primary-blue/85">{page.healthPartners.intro}</p>
            </div>
            {page.healthPartners.groups.map((group) => {
              const IconComponent = group.icon ? MARKETING_ICON_MAP[group.icon as keyof typeof MARKETING_ICON_MAP] : null
              return (
                <article key={group.title} className="card flex flex-col gap-5 p-6 lg:p-8">
                  <div className="flex items-center gap-4">
                    {group.label === 'Teaching Hospital Partner' ? (
                      <div className="logo-slot">
                        <Hospital size={24} weight="duotone" aria-hidden />
                      </div>
                    ) : IconComponent ? (
                      <span className="icon-tile">
                        <IconComponent size={22} weight="duotone" />
                      </span>
                    ) : null}
                    <div className="flex flex-col gap-1">
                      <p className="field-label-text">{group.label}</p>
                      <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{group.title}</h3>
                    </div>
                  </div>
                  {group.body.map((paragraph) => (
                    <p key={paragraph} className="text-b16 text-primary-blue/85">
                      {paragraph}
                    </p>
                  ))}
                  {group.partners && group.partners.length > 0 ? (
                    <div
                      className={`card-grid mt-2 ${group.partners.length === 2 ? 'card-grid--2' : 'card-grid--3'}`}
                    >
                      {group.partners.map((partner) => {
                        const PartnerIcon = partner.icon
                          ? MARKETING_ICON_MAP[partner.icon as keyof typeof MARKETING_ICON_MAP]
                          : null
                        return (
                          <div
                            key={partner.name}
                            className={`card-interactive flex gap-4 p-5 ${group.partners!.length > 2 ? 'flex-col items-center text-center' : 'items-center'}`}
                          >
                            <div className="logo-slot">
                              {PartnerIcon ? <PartnerIcon size={24} weight="duotone" /> : null}
                            </div>
                            <p className="text-b16 font-semibold text-primary-blue">{partner.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      <section id="facts-statistics" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Impact</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Facts & Statistics</h2>
            {page.factsStatsLede ? (
              <p className="text-b16 text-primary-blue/85">{page.factsStatsLede}</p>
            ) : null}
          </div>
          {(page.headlineStats?.length || page.serviceStats.length > 0) ? (
            <HeadlineStatsGrid
              primary={page.headlineStats ?? []}
              secondary={page.secondaryStats}
              serviceStats={page.serviceStats}
            />
          ) : null}
        </div>
      </section>

      {page.medicalTower ? (
        <section id="medical-tower" className="section-anchor relative overflow-hidden bg-primary-blue">
          <div className="pointer-events-none absolute bottom-0 left-1/4 aspect-square w-[250px] rounded-full bg-light-blue opacity-40 blur-[200px]" />
          <div className="container relative mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <div className="flex flex-col gap-[6px]">
                  <p className="kicker">Projects of HH</p>
                  <h2 className="text-h3M font-bold text-white lg:text-h3">
                    Inam Tasneem Waheed Medical Tower
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {page.medicalTower.chips.map((chip) => (
                    <span key={chip} className="stat-chip">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {page.medicalTower.body.map((paragraph) => (
                    <p key={paragraph} className="text-b16 text-white/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div>
                  <Link href={page.medicalTower.cta.href} className="btn-on-dark">
                    {page.medicalTower.cta.label}
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                {page.medicalTower.image ? (
                  <div className="relative aspect-video max-h-[320px] overflow-hidden rounded-xl">
                    <Image
                      src={page.medicalTower.image}
                      alt="Inam Tasneem Waheed Medical Tower"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video max-h-[320px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-white/25 bg-white/5 p-6 text-center text-white/70">
                    <Buildings size={32} weight="duotone" aria-hidden />
                    <small className="text-b12 font-semibold tracking-[0.02em]">
                      {page.medicalTower.placeholderLabel ||
                        'Medical Tower render / photograph placeholder'}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {page.eventsCalendar ? (
        <section id="events-calendar" className="section-anchor bg-white">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">Our Impact</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Events Calendar</h2>
              {page.eventsCalendar.lede ? (
                <p className="text-b16 text-primary-blue/85">{page.eventsCalendar.lede}</p>
              ) : null}
            </div>
            <div className="card p-4 lg:p-6">
              <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-x-6">
                {page.eventsCalendar.rows.map((row) => (
                  <div
                    key={`${row.date}-${row.event}`}
                    className="flex items-center gap-3.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-cardbg"
                  >
                    <span className="date-badge">{row.date}</span>
                    <span className="text-b16 font-semibold text-primary-blue">{row.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section id="highlights" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Impact</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Highlights</h2>
            {page.highlightsLede ? (
              <p className="text-b16 text-primary-blue/85">{page.highlightsLede}</p>
            ) : null}
          </div>
          <div className="card-grid card-grid--3">
            {page.highlights.map((item) => (
              <Link
                key={item.title}
                href={item.href || '/news'}
                className="card-interactive group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-card overflow-hidden bg-cardbg">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full min-h-[160px] items-center justify-center border-b border-dashed border-dark-gray/40 text-dark-gray">
                      Photo placeholder
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <span className="group-badge self-start">{item.date}</span>
                  <h3 className="text-h6M font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">
                    {item.title}
                  </h3>
                  <p className="line-clamp-3 text-b14 leading-[150%] text-primary-blue/85">{item.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}
