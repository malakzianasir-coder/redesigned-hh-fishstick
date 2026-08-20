import {

  ArrowRight,

  Globe,

  GlobeStand,

  HandArrowUp,

  HandCoins,

  Headset,

} from '@phosphor-icons/react/dist/ssr'

import Image from 'next/image'

import Link from 'next/link'
import { InteractiveCard } from '@/components/ui/InteractiveCard'



import { FactsOrbitSection } from '@/components/home/FactsOrbitSection'

import { HomeHeroSlider } from '@/components/home/HomeHeroSlider'

import { HomeMachineryCarousel, HomeTeamCarousel } from '@/components/home/HomeCarousels'

import { WaysToGiveSection } from '@/components/home/WaysToGiveSection'

import { BlockHeader } from '@/components/site/BlockHeader'

import { getDoctorsHub, getHomeContent } from '@/lib/content/loaders'



const ICON_MAP = {

  Globe,

  Headset,

  HandCoins,

  HandArrowUp,

  GlobeStand,

}



export function HomePage({ content: customContent, doctors: customDoctors }: { content?: any; doctors?: any[] } = {}) {
  const content = customContent || getHomeContent()
  const doctorsList = customDoctors || getDoctorsHub().doctors
  const doctorsWithPhotos = doctorsList.filter((doctor) => Boolean(doctor.image)).slice(0, 6)
  const teamSlides = doctorsWithPhotos.map((doctor) => ({
    src: doctor.image!,
    alt: doctor.name,
    title: doctor.name,
    role: doctor.specialty,
    href: `/doctors/${doctor.slug}`,
  }))



  return (

    <article>

      <HomeHeroSlider />



      <section id="intro" className="section-anchor bg-white">

        <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">

            <div className="relative order-2 mx-auto flex w-full max-w-[320px] select-none justify-center sm:max-w-[380px] md:max-w-[420px] lg:order-1 lg:col-span-6 lg:max-w-[460px]">
              {content.intro.images.map((image, index) => (
                <div
                  key={image.src}
                  className={`relative aspect-[3/4] w-[54%] shrink-0 overflow-hidden rounded-xl shadow-e1 ${
                    index === 0
                      ? 'z-0 mt-8 sm:mt-10 lg:mt-12'
                      : 'z-10 -ml-7 mb-8 sm:-ml-9 sm:mb-10 lg:-ml-10 lg:mb-12'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 260px"
                  />
                </div>
              ))}
            </div>

            <div className="order-1 flex flex-col gap-[6px] text-center lg:order-2 lg:col-span-6 lg:text-start">

              <p className="kicker">{content.intro.kicker}</p>

              <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">

                {content.intro.heading}

              </h2>

              <p className="mt-2 text-b16 leading-[150%] text-primary-blue/85">{content.intro.body}</p>

              <blockquote className="mt-4 border-l-4 border-primary-red pl-4 text-b16 italic leading-[150%] text-primary-blue/85">

                &ldquo;{content.intro.quote}&rdquo;

              </blockquote>

              <div className="flex justify-center pt-4 lg:justify-start">

                <Link href={content.intro.cta.href} className="btn-ghost">

                  {content.intro.cta.label}

                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>



      <section id="compliance" className="section-anchor border-t border-dark-gray/15 bg-whitebg">

        <div className="container mx-auto flex flex-col gap-6 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.compliance.kicker}

            title={content.compliance.heading}

            lede={content.compliance.lede}

            cta={content.compliance.cta}

          />

          <div className="card-grid card-grid--3">

            {content.compliance.cards.map((card) => (

              <div key={card.label} className="flex flex-col gap-1 rounded-2xl border border-dark-gray/15 bg-white p-5">

                <p className="field-label-text">{card.label}</p>

                <p className="text-b14 font-semibold leading-[150%] text-primary-blue">{card.title}</p>

                <p className="text-b12 leading-[150%] text-dark-gray">{card.detail}</p>

              </div>

            ))}

          </div>

        </div>

      </section>



      <FactsOrbitSection />



      <section id="engage" className="section-anchor border-t border-dark-gray/15 bg-whitebg">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <div className="flex flex-col gap-[6px] text-center">

            <p className="kicker">{content.engage.kicker}</p>

            <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">

              {content.engage.heading}

            </h2>

            <p className="mx-auto max-w-2xl text-b16 leading-[150%] text-primary-blue/85">

              {content.engage.lede}

            </p>

          </div>

          <div className="card-grid card-grid--3">

            {content.engage.cards.map((card) => {

              const IconComponent = ICON_MAP[card.icon as keyof typeof ICON_MAP]

              return (

                <InteractiveCard

                  key={card.title}

                  href={card.href}

                  target={card.external ? '_blank' : undefined}

                  rel={card.external ? 'noopener noreferrer' : undefined}

                  className="flex flex-col gap-3 p-6"

                >

                  {IconComponent ? (

                    <span className="icon-tile">

                      <IconComponent size={22} weight="duotone" />

                    </span>

                  ) : null}

                  <h3 className="text-h6M font-bold text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6">

                    {card.title}

                  </h3>

                  <p className="text-b14 leading-[150%] text-primary-blue/85">{card.body}</p>

                  <span className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red">

                    {card.cta}

                    <ArrowRight

                      size={16}

                      weight="bold"

                      className="transition-transform duration-300 group-hover:translate-x-1"

                    />

                  </span>

                </InteractiveCard>

              )

            })}

          </div>

        </div>

      </section>



      <section id="services" className="section-anchor border-t border-dark-gray/15 bg-whitebg">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.services.kicker}

            title={content.services.heading}

            lede={content.services.lede}

            cta={content.services.cta}

          />

          <div className="card-grid card-grid--3">

            {content.services.cards.map((card) => (

              <InteractiveCard

                key={card.title}

                href={card.href}

                className="flex flex-col overflow-hidden"

              >

                <div className="relative aspect-card overflow-hidden">

                  <Image

                    src={card.image}

                    alt={card.title}

                    fill

                    className="object-cover transition-transform duration-500 group-hover:scale-105"

                    sizes="(max-width: 768px) 100vw, 33vw"

                  />

                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">

                  <div className="flex flex-col gap-[6px]">

                    <p className="kicker">{card.kicker}</p>

                    <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red">

                      {card.title}

                    </h3>

                  </div>

                  <p className="text-b14 leading-[150%] text-primary-blue/85">{card.body}</p>

                </div>

              </InteractiveCard>

            ))}

          </div>

        </div>

      </section>



      <WaysToGiveSection content={content.waysToGive} />



      <section id="our-founders" className="section-anchor border-t border-dark-gray/15 bg-whitebg">

        <div className="container mx-auto flex flex-col gap-6 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.founders.kicker}

            title={content.founders.heading}

            lede={content.founders.lede}

            cta={content.founders.cta}

          />

          <div className="card-grid card-grid--2">

            {content.founders.cards.map((founder, index) => (

              <InteractiveCard as="article" key={founder.name} className="founder-card group">

                <div className="founder-card__media relative aspect-square overflow-hidden sm:aspect-auto">

                  <Image

                    src={founder.image}

                    alt={founder.name}

                    fill

                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${

                      index === 0 ? 'object-top' : 'object-center'

                    }`}

                    sizes="(max-width: 640px) 100vw, 192px"

                  />

                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">

                  <div className="flex flex-col gap-1">

                    <h3 className="text-h6M font-bold leading-[120%] text-primary-blue transition-colors duration-300 group-hover:text-primary-red lg:text-h6">

                      {founder.name}

                    </h3>

                    <p className="text-b14 font-semibold text-primary-red">{founder.role}</p>

                  </div>

                  <p className="line-clamp-3 text-b14 leading-[150%] text-primary-blue/85">

                    {founder.body}

                  </p>

                  <Link

                    href={founder.href}

                    className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red transition-colors duration-300 hover:text-primary-blue"

                  >

                    Read more

                    <ArrowRight size={16} weight="bold" />

                  </Link>

                </div>

              </InteractiveCard>

            ))}

          </div>

        </div>

      </section>



      <section id="stories" className="section-anchor border-t border-dark-gray/15 bg-white">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.stories.kicker}

            title={content.stories.heading}

            lede={content.stories.lede}

            cta={content.stories.cta}

          />

          <div className="card-grid card-grid--3">

            {content.stories.items.map((item) => (

              <InteractiveCard

                key={item.title + item.image}

                href={item.href}

                className="flex flex-col overflow-hidden"

              >

                <div className="relative aspect-card overflow-hidden">

                  <Image

                    src={item.image}

                    alt={item.title}

                    fill

                    className="object-cover transition-transform duration-500 group-hover:scale-105"

                    sizes="(max-width: 768px) 100vw, 33vw"

                  />

                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">

                  <div className="flex flex-col gap-[6px]">

                    <p className="kicker">Patient Story</p>

                    <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red">

                      {item.title}

                    </h3>

                  </div>

                  <p className="text-b14 leading-[150%] text-primary-blue/85">{item.body}</p>

                </div>

              </InteractiveCard>

            ))}

          </div>

        </div>

      </section>



      <section id="team" className="section-anchor border-t border-dark-gray/15 bg-whitebg">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.team.kicker}

            title={content.team.heading}

            lede={content.team.lede}

            cta={content.team.cta}

          />

          <HomeTeamCarousel slides={teamSlides} />

        </div>

      </section>



      <section id="news" className="section-anchor border-t border-dark-gray/15 bg-whitebg">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.news.kicker}

            title={content.news.heading}

            lede={content.news.lede}

            cta={content.news.cta}

          />

          <div className="card-grid card-grid--3">

            {content.news.items.map((item) => (

              <InteractiveCard

                key={item.title}

                href={item.href}

                className="flex flex-col overflow-hidden"

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

                    <span className="absolute inset-0 flex items-center justify-center text-b18 font-bold text-primary-blue/25">

                      HH

                    </span>

                  )}

                </div>

                <div className="flex flex-1 flex-col gap-2 p-6">

                  <p className="text-b12 font-semibold text-dark-gray">{item.date}</p>

                  <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red">

                    {item.title}

                  </h3>

                  <p className="line-clamp-3 text-b14 leading-[150%] text-primary-blue/85">

                    {item.body}

                  </p>

                </div>

              </InteractiveCard>

            ))}

          </div>

        </div>

      </section>



      <section id="events" className="section-anchor border-t border-dark-gray/15 bg-white">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <BlockHeader

            kicker={content.events.kicker}

            title={content.events.heading}

            lede={content.events.lede}

            cta={content.events.cta}

          />

          <div className="card-grid card-grid--3">

            {content.events.items.map((item) => (

              <InteractiveCard

                key={item.title}

                href={item.href}

                className="flex items-start gap-4 p-6"

              >

                <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-redbg px-4 py-3 text-center text-primary-red">

                  <span className="text-h5 font-bold leading-[110%]">{item.day}</span>

                  <span className="text-b12 font-semibold uppercase tracking-kicker">{item.month}</span>

                </div>

                <div className="flex flex-col gap-1">

                  <h3 className="text-b16 font-bold leading-[130%] text-primary-blue transition-colors group-hover:text-primary-red">

                    {item.title}

                  </h3>

                  <p className="text-b14 leading-[150%] text-primary-blue/85">{item.body}</p>

                </div>

              </InteractiveCard>

            ))}

          </div>

        </div>

      </section>



      <section id="machinery" className="section-anchor border-t border-dark-gray/15 bg-white">

        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">

          <div className="flex flex-col gap-[6px] text-center">

            <p className="kicker">{content.machinery.kicker}</p>

            <h2 className="text-h3M font-bold leading-[120%] text-primary-blue lg:text-h3">

              {content.machinery.heading}

            </h2>

            <p className="mx-auto max-w-3xl text-b16 leading-[150%] text-primary-blue/85">

              {content.machinery.lede}

            </p>

          </div>

          <HomeMachineryCarousel slides={content.machinery.slides} />

        </div>

      </section>

    </article>

  )

}


