import Image from 'next/image'
import Link from 'next/link'
import { UsersFour } from '@phosphor-icons/react/dist/ssr'

import { Illustration } from '@/components/Illustration'
import { MARKETING_ICON_MAP } from '@/components/marketing/marketingIcons'
import type { MarketingHero } from '@/lib/content/types'

type MarketingHeroProps = {
  hero: MarketingHero
}

function stripWrappingQuotes(text: string): string {
  return text.replace(/^[“”"'\u2018\u2019]+/, '').replace(/[“”"'\u2018\u2019]+$/, '').trim()
}

export function MarketingHeroSection({ hero }: MarketingHeroProps) {
  const PlaceholderIcon = hero.media?.icon
    ? MARKETING_ICON_MAP[hero.media.icon as keyof typeof MARKETING_ICON_MAP]
    : UsersFour
  const excerptVariant = hero.excerptVariant ?? 'body'
  const excerpt =
    excerptVariant === 'quote' && hero.excerpt ? stripWrappingQuotes(hero.excerpt) : hero.excerpt

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-[6px] text-center lg:col-span-6 lg:text-start">
            {hero.kicker ? <p className="kicker">{hero.kicker}</p> : null}
            <h1 className="text-h1M font-bold tracking-display text-primary-blue lg:text-h1">{hero.title}</h1>
            {hero.quote ? (
              <blockquote className="mx-auto mt-2 max-w-xl whitespace-pre-line border-l-4 border-primary-red pl-4 text-b18 italic text-primary-blue/85 lg:mx-0">
                {hero.quote}
              </blockquote>
            ) : null}
            {excerpt ? (
              excerptVariant === 'quote' ? (
                <blockquote className="hero-excerpt-quote">{excerpt}</blockquote>
              ) : (
                <p className="mx-auto mt-2 max-w-[560px] text-b16 text-primary-blue/85 lg:mx-0">{excerpt}</p>
              )
            ) : null}
            {hero.links && hero.links.length > 0 ? (
              <div className="flex w-full flex-col items-center gap-3 pt-4 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start lg:pt-5">
                {hero.links.map((link) => {
                  const className =
                    link.variant === 'ghost' ? 'btn-ghost' : 'btn-primary'

                  if (link.href.startsWith('#')) {
                    return (
                      <a key={link.href} href={link.href} className={className}>
                        {link.label}
                      </a>
                    )
                  }

                  return (
                    <Link key={link.href} href={link.href} className={className}>
                      {link.label}
                    </Link>
                  )
                })}
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-6">
            {hero.media?.type === 'illustration' ? (
              <div className="mx-auto w-full max-w-[320px] aspect-square lg:max-h-[320px]">
                <Illustration
                  preset={hero.media.preset}
                  tone="light"
                  className="h-full w-full"
                />
              </div>
            ) : hero.media?.type === 'image' && hero.media.src ? (
              <div className="group relative aspect-video max-h-[320px] overflow-hidden rounded-xl border border-dark-gray/15">
                <Image
                  src={hero.media.src}
                  alt={hero.media.alt || hero.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-video max-h-[320px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-dark-gray/40 bg-whitebg p-6 text-center text-dark-gray">
                {PlaceholderIcon ? <PlaceholderIcon size={32} /> : null}
                <small className="text-b12 font-semibold tracking-[0.02em]">
                  {hero.media?.placeholderLabel || 'Media placeholder'}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
