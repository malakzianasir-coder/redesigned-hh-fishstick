'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { User } from '@phosphor-icons/react/dist/ssr'

import { CommitteeDrawer } from './CommitteeDrawer'
import type { CommitteeCard } from '@/lib/content/types'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import type { LeadershipRecord } from '@/lib/content/types'

function PortraitSlot({
  image,
  alt,
  size = 'photo',
}: {
  image?: string
  alt: string
  size?: 'photo' | 'logo'
}) {
  if (image) {
    const frame =
      size === 'logo'
        ? 'relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cardbg'
        : 'relative h-[132px] w-[104px] shrink-0 overflow-hidden rounded-xl bg-cardbg'
    return (
      <div className={frame}>
        <Image src={image} alt={alt} fill className="object-cover object-top" sizes="132px" />
      </div>
    )
  }

  if (size === 'logo') {
    return (
      <div className="logo-slot">
        <User size={24} weight="duotone" />
      </div>
    )
  }

  return (
    <div className="photo-slot">
      <User size={30} weight="duotone" />
      <small>Passport photo</small>
    </div>
  )
}

export function LeadershipContent({ page }: { page: LeadershipRecord }) {
  const [activeCommittee, setActiveCommittee] = useState<CommitteeCard | null>(null)
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

      {/* Our Founders */}
      <section id="our-founders" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Leadership & Governance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Founders</h2>
          </div>
          <div className="card-grid card-grid--2">
            {page.founders.map((founder) => (
              <article key={founder.name} className="card-interactive flex flex-col gap-4 p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <PortraitSlot image={founder.image} alt={founder.name} />
                  <div className="flex-1">
                    <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">
                      {founder.href ? (
                        <Link href={founder.href} className="transition-colors hover:text-primary-red">
                          {founder.name}
                        </Link>
                      ) : (
                        founder.name
                      )}
                      {founder.years ? (
                        <span className="font-normal text-dark-gray"> ({founder.years})</span>
                      ) : null}
                    </h3>
                    <p className="text-b14 text-dark-gray">{founder.role}</p>
                  </div>
                </div>
                {founder.body.map((paragraph) => (
                  <p key={paragraph} className="text-b16 text-primary-blue/85">
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
        </div>
      </section>

      {/* Our Chairpersons */}
      <section id="our-chairpersons" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Leadership & Governance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Chairpersons</h2>
          </div>
          <ol className="tenure-rail flex w-full flex-col gap-6">
            {page.chairpersons.map((entry) => (
              <li key={entry.name} className="flex items-start gap-5">
                <span className="tenure-dot" aria-hidden="true" />
                <article className="card-interactive flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <PortraitSlot image={entry.image} alt={entry.name} size="logo" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">
                        {entry.href ? (
                          <Link href={entry.href} className="transition-colors hover:text-primary-red">
                            {entry.name}
                          </Link>
                        ) : (
                          entry.name
                        )}
                      </h3>
                      <p className="text-b14 text-dark-gray">{entry.years}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Our Presidents */}
      <section id="our-presidents" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Leadership & Governance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Our Presidents</h2>
          </div>
          <ol className="tenure-rail flex w-full flex-col gap-6">
            {page.presidents.map((entry) => (
              <li key={entry.name} className="flex items-start gap-5">
                <span className="tenure-dot" aria-hidden="true" />
                <article className="card-interactive flex flex-1 flex-col gap-4 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <PortraitSlot image={entry.image} alt={entry.name} size="logo" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-h5M font-bold text-primary-blue lg:text-h5">
                        {entry.href ? (
                          <Link href={entry.href} className="transition-colors hover:text-primary-red">
                            {entry.name}
                          </Link>
                        ) : (
                          entry.name
                        )}
                      </h3>
                      <p className="text-b14 text-dark-gray">{entry.years}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Senior Management */}
      <section id="senior-management" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Leadership & Governance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Senior Management</h2>
          </div>
          <div className="card-grid card-grid--3">
            {page.seniorManagement.map((member) => (
              <article key={member.name} className="card-interactive flex items-center gap-4 p-5">
                <PortraitSlot image={member.image} alt={member.name} size="logo" />
                <div>
                  <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{member.name}</h3>
                  <p className="text-b14 text-dark-gray">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Committee */}
      <section id="executive-committee" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Leadership & Governance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Executive Committee</h2>
            {page.executiveCommitteeLede ? (
              <p className="text-b16 text-primary-blue/85">{page.executiveCommitteeLede}</p>
            ) : null}
          </div>
          <ol className="card-grid card-grid--3-xl4">
            {page.executiveCommittee.map((name, index) => (
              <li key={name} className="card flex items-center gap-3 p-4">
                <span className="num-badge">{index + 1}</span>
                <span className="text-b14 font-semibold text-primary-blue">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Core Committees */}
      <section id="core-committees" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Leadership & Governance</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Core Committees</h2>
          </div>
          <div className="card-grid card-grid--3">
            {page.coreCommittees.map((committee) => {
              const IconComponent = MARKETING_ICON_MAP[committee.icon as keyof typeof MARKETING_ICON_MAP]
              return (
                <button
                  key={committee.name}
                  type="button"
                  onClick={() => setActiveCommittee(committee)}
                  className="card-interactive text-left flex flex-col gap-2 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2"
                >
                  {IconComponent ? (
                    <span className="icon-tile">
                      <IconComponent size={22} weight="duotone" />
                    </span>
                  ) : null}
                  <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{committee.name}</h3>
                </button>
              )
            })}
          </div>

          <CommitteeDrawer
            committee={activeCommittee}
            onClose={() => setActiveCommittee(null)}
            exOfficioNote={page.coreCommitteesNote}
          />
        </div>
      </section>

      <MarketingSupportCTA />
    </article>
  )
}
