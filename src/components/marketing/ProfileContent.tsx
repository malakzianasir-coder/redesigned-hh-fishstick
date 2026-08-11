import { Briefcase, HandsPraying } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import type { ProfileRecord } from '@/lib/content/types'

export function ProfileContent({ profile }: { profile: ProfileRecord }) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/our-purpose' },
          { label: 'Leadership', href: '/leadership' },
          { label: profile.name },
        ]}
      />

      <section className="bg-white">
        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="card flex flex-col items-center gap-4 p-6">
                <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl bg-cardbg">
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  ) : (
                    <div className="photo-slot-lg">Portrait photograph placeholder</div>
                  )}
                </div>
                <p className="field-label-text">
                  {profile.role}
                  {profile.organization ? ` · ${profile.organization}` : ''}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px] text-center lg:col-span-8 lg:text-start">
              {profile.kicker ? <p className="kicker">{profile.kicker}</p> : null}
              <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{profile.name}</h1>
              {profile.years ? (
                <span className="group-badge inline-flex self-center lg:self-start">{profile.years}</span>
              ) : null}
              <p className="mt-2 text-b18 font-semibold text-primary-blue">{profile.role}</p>
              {profile.organization ? <p className="text-b16 text-dark-gray">{profile.organization}</p> : null}
              <div className="flex flex-wrap justify-center gap-3 pt-4 lg:justify-start">
                {profile.jumpLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={link.href === '#biography' ? 'btn-primary min-h-[44px] px-5 text-b14' : 'btn-ghost'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <JumpNav links={profile.jumpLinks} />

      <section id="biography" className="section-anchor bg-whitebg">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Biography</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Biography</h2>
          </div>
          <div className="flex max-w-[760px] flex-col gap-5">
            {profile.biography.map((paragraph) => (
              <p key={paragraph} className="text-b16 text-primary-blue/85">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership-roles" className="section-anchor bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center lg:w-1/2 lg:text-start">
            <p className="kicker">Credentials</p>
            <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">Leadership & Community Service</h2>
          </div>
          <div className="card p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="icon-tile">
                <Briefcase size={22} weight="duotone" />
              </span>
              <p className="text-b14 text-dark-gray">
                Roles held across healthcare, education, and welfare organizations
              </p>
            </div>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-x-8">
              {profile.roles.map((role) => (
                <div key={role} className="role-item">
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {profile.tribute ? (
        <section id="tribute" className="section-anchor bg-whitebg">
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <figure className="flex flex-col items-center gap-5 rounded-2xl border border-primary-red/15 bg-redbg p-8 text-center lg:p-12">
              <span className="icon-tile">
                <HandsPraying size={22} weight="duotone" />
              </span>
              <blockquote className="max-w-3xl font-display text-h4M italic text-primary-blue lg:text-h4">
                &ldquo;{profile.tribute.quote}&rdquo;
              </blockquote>
              <figcaption className="field-label-text">{profile.tribute.label}</figcaption>
            </figure>
          </div>
        </section>
      ) : null}

      <MarketingSupportCTA />
    </article>
  )
}
