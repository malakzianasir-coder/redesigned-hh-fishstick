import Image from 'next/image'

import { JourneyTimeline } from '@/components/marketing/JourneyTimeline'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { withJumpExternals } from '@/components/sections/withJumpExternals'
import { BlockHeader } from '@/components/site/BlockHeader'
import { CenteredSectionStack } from '@/components/site/CenteredSectionStack'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import type { OurPurposeRecord } from '@/lib/content/types'

export function OurPurposeContent({ page }: { page: OurPurposeRecord }) {
  const EyeIcon = MARKETING_ICON_MAP.Eye
  const HandHeartIcon = MARKETING_ICON_MAP.HandHeart

  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about-us' },
          { label: page.title },
        ]}
      />
      <MarketingHeroSection hero={page.hero} />
      <JumpNav links={withJumpExternals(page.jumpLinks, [{ label: 'About Us', href: '/about-us' }])} />

      <section id="vision-mission" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Vision & Mission"
            title={page.visionMissionHeading ?? 'Where We Aim'}
          />
          <div className="card-grid card-grid--2 mx-auto max-w-5xl">
            <InteractiveCard as="article" className="flex flex-col gap-3 p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="icon-tile">
                  <EyeIcon size={22} weight="duotone" />
                </span>
                <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">Vision</h3>
              </div>
              <p className="text-b16 text-primary-blue/85">{page.vision}</p>
            </InteractiveCard>
            <InteractiveCard as="article" className="relative flex flex-col gap-3 overflow-hidden border-primary-blue bg-primary-blue p-6 lg:p-8">
              <div className="pointer-events-none absolute right-0 top-0 aspect-square w-[180px] rounded-full bg-light-blue opacity-40 blur-[120px]" />
              <div className="relative flex items-center gap-3">
                <span className="icon-tile bg-white/10 text-white">
                  <HandHeartIcon size={22} weight="duotone" />
                </span>
                <h3 className="text-h5M font-bold text-white lg:text-h5">Mission</h3>
              </div>
              <p className="relative text-b16 text-white/85">{page.mission}</p>
            </InteractiveCard>
          </div>
        </div>
      </section>

      <section id="our-journey" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Our Journey"
            title={page.journeyHeading ?? 'How We Got Here'}
          />
          <JourneyTimeline milestones={page.journey} />
        </div>
      </section>

      <section id="our-philosophy" className="section-anchor bg-white">
        <div id="our-approach" className="sr-only" aria-hidden="true" />
        <div className="container mx-auto flex flex-col gap-10 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <CenteredSectionStack>
            <BlockHeader
              kicker="Our Philosophy"
              title={page.philosophy.heading}
              lede={page.philosophy.body}
            />
          </CenteredSectionStack>

          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
            <div className="flex flex-col items-center gap-[6px] text-center">
              <p className="kicker">Our Approach</p>
              <h3 className="text-h5M font-bold leading-[120%] text-primary-blue lg:text-h5">
                {page.approachHeading ?? 'How We Put Care Into Practice'}
              </h3>
            </div>
            <ul className="approach-list" aria-label="Our Approach">
              {page.approach.map((item) => {
                const IconComponent = MARKETING_ICON_MAP[item.icon as keyof typeof MARKETING_ICON_MAP]
                return (
                  <li key={item.title} className="approach-list__item">
                    {IconComponent ? (
                      <span className="icon-tile icon-tile--sm" aria-hidden="true">
                        <IconComponent size={18} weight="duotone" />
                      </span>
                    ) : null}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h3 className="approach-list__title">{item.title}</h3>
                      <p className="text-b14 leading-[150%] text-primary-blue/85">{item.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <section id="our-values" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <CenteredSectionStack>
            <BlockHeader
              kicker="Our Values"
              title={page.valuesHeading ?? 'The Standards We Hold'}
              lede={page.valuesIntro}
            />
          </CenteredSectionStack>
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
            <ul className="approach-list" aria-label="Our Values">
              {page.values.map((item) => {
                const IconComponent = MARKETING_ICON_MAP[item.icon as keyof typeof MARKETING_ICON_MAP]
                return (
                  <li key={item.title} className="approach-list__item">
                    {IconComponent ? (
                      <span className="icon-tile icon-tile--sm" aria-hidden="true">
                        <IconComponent size={18} weight="duotone" />
                      </span>
                    ) : null}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <h3 className="approach-list__title">{item.title}</h3>
                      <p className="text-b14 leading-[150%] text-primary-blue/85">{item.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="mx-auto max-w-[560px] text-center text-b16 leading-[150%] text-primary-blue/85">
              {page.valuesOutro}
            </p>
          </div>
        </div>
      </section>

      <section id="our-compliance" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Our Compliance"
            title={page.complianceHeading ?? 'How We Stay Accountable'}
            lede={page.complianceIntro}
          />
          <div className="flex flex-col gap-10">
            {page.compliance.map((group) => {
              const IconComponent = MARKETING_ICON_MAP[group.icon as keyof typeof MARKETING_ICON_MAP]
              return (
                <div key={group.kicker} className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-2">
                    {IconComponent ? (
                      <span className="icon-tile">
                        <IconComponent size={22} weight="duotone" />
                      </span>
                    ) : null}
                    <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{group.kicker}</h3>
                  </div>
                  <div className="card-grid card-grid--3">
                    {group.items.map((item) => {
                      const opensImage = Boolean(item.logo?.includes('certificate'))
                      const body = (
                        <>
                          {item.logo ? (
                            <div className="relative h-12 w-full max-w-[8rem]">
                              <Image
                                src={item.logo}
                                alt={opensImage ? item.title : ''}
                                fill
                                className="object-contain object-left"
                                sizes="128px"
                              />
                            </div>
                          ) : null}
                          {item.label ? <p className="field-label-text">{item.label}</p> : null}
                          <p className="text-b14 font-semibold leading-[150%] text-primary-blue">{item.title}</p>
                          {item.detail ? (
                            <p className="text-b12 leading-[150%] text-dark-gray">{item.detail}</p>
                          ) : null}
                        </>
                      )

                      if (opensImage && item.logo) {
                        return (
                          <a
                            key={item.title}
                            href={item.logo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-[7.5rem] flex-col gap-3 rounded-2xl border border-dark-gray/15 bg-white p-5 transition-colors hover:border-primary-red/40"
                          >
                            {body}
                          </a>
                        )
                      }

                      return (
                        <div
                          key={item.title}
                          className="flex min-h-[7.5rem] flex-col gap-3 rounded-2xl border border-dark-gray/15 bg-white p-5"
                        >
                          {body}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </article>
  )
}
