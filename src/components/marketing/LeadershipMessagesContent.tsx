import Link from 'next/link'
import { User } from '@phosphor-icons/react/dist/ssr'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { CMSNote } from '@/components/marketing/CMSNote'
import type { LeadershipMessagesRecord } from '@/lib/content/types'

export function LeadershipMessagesContent({ page }: { page: LeadershipMessagesRecord }) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/our-purpose' },
          { label: 'Leadership', href: '/leadership' },
          { label: 'Messages' },
        ]}
      />
      <MarketingHeroSection hero={page.hero} />
      <JumpNav links={page.jumpLinks} />

      {page.messages.map((message, index) => {
        const targetHref =
          message.id === 'chairmans-message'
            ? '/leadership/messages/chairman'
            : '/leadership/messages/president'

        return (
          <section
            key={message.id}
            id={message.id}
            className={`section-anchor ${index % 2 === 0 ? 'bg-white' : 'bg-whitebg'}`}
          >
            <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
                <aside className="lg:col-span-4 lg:sticky lg:top-[150px]">
                  <div className="card flex flex-col items-center gap-4 p-6 text-center">
                    <div className="photo-slot flex h-[168px] w-[132px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-dark-gray/40 bg-whitebg p-2 text-center text-[34px] text-dark-gray">
                      <User size={34} weight="duotone" />
                      <small className="text-label font-semibold uppercase tracking-[0.08em] leading-[140%]">
                        Portrait photo
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-h5M font-bold text-primary-blue lg:text-h5">
                        <Link href={targetHref} className="transition-colors hover:text-primary-red">
                          {message.name}
                        </Link>
                      </h2>
                      <p className="text-b14 text-dark-gray">
                        {message.role}
                        {message.organization ? `, ${message.organization}` : ''}
                      </p>
                    </div>
                    <Link
                      href={targetHref}
                      className="mt-2 text-b14 font-semibold text-primary-blue transition-colors hover:text-primary-red"
                    >
                      View dedicated page →
                    </Link>
                  </div>
                </aside>
                <article className="flex flex-col gap-5 lg:col-span-8">
                  <div className="flex flex-col gap-[6px]">
                    <p className="kicker">{message.kicker}</p>
                    <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">
                      <Link href={targetHref} className="transition-colors hover:text-primary-red">
                        {message.title}
                      </Link>
                    </h2>
                  </div>
                  <div className="flex flex-col gap-5">
                    {message.body.map((paragraph, pIdx) => (
                      <div key={`${message.id}-p-${pIdx}`} className="flex flex-col gap-5">
                        <p className="text-b16 text-primary-blue/85">{paragraph}</p>
                        {/* Quranic verse block after 3rd paragraph (index 2) for President's message */}
                        {pIdx === 2 && message.verse ? (
                          <blockquote className="verse-block my-1">
                            <p
                              className="text-[28px] font-semibold leading-[200%] text-primary-blue"
                              dir="rtl"
                              lang="ar"
                            >
                              {message.verse.arabic}
                            </p>
                            <p className="text-b18 font-semibold italic text-primary-blue">
                              &ldquo;{message.verse.translation}&rdquo;
                            </p>
                            <cite className="text-b14 not-italic text-dark-gray">{message.verse.citation}</cite>
                          </blockquote>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  {message.signature ? (
                    <div className="mt-2 flex flex-col gap-[2px]">
                      {message.signOff ? (
                        <p className="text-b16 italic text-primary-blue/85">{message.signOff}</p>
                      ) : null}
                      <p className="signature-name mt-2 text-h5M font-bold text-primary-blue lg:text-h5">
                        {message.signature}
                      </p>
                      {message.roleLine ? <p className="text-b14 text-dark-gray">{message.roleLine}</p> : null}
                      {message.organizationLine ? (
                        <p className="text-b14 text-dark-gray">{message.organizationLine}</p>
                      ) : message.organization ? (
                        <p className="text-b14 text-dark-gray">{message.organization}</p>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              </div>
            </div>
          </section>
        )
      })}

      <MarketingSupportCTA />
    </article>
  )
}
