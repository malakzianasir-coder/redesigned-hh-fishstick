import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Illustration } from '@/components/Illustration'
import type { HeroConfig } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type MediumHeroProps = {
  hero: HeroConfig
  /** When true, clears space under the fixed site header (use when this is the first page block). */
  underHeader?: boolean
}

export const MediumHero: React.FC<MediumHeroProps> = ({ hero, underHeader = false }) => {
  const {
    id,
    kicker,
    title,
    tagline,
    excerpt,
    variant = 'white',
    media,
    stat,
    links,
    taglineVariant = 'heading',
  } = hero

  const isDark = variant === 'navy' || variant === 'red'
  const sectionBg =
    variant === 'navy' ? 'bg-primary-blue' : variant === 'red' ? 'bg-primary-red' : 'bg-white'
  const sectionPadding = underHeader
    ? isDark
      ? 'pt-[calc(var(--header-h-expanded)+1.5rem)] pb-6 lg:pt-[calc(var(--header-h-expanded)+2.5rem)] lg:pb-10'
      : 'pt-[calc(var(--header-h-expanded)+30px)] pb-[30px] lg:pt-[calc(var(--header-h-expanded)+60px)] lg:pb-[60px]'
    : isDark
      ? 'py-6 lg:py-10'
      : 'py-[30px] lg:py-[60px]'

  return (
    <section id={id} className={cn('section-anchor', sectionBg)}>
      <div className={cn('container mx-auto px-6 lg:px-[30px]', sectionPadding)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-6 flex flex-col gap-[6px] text-center lg:text-start">
            {kicker && (
              <p className="kicker">{kicker}</p>
            )}
            <h1
              className={cn(
                'text-h1M lg:text-h1 font-bold tracking-display',
                isDark ? 'text-white' : 'text-primary-blue',
              )}
            >
              {title}
            </h1>
            {tagline && (
              <p
                className={cn(
                  taglineVariant === 'body'
                    ? 'text-b18 font-semibold mt-1'
                    : 'text-h6M lg:text-h6 mt-1',
                  isDark ? 'text-white' : 'text-primary-blue',
                )}
              >
                {tagline}
              </p>
            )}
            {excerpt && (
              <p
                className={cn(
                  'text-b16 mt-2 max-w-[560px] mx-auto lg:mx-0',
                  isDark ? 'text-white/85' : 'text-primary-blue/85',
                )}
              >
                {excerpt}
              </p>
            )}
            {hero.quote && !isDark && (
              <blockquote className="mx-auto mt-2 max-w-xl border-l-4 border-primary-red pl-4 text-b18 italic text-primary-blue/85 lg:mx-0">
                {hero.quote}
              </blockquote>
            )}
            {stat && (
              <div className="pt-3 flex justify-center lg:justify-start">
                <div className="card inline-flex items-baseline gap-2 px-5 py-3">
                  <span className="text-h3M lg:text-h3 font-bold text-primary-red font-display">
                    {stat.value}
                  </span>
                  <span className="text-b14 text-dark-gray">{stat.label}</span>
                </div>
              </div>
            )}
            {links && links.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 pt-4 lg:justify-start lg:pt-5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={link.variant === 'ghost' ? 'btn-ghost' : 'btn-primary'}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-6">
            {media?.type === 'illustration' ? (
              <div className="mx-auto w-full max-w-[320px] aspect-square lg:max-h-[320px]">
                <Illustration
                  preset={media.preset}
                  tone={isDark ? 'dark' : 'light'}
                  className="h-full w-full"
                />
              </div>
            ) : media?.type === 'image' ? (
              <div
                className={cn(
                  'relative overflow-hidden rounded-xl aspect-video max-h-[320px] group',
                  isDark && 'border border-white/10',
                )}
              >
                <Image
                  src={media.src}
                  alt={media.alt || title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
