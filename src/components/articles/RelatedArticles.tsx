import React from 'react'

import type { RelatedArticleItem } from '@/lib/content/types'

import { ArticleCard } from './ArticleCard'

type RelatedArticlesProps = {
  items: RelatedArticleItem[]
  heading?: string
}

export function RelatedArticles({ items, heading = 'Related' }: RelatedArticlesProps) {
  if (items.length === 0) return null

  return (
    <section className="border-t border-dark-gray/15 bg-whitebg">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <h2 className="text-h4M font-bold text-primary-blue lg:text-h4">{heading}</h2>
        <div className="card-grid card-grid--3">
          {items.map((item) => (
            <ArticleCard
              key={item.href}
              title={item.title}
              excerpt={item.excerpt}
              href={item.href}
              image={item.image}
              date={item.date}
              category={item.category}
              variant={item.variant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
