import { ArrowSquareOut, BuildingOffice } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import type { OurSupportersRecord } from '@/lib/content/types'

export function OurSupportersContent({ page }: { page: OurSupportersRecord }) {
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

      <section id="our-friends" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Our Friends / Supporters</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Friends / Supporters</h2>
          </div>
          <p className="max-w-2xl text-b16 text-primary-blue/85">{page.intro}</p>
        </div>
      </section>

      <section id="donor-wall" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Donor Wall</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">
              {page.donorWallHeading || 'Our Friends & Supporters'}
            </h2>
            {page.donorWallLede ? (
              <p className="text-b16 text-primary-blue/85">{page.donorWallLede}</p>
            ) : null}
          </div>
          <div className="card-grid card-grid--4">
            {page.donors.map((donor) => {
              const inner = (
                <>
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="num-badge">
                      {donor.sn}
                    </span>
                    {donor.href ? (
                      <span className="inline-flex items-center gap-1 text-b12 font-semibold text-dark-gray group-hover:text-primary-red">
                        <ArrowSquareOut size={14} />
                        Website
                      </span>
                    ) : null}
                  </div>
                  {donor.logo ? (
                    <div className="relative h-16 w-full max-w-[140px]">
                      <Image
                        src={donor.logo}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  ) : (
                    <div className="logo-slot">
                      <BuildingOffice size={24} weight="duotone" />
                    </div>
                  )}
                  <p className="text-b14 font-semibold text-primary-blue">{donor.name}</p>
                </>
              )

              if (donor.href) {
                return (
                  <a
                    key={donor.sn}
                    href={donor.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-interactive group flex flex-col items-center gap-3 p-4 text-center"
                  >
                    {inner}
                  </a>
                )
              }

              return (
                <article key={donor.sn} className="card flex flex-col items-center gap-3 p-4 text-center">
                  {inner}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <MarketingSupportCTA id="support" className="section-anchor" />
    </article>
  )
}
