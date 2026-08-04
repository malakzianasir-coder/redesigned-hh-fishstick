import type {
  ArticleSearchEntry,
  HospitalEvent,
  NewsArticle,
  PaginatedResult,
  RelatedArticleItem,
  SuccessStory,
} from './types'

export const NEWS_PAGE_SIZE = 9
export const EVENTS_PAGE_SIZE = 9

export function formatArticleDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginatedResult<T> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  }
}

export function publishedNews(articles: NewsArticle[]): NewsArticle[] {
  return articles
    .filter((article) => article._status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function publishedHospitalEvents(events: HospitalEvent[]): HospitalEvent[] {
  return events
    .filter((event) => event._status === 'published')
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
}

export function publishedSuccessStories(stories: SuccessStory[]): SuccessStory[] {
  return stories
    .filter((story) => story._status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function newsToCard(article: NewsArticle): RelatedArticleItem {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.shortDescription || '',
    href: `/news/${article.slug}`,
    image: article.heroImage,
    date: formatArticleDate(article.publishedAt),
    category: article.categories[0],
    variant: 'news',
  }
}

export function eventToCard(event: HospitalEvent): RelatedArticleItem {
  return {
    slug: event.slug,
    title: event.title,
    excerpt: event.shortDescription || '',
    href: `/events/${event.slug}`,
    image: event.heroImage,
    date: formatArticleDate(event.eventDate),
    category: event.eventType,
    variant: 'event',
  }
}

export function storyToCard(story: SuccessStory): RelatedArticleItem {
  return {
    slug: story.slug,
    title: story.heading,
    excerpt: story.subHeading || story.title,
    href: `/success-stories/${story.slug}`,
    image: story.thumbnail,
    date: formatArticleDate(story.publishedDate),
    category: story.category,
    variant: 'story',
  }
}

export function getRelatedNews(
  articles: NewsArticle[],
  currentSlug: string,
  limit = 3,
): RelatedArticleItem[] {
  const current = articles.find((article) => article.slug === currentSlug)
  if (!current) return []

  const scored = publishedNews(articles)
    .filter((article) => article.slug !== currentSlug)
    .map((article) => {
      let score = 0
      if (article.categories.some((cat) => current.categories.includes(cat))) score += 2
      if (article.tags.some((tag) => current.tags.includes(tag))) score += 1
      return { article, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(({ article }) => newsToCard(article))
}

export function getRelatedEvents(
  events: HospitalEvent[],
  currentSlug: string,
  limit = 3,
): RelatedArticleItem[] {
  const current = events.find((event) => event.slug === currentSlug)
  if (!current) return []

  const scored = publishedHospitalEvents(events)
    .filter((event) => event.slug !== currentSlug)
    .map((event) => {
      let score = 0
      if (event.categories.some((cat) => current.categories.includes(cat))) score += 2
      if (event.eventType === current.eventType) score += 1
      return { event, score }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map(({ event }) => eventToCard(event))
}

export function getRelatedStories(
  stories: SuccessStory[],
  currentSlug: string,
  limit = 3,
): RelatedArticleItem[] {
  const current = stories.find((story) => story.slug === currentSlug)
  if (!current) return []

  return publishedSuccessStories(stories)
    .filter((story) => story.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0
      const bMatch = b.category === current.category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, limit)
    .map(storyToCard)
}

export function buildArticleSearchIndex(
  news: NewsArticle[],
  events: HospitalEvent[],
  stories: SuccessStory[],
): ArticleSearchEntry[] {
  const newsEntries: ArticleSearchEntry[] = publishedNews(news).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.shortDescription || '',
    href: `/news/${article.slug}`,
    type: 'news',
    image: article.heroImage,
    date: article.publishedAt,
    categories: article.categories,
  }))

  const eventEntries: ArticleSearchEntry[] = publishedHospitalEvents(events).map((event) => ({
    slug: event.slug,
    title: event.title,
    excerpt: event.shortDescription || '',
    href: `/events/${event.slug}`,
    type: 'event',
    image: event.heroImage,
    date: event.eventDate,
    categories: event.categories,
  }))

  const storyEntries: ArticleSearchEntry[] = publishedSuccessStories(stories).map((story) => ({
    slug: story.slug,
    title: story.heading,
    excerpt: story.subHeading || story.title,
    href: `/success-stories/${story.slug}`,
    type: 'story',
    image: story.thumbnail,
    date: story.publishedDate,
    categories: [story.category],
  }))

  return [...newsEntries, ...eventEntries, ...storyEntries]
}
