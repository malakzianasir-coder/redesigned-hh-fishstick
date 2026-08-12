import { Suspense } from 'react'

import { ArticleCard } from '@/components/articles/ArticleCard'
import { CategoryFilter } from '@/components/articles/CategoryFilter'
import { Pagination } from '@/components/Pagination'
import { formatArticleDate } from '@/lib/content/article-helpers'
import { getNewsArticles } from '@/lib/content/loaders'
import type { NewsArticle, NewsHubContent, PaginatedResult } from '@/lib/content/types'

type NewsHubContentProps = {
  hub: NewsHubContent
  result: PaginatedResult<NewsArticle>
  categories: string[]
  featured?: NewsArticle[]
  activeCategory?: string
}

export function NewsHubContent({
  hub,
  result,
  categories,
  featured = [],
  activeCategory,
}: NewsHubContentProps) {
  const articles = getNewsArticles()
  const showCategoryKicker = !activeCategory
  const featuredSorted = [...featured].sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
  const resultItemsSorted = [...result.items].sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
  const categoryCounts = Object.fromEntries(
    categories.map((category) => [
      category,
      articles.filter((article) => article.categories.includes(category)).length,
    ]),
  )
  const showFeatured = result.page === 1 && !activeCategory && featured.length > 0

  return (
    <div className="bg-white">
      <section className="bg-white">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] text-center lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px]">
            <p className="kicker">{hub.kicker}</p>
            <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">{hub.heading}</h1>
            <p className="mx-auto max-w-3xl text-b16 text-primary-blue/85">{hub.lede}</p>
          </div>

          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter
              categories={categories}
              basePath="/news"
              label="Categories"
              counts={categoryCounts}
              allCount={articles.length}
            />
          </Suspense>

          {showFeatured ? (
            <div className="flex flex-col gap-6">
              <h2 className="text-h5M font-bold text-primary-blue lg:text-h5">Featured</h2>
              <div className="card-grid card-grid--2 mx-auto max-w-5xl">
                {featuredSorted.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    variant="news"
                    title={article.title}
                    excerpt={article.shortDescription || ''}
                    href={`/news/${article.slug}`}
                    image={article.heroImage}
                    date={formatArticleDate(article.publishedAt)}
                    category={showCategoryKicker ? article.categories[0] : undefined}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-6">
            <h2 className="text-h5M font-bold text-primary-blue lg:text-h5">
              {activeCategory ? `${activeCategory}` : 'Latest news'}
            </h2>
            {result.items.length > 0 ? (
              <div className="card-grid card-grid--3">
                {resultItemsSorted.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    variant="news"
                    title={article.title}
                    excerpt={article.shortDescription || ''}
                    href={`/news/${article.slug}`}
                    image={article.heroImage}
                    date={formatArticleDate(article.publishedAt)}
                    category={showCategoryKicker ? article.categories[0] : undefined}
                  />
                ))}
              </div>
            ) : (
              <p className="text-b16 text-primary-blue/85">No news articles match this filter.</p>
            )}
          </div>

          {result.totalPages > 1 ? (
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              basePath="/news/page"
              firstPagePath="/news"
            />
          ) : null}
        </div>
      </section>
    </div>
  )
}
