import type { Metadata } from 'next'
import Link from 'next/link'

import { ArticleCard } from '@/components/articles/ArticleCard'
import { formatArticleDate } from '@/lib/content/article-helpers'
import { searchSiteArticles } from '@/lib/content/loaders'
import { Search } from '@/search/Component'
import React from 'react'

type Args = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const trimmed = query?.trim() ?? ''
  const results = trimmed ? searchSiteArticles(trimmed) : []

  return (
    <div className="bg-white">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="flex flex-col gap-[6px] text-center">
          <p className="kicker">Search</p>
          <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">Search Hijaz Hospital</h1>
          <p className="mx-auto max-w-2xl text-b16 text-primary-blue/85">
            Find news, hospital events, and patient success stories.
          </p>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <Search />
        </div>

        {trimmed ? (
          <div className="flex flex-col gap-6">
            <p className="text-b14 text-dark-gray">
              <span className="font-bold text-primary-blue">{results.length}</span> result
              {results.length === 1 ? '' : 's'} for &ldquo;{trimmed}&rdquo;
            </p>
            {results.length > 0 ? (
              <div className="card-grid card-grid--3">
                {results.map((entry) => (
                  <ArticleCard
                    key={entry.href}
                    variant={entry.type}
                    title={entry.title}
                    excerpt={entry.excerpt}
                    href={entry.href}
                    image={entry.image}
                    date={formatArticleDate(entry.date)}
                    category={entry.categories?.[0]}
                  />
                ))}
              </div>
            ) : (
              <p className="text-b16 text-primary-blue/85">
                No articles matched your search. Try different keywords or browse{' '}
                <Link href="/news" className="text-primary-blue underline hover:text-primary-red">
                  news
                </Link>
                ,{' '}
                <Link href="/events" className="text-primary-blue underline hover:text-primary-red">
                  events
                </Link>
                , or{' '}
                <Link href="/success-stories" className="text-primary-blue underline hover:text-primary-red">
                  success stories
                </Link>
                .
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function generateMetadata({ searchParams: searchParamsPromise }: Args): Promise<Metadata> {
  return searchParamsPromise.then(({ q }) => ({
    title: q ? `Search: ${q} | Hijaz Hospital` : 'Search | Hijaz Hospital',
  }))
}
