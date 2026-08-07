import type { HeroConfig, MarketingHero } from '@/lib/content/types'

/** Adapt legacy HeroConfig (MediumHero) payloads to the canonical MarketingHero shape. */
export function toMarketingHero(hero: HeroConfig, placeholderIcon?: string): MarketingHero {
  const media: MarketingHero['media'] =
    hero.media?.type === 'image'
      ? { type: 'image', src: hero.media.src, alt: hero.media.alt }
      : hero.media?.type === 'illustration'
        ? { type: 'illustration', preset: hero.media.preset }
        : {
            type: 'placeholder',
            placeholderLabel: hero.title,
            icon: placeholderIcon,
          }

  return {
    kicker: hero.kicker,
    title: hero.title,
    excerpt: hero.excerpt,
    quote: hero.quote,
    media,
    links: hero.links,
  }
}
