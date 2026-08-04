import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export type ArticleCardProps = {
  title: string
  excerpt: string
  href: string
  image?: string
  date?: string
  category?: string
  variant?: 'news' | 'event' | 'story'
  eventDay?: string
  eventMonth?: string
  className?: string
}

const variantKicker: Record<'news' | 'event' | 'story', string> = {
  news: 'News',
  event: 'Hospital Event',
  story: 'Patient Story',
}

export function ArticleCard({
  title,
  excerpt,
  href,
  image,
  date,
  category,
  variant = 'news',
  eventDay,
  eventMonth,
  className,
}: ArticleCardProps) {
  const kicker = category || variantKicker[variant]

  if (variant === 'event' && eventDay && eventMonth) {
    return (
      <Link href={href} className={cn('card-interactive group flex items-start gap-4 p-6', className)}>
        <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-redbg px-4 py-3 text-center text-primary-red">
          <span className="text-h5 font-bold leading-[110%]">{eventDay}</span>
          <span className="text-b12 font-semibold uppercase tracking-kicker">{eventMonth}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="kicker">{kicker}</p>
          <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red">
            {title}
          </h3>
          <p className="line-clamp-3 text-b14 leading-[150%] text-primary-blue/85">{excerpt}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className={cn('card-interactive group flex flex-col overflow-hidden', className)}>
      <div className="relative aspect-card overflow-hidden bg-cardbg">
        {image ? (
          <Image
            src={image}
            alt={title}
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
        <div className="flex flex-wrap items-center gap-2">
          <p className="kicker">{kicker}</p>
          {date ? <span className="text-b12 font-semibold text-dark-gray">{date}</span> : null}
        </div>
        <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red">
          {title}
        </h3>
        <p className="line-clamp-3 text-b14 leading-[150%] text-primary-blue/85">{excerpt}</p>
      </div>
    </Link>
  )
}
