import Image from 'next/image'

import { JourneyTimeline } from '@/components/marketing/JourneyTimeline'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { withJumpExternals } from '@/components/sections/withJumpExternals'
import { BlockHeader } from '@/components/site/BlockHeader'
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
          <BlockHeader kicker="Vision & Mission" title="Vision & Mission" />
          <div className="card-grid card-grid--2 mx-auto max-w-5xl">
            <article className="card-interactive flex flex-col gap-3 p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="icon-tile">
                  <EyeIcon size={22} weight="duotone" />
                </span>
                <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">Vision</h3>
              </div>
              <p className="text-b16 text-primary-blue/85">{page.vision}</p>
            </article>
            <article className="card-interactive relative flex flex-col gap-3 overflow-hidden border-primary-blue bg-primary-blue p-6 lg:p-8">
              <div className="pointer-events-none absolute right-0 top-0 aspect-square w-[180px] rounded-full bg-light-blue opacity-40 blur-[120px]" />
              <div className="relative flex items-center gap-3">
                <span className="icon-tile bg-white/10 text-white">
                  <HandHeartIcon size={22} weight="duotone" />
                </span>
                <h3 className="text-h5M font-bold text-white lg:text-h5">Mission</h3>
              </div>
              <p className="relative text-b16 text-white/85">{page.mission}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="our-journey" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader kicker="Our Journey" title="Our Journey" />
          <JourneyTimeline milestones={page.journey} />
        </div>
      </section>

      <section id="our-philosophy" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader
            kicker="Our Philosophy"
            title={page.philosophy.heading}
            lede={page.philosophy.body}
          />
          {page.philosophy.image ? (
            <div className="group relative aspect-video max-h-[320px] overflow-hidden rounded-xl">
              <Image
                src={page.philosophy.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : null}
        </div>
      </section>

      <section id="our-approach" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader kicker="Our Approach" title="Our Approach" />
          <div className="card-grid card-grid--4">
            {page.approach.map((item) => {
              const IconComponent = MARKETING_ICON_MAP[item.icon as keyof typeof MARKETING_ICON_MAP]
              return (
                <article key={item.title} className="card-interactive flex flex-col gap-3 p-6">
                  {IconComponent ? (
                    <span className="icon-tile">
                      <IconComponent size={22} weight="duotone" />
                    </span>
                  ) : null}
                  <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{item.title}</h3>
                  <p className="text-b14 text-primary-blue/85">{item.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="our-values" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader kicker="Our Values" title="Our Values" lede={page.valuesIntro} />
          <div>
            {/* <h3 className="mb-6 text-center text-h5M font-bold text-primary-blue lg:text-h5">Our Core Values</h3> */}
            <div className="card-grid card-grid--3">
              {page.values.map((item) => {
                const IconComponent = MARKETING_ICON_MAP[item.icon as keyof typeof MARKETING_ICON_MAP]
                return (
                  <article key={item.title} className="card-interactive flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3">
                      {IconComponent ? (
                        <span className="icon-tile">
                          <IconComponent size={22} weight="duotone" />
                        </span>
                      ) : null}
                      <h4 className="text-h6M font-bold text-primary-blue lg:text-h6">{item.title}</h4>
                    </div>
                    <p className="text-b14 text-primary-blue/85">{item.body}</p>
                  </article>
                )
              })}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-b16 text-primary-blue/85">
              {page.valuesOutro}
            </p>
          </div>
        </div>
      </section>

      <section id="our-compliance" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <BlockHeader kicker="Our Compliance" title="Our Compliance" lede={page.complianceIntro} />
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
