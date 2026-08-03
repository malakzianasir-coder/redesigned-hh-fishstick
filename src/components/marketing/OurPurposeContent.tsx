import Image from 'next/image'
import Link from 'next/link'
import { User, UserTie } from '@phosphor-icons/react/dist/ssr'

import { JourneyTimeline } from '@/components/marketing/JourneyTimeline'
import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import type { OurPurposeRecord } from '@/lib/content/types'

export function OurPurposeContent({ page }: { page: OurPurposeRecord }) {
  const EyeIcon = MARKETING_ICON_MAP.Eye
  const HandHeartIcon = MARKETING_ICON_MAP.HandHeart

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

      <section id="vision-mission" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Vision & Mission</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              <p className="relative text-b16 text-white/85">&ldquo;{page.mission}&rdquo;</p>
            </article>
          </div>
        </div>
      </section>

      <section id="our-journey" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Journey</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our journey</h2>
            <p className="text-b16 text-primary-blue/85">
              Select a year to read each milestone. Full text is preserved verbatim from the source document.
            </p>
          </div>
          <JourneyTimeline milestones={page.journey} />
        </div>
      </section>

      <section id="our-philosophy" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Philosophy</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{page.philosophy.heading}</h2>
            <p className="text-b16 text-primary-blue/85">{page.philosophy.body}</p>
          </div>
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
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Approach</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Approach</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Values</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Values</h2>
            <p className="text-b16 text-primary-blue/85">{page.valuesIntro}</p>
          </div>
          <div>
            <h3 className="mb-6 text-center text-h5M font-bold text-primary-blue lg:text-h5">Our Core Values</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">Our Compliance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Compliance</h2>
            <p className="text-b16 text-primary-blue/85">{page.complianceIntro}</p>
          </div>
          <div className="flex flex-col gap-10">
            {page.compliance.map((group) => {
              const IconComponent = MARKETING_ICON_MAP[group.icon as keyof typeof MARKETING_ICON_MAP]
              return (
                <div key={group.kicker} className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-2 lg:justify-start">
                    {IconComponent ? (
                      <span className="icon-tile">
                        <IconComponent size={22} weight="duotone" />
                      </span>
                    ) : null}
                    <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">{group.kicker}</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <div key={item.title} className="flex flex-col gap-2 rounded-2xl border border-dark-gray/15 bg-white p-5">
                        {item.logo ? (
                          <div className="relative mb-1 h-10 w-28">
                            <Image src={item.logo} alt="" fill className="object-contain object-left" />
                          </div>
                        ) : null}
                        <p className="field-label-text">{item.label}</p>
                        <p className="text-b14 font-semibold leading-[150%] text-primary-blue">{item.title}</p>
                        <p className="text-b12 leading-[150%] text-dark-gray">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {page.foundersTeaser && page.foundersTeaser.length > 0 ? (
        <section id="our-founders" className="section-anchor bg-white">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">Leadership & Governance</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Founders</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {page.foundersTeaser.map((founder) => (
                <article key={founder.name} className="card-interactive flex flex-col gap-4 p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="logo-slot">
                      <User size={24} weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">
                        {founder.href ? (
                          <Link href={founder.href} className="transition-colors hover:text-primary-red">
                            {founder.name}
                          </Link>
                        ) : (
                          founder.name
                        )}
                      </h3>
                      <p className="text-b14 text-dark-gray">{founder.role}</p>
                    </div>
                  </div>
                  {founder.body.map((paragraph) => (
                    <p key={paragraph} className="text-b14 text-primary-blue/85">
                      {paragraph}
                    </p>
                  ))}
                  {founder.href ? (
                    <Link
                      href={founder.href}
                      className="mt-auto text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                    >
                      Read full biography →
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
            {page.foundersCta ? (
              <p className="text-center text-b14 text-dark-gray">
                <Link
                  href={page.foundersCta.href}
                  className="font-semibold text-primary-blue transition-colors hover:text-primary-red"
                >
                  {page.foundersCta.label} →
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.leadershipMessagesTeaser ? (
        <section id="leadership-messages" className="section-anchor bg-whitebg">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">{page.leadershipMessagesTeaser.kicker}</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{page.leadershipMessagesTeaser.title}</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {page.leadershipMessagesTeaser.items.map((item) => (
                <article key={item.title} className="card-interactive flex flex-col gap-4 p-6 lg:p-8">
                  <div className="flex items-start gap-4">
                    <div className="logo-slot">
                      <UserTie size={24} weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">
                        <Link href={item.href} className="transition-colors hover:text-primary-red">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-b14 text-dark-gray">{item.name} · {item.role}</p>
                    </div>
                  </div>
                  {item.body.map((paragraph) => (
                    <p key={paragraph} className="text-b14 text-primary-blue/85">
                      {paragraph}
                    </p>
                  ))}
                  <Link
                    href={item.href}
                    className="mt-auto text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                  >
                    Read full message →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.consultants ? (
        <section id="our-doctors" className="section-anchor bg-white">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">{page.consultants.kicker}</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{page.consultants.title}</h2>
              {page.consultants.lede ? (
                <p className="text-b16 text-primary-blue/85">{page.consultants.lede}</p>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {page.consultants.items.map((doctor) => (
                <Link
                  key={doctor.name}
                  href={doctor.href || '/doctors'}
                  className="card-interactive flex flex-col gap-1 p-4 text-center"
                >
                  <p className="text-h6 font-bold text-primary-blue">{doctor.name}</p>
                  <p className="text-b14 text-dark-gray">{doctor.role}</p>
                </Link>
              ))}
            </div>
            {page.consultants.cta ? (
              <p className="text-center">
                <Link href={page.consultants.cta.href} className="btn-ghost inline-flex">
                  {page.consultants.cta.label}
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.impactTeaser ? (
        <section id="our-impact" className="section-anchor bg-whitebg">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">{page.impactTeaser.kicker}</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{page.impactTeaser.title}</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {page.impactTeaser.cards.map((card) => (
                <article key={card.title} className="card-interactive flex flex-col gap-3 p-6">
                  <h3 className="text-h6 font-bold text-primary-blue">{card.title}</h3>
                  {card.subtitle ? (
                    <p className="text-b14 font-semibold text-primary-blue">{card.subtitle}</p>
                  ) : null}
                  <p className="text-b14 text-primary-blue/85">{card.body}</p>
                </article>
              ))}
            </div>
            {page.impactTeaser.cta ? (
              <p className="text-center">
                <Link href={page.impactTeaser.cta.href} className="btn-ghost inline-flex">
                  {page.impactTeaser.cta.label}
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      {page.departmentsTeaser ? (
        <section className="section-anchor bg-white">
          <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="flex flex-col gap-[6px] text-center">
              <p className="kicker">{page.departmentsTeaser.kicker}</p>
              <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{page.departmentsTeaser.title}</h2>
              {page.departmentsTeaser.lede ? (
                <p className="text-b16 text-primary-blue/85">{page.departmentsTeaser.lede}</p>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {page.departmentsTeaser.items.map((dept) => (
                <Link key={dept.title} href={dept.href} className="card-interactive flex flex-col gap-2 p-5">
                  <h3 className="text-h6 font-bold text-primary-blue">{dept.title}</h3>
                  <p className="text-b14 text-primary-blue/85">{dept.body}</p>
                </Link>
              ))}
            </div>
            {page.departmentsTeaser.cta ? (
              <p className="text-center">
                <Link href={page.departmentsTeaser.cta.href} className="btn-ghost inline-flex">
                  {page.departmentsTeaser.cta.label}
                </Link>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <MarketingSupportCTA />
    </article>
  )
}
