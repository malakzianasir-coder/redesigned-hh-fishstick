import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticlePageTemplate } from '@/components/templates/ArticlePageTemplate'
import { formatArticleDate } from '@/lib/content/article-helpers'
import { getNewsArticle, getNewsArticles, getRelatedNews } from '@/lib/content/loaders'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getNewsArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) {
    return { title: 'News Not Found' }
  }

  return {
    title: article.meta?.title || `${article.title} | Hijaz Hospital`,
    description: article.meta?.description || article.shortDescription,
  }
}

export default async function NewsArticlePage({ params }: Args) {
  const { slug } = await params
  const article = getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <ArticlePageTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'News', href: '/news' },
        { label: article.title },
      ]}
      variant="news"
      title={article.title}
      tagLine={article.tagLine}
      subtitle={article.shortDescription}
      author={article.author?.name}
      date={formatArticleDate(article.publishedAt)}
      heroImage={article.heroImage}
      body={article.content}
      related={getRelatedNews(article)}
      relatedHeading="Related news"
    />
  )
}
