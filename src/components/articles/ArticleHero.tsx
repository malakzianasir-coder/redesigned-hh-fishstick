import Image from 'next/image'
import React from 'react'

import { cn } from '@/utilities/ui'

export type ArticleHeroProps = {
  variant: 'news' | 'event' | 'story'
  title: string
  tagLine?: string
  subtitle?: string
  author?: string
  date?: string
  heroImage?: string
  eventType?: string
  eventDate?: string
  eventTime?: string
  eventVenue?: string
  eventEntry?: string
  categoryLabel?: string
}

export function ArticleHero({
  variant,
  title,
  tagLine,
  subtitle,
  author,
  date,
  heroImage,
  eventType,
  eventDate,
  eventTime,
  eventVenue,
  eventEntry,
  categoryLabel,
}: ArticleHeroProps) {
  const metaLine = [author ? `By ${author}` : null, date].filter(Boolean)

  return (
    <header className="bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px] lg:text-start">
        <div className="flex flex-col gap-3 lg:w-2/3">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {tagLine ? <span className="text-b16 font-normal leading-[120%] text-primary-red">{tagLine}</span> : null}
            {tagLine && metaLine.length > 0 ? <span className="text-dark-gray/40">•</span> : null}
            {metaLine.map((item, index) => (
              <React.Fragment key={item}>
                <span className="text-b14 font-medium leading-[120%] text-primary-blue/70">{item}</span>
                {index < metaLine.length - 1 ? <span className="text-dark-gray/40">•</span> : null}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-h1M font-bold leading-[110%] tracking-tight text-primary-blue lg:text-h1">{title}</h1>
          {subtitle ? (
            <p className="text-b16 font-normal leading-[150%] text-primary-blue/75">{subtitle}</p>
          ) : null}
          {variant === 'event' ? (
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {eventType ? <span className="chip">{eventType}</span> : null}
              {eventDate ? <span className="chip">{eventDate}</span> : null}
              {eventTime ? <span className="chip">{eventTime}</span> : null}
              {eventVenue ? <span className="chip">{eventVenue}</span> : null}
              {eventEntry ? <span className="chip">{eventEntry}</span> : null}
            </div>
          ) : null}
          {variant === 'story' && categoryLabel ? <span className="chip mx-auto lg:mx-0">{categoryLabel}</span> : null}
        </div>

        {heroImage ? (
          <div className="relative aspect-video max-h-[500px] w-full overflow-hidden rounded-xl">
            <Image src={heroImage} alt={title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
          </div>
        ) : null}
      </div>
    </header>
  )
}

export function ArticleVideoEmbed({ videoUrl, title }: { videoUrl: string; title: string }) {
  return (
    <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-cardbg">
        <iframe
          src={videoUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
