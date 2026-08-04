import React from 'react'

import { ArticleBody } from '@/components/articles/ArticleBody'
import { ArticleHero, ArticleVideoEmbed } from '@/components/articles/ArticleHero'
import { RelatedArticles } from '@/components/articles/RelatedArticles'
import { MarketingBreadcrumb } from '@/components/marketing/MarketingShell'
import { GlobalCtaSection } from '@/components/sections/GlobalCtaSection'
import type { ArticleBlock, RelatedArticleItem } from '@/lib/content/types'

const DEFAULT_CTA = {
  type: 'cta' as const,
  kicker: 'Support Our Mission',
  heading: 'Help Us Keep Care Within Reach for Every Patient',
  body: 'Your donation supports free treatment, medicines, and welfare programs for deserving patients — fulfilling our mission that financial hardship never stands in the way of care.',
  button: { label: 'Donate Now', href: '/donate' },
}

type ArticlePageTemplateProps = {
  breadcrumbs: { label: string; href?: string }[]
  variant: 'news' | 'event' | 'story'
  title: string
  tagLine?: string
  subtitle?: string
  author?: string
  date?: string
  heroImage?: string
  body?: ArticleBlock[]
  videoUrl?: string
  eventType?: string
  eventDate?: string
  eventTime?: string
  eventVenue?: string
  eventEntry?: string
  categoryLabel?: string
  related?: RelatedArticleItem[]
  relatedHeading?: string
}

export function ArticlePageTemplate({
  breadcrumbs,
  variant,
  title,
  tagLine,
  subtitle,
  author,
  date,
  heroImage,
  body,
  videoUrl,
  eventType,
  eventDate,
  eventTime,
  eventVenue,
  eventEntry,
  categoryLabel,
  related = [],
  relatedHeading,
}: ArticlePageTemplateProps) {
  return (
    <article>
      <MarketingBreadcrumb items={breadcrumbs} />
      <ArticleHero
        variant={variant}
        title={title}
        tagLine={tagLine}
        subtitle={subtitle}
        author={author}
        date={date}
        heroImage={heroImage}
        eventType={eventType}
        eventDate={eventDate}
        eventTime={eventTime}
        eventVenue={eventVenue}
        eventEntry={eventEntry}
        categoryLabel={categoryLabel}
      />

      {variant === 'story' && videoUrl ? (
        <ArticleVideoEmbed videoUrl={videoUrl} title={title} />
      ) : null}

      {body && body.length > 0 ? (
        <section className="bg-white">
          <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
            <ArticleBody blocks={body} />
          </div>
        </section>
      ) : null}

      <RelatedArticles items={related} heading={relatedHeading} />
      <GlobalCtaSection section={DEFAULT_CTA} />
    </article>
  )
}
