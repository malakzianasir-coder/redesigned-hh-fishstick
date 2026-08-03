import { UserTie } from '@phosphor-icons/react/dist/ssr'

import { MarketingHeroSection } from '@/components/marketing/MarketingHero'
import { MarketingSupportCTA } from '@/components/marketing/MarketingSupportCTA'
import { JumpNav, MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import type { LeadershipMessagesRecord } from '@/lib/content/types'

export function LeadershipMessagesContent({ page }: { page: LeadershipMessagesRecord }) {
  return (
    <article>
      <MarketingBreadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/our-purpose' },
          { label: 'Leadership', href: '/leadership' },
          { label: page.title },
        ]}
      />
      <MarketingHeroSection hero={page.hero} />
      <JumpNav links={page.jumpLinks} />

      {page.messages.map((message, index) => (
        <section
          key={message.id}
          id={message.id}
          className={`section-anchor ${index % 2 === 0 ? 'bg-white' : 'bg-whitebg'}`}
        >
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-4 lg:sticky lg:top-[150px]">
                <div className="card flex flex-col items-center gap-4 p-6 text-center">
                  <div className="photo-slot h-[168px] w-[132px] text-[34px]">
                    <UserTie size={34} weight="duotone" />
                    <small>Portrait photo</small>
                  </div>
                  <div>
                    <h2 className="text-h5M font-bold text-primary-blue lg:text-h5">{message.name}</h2>
                    <p className="text-b14 text-dark-gray">
                      {message.role}
                      {message.organization ? `, ${message.organization}` : ''}
                    </p>
                  </div>
                </div>
              </aside>
              <article className="flex flex-col gap-5 lg:col-span-8">
                <div className="flex flex-col gap-[6px]">
                  <p className="kicker">{message.kicker}</p>
                  <h2 className="text-h3M font-bold text-primary-blue lg:text-h3">{message.title}</h2>
                </div>
                {message.verse ? (
                  <blockquote className="verse-block">
                    <p className="text-[28px] font-semibold leading-[200%] text-primary-blue" dir="rtl" lang="ar">
                      {message.verse.arabic}
                    </p>
                    <p className="text-b18 font-semibold italic text-primary-blue">
                      &ldquo;{message.verse.translation}&rdquo;
                    </p>
                    <cite className="text-b14 not-italic text-dark-gray">{message.verse.citation}</cite>
                  </blockquote>
                ) : null}
                <div className="flex flex-col gap-5">
                  {message.body.map((paragraph) => (
                    <p key={paragraph} className="text-b16 text-primary-blue/85">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {message.signature ? (
                  <div className="mt-2 flex flex-col gap-0.5">
                    {message.signOff ? (
                      <p className="text-b16 italic text-primary-blue/85">{message.signOff}</p>
                    ) : null}
                    <p className="signature-name mt-2 text-h5M font-bold text-primary-blue lg:text-h5">
                      {message.signature}
                    </p>
                    {message.roleLine ? (
                      <p className="text-b14 text-dark-gray">{message.roleLine}</p>
                    ) : (
                      <>
                        <p className="text-b14 text-dark-gray">{message.role}</p>
                        {message.organization ? (
                          <p className="text-b14 text-dark-gray">{message.organization}</p>
                        ) : null}
                      </>
                    )}
                  </div>
                ) : null}
              </article>
            </div>
          </div>
        </section>
      ))}

      <MarketingSupportCTA />
    </article>
  )
}
