import type {
  ArticleSearchEntry,
  HospitalEvent,
  NewsArticle,
  RelatedArticleItem,
  SuccessStory,
  SuccessStoryCategory,
} from './types'

export function formatArticleDate(date?: string): string | undefined {
  if (!date) return undefined
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function parseEventCardDate(eventDate?: string): { day: string; month: string } | undefined {
  if (!eventDate) return undefined
  const iso = new Date(eventDate)
  if (!Number.isNaN(iso.getTime())) {
    return {
      day: iso.getDate().toString(),
      month: iso.toLocaleDateString('en', { month: 'short' }),
    }
  }
  const parts = eventDate.trim().split(/\s+/)
  if (parts.length >= 2) {
    return { day: parts[0] ?? eventDate, month: parts[1] ?? '' }
  }
  return { day: eventDate, month: '' }
}

export const SUCCESS_STORY_CATEGORY_LABELS: Record<SuccessStoryCategory, string> = {
  'successful-surgeries': 'Successful Surgeries',
  'life-saving-treatments': 'Life-Saving Treatments',
  'dialysis-recovery': 'Dialysis Recovery',
}

export function newsToRelatedItem(article: NewsArticle): RelatedArticleItem {
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

export function eventToRelatedItem(event: HospitalEvent): RelatedArticleItem {
  return {
    slug: event.slug,
    title: event.title,
    excerpt: event.shortDescription || '',
    href: `/events/${event.slug}`,
    image: event.heroImage,
    date: formatArticleDate(event.eventDate),
    category: event.categories[0] || event.eventType,
    variant: 'event',
  }
}

export function storyToRelatedItem(story: SuccessStory): RelatedArticleItem {
  return {
    slug: story.slug,
    title: story.heading || story.title,
    excerpt: story.subHeading || story.title,
    href: `/success-stories/${story.slug}`,
    image: story.thumbnail,
    date: formatArticleDate(story.publishedDate),
    category: SUCCESS_STORY_CATEGORY_LABELS[story.category],
    variant: 'story',
  }
}

export function buildArticleSearchIndex(
  news: NewsArticle[],
  events: HospitalEvent[],
  stories: SuccessStory[],
): ArticleSearchEntry[] {
  const newsEntries: ArticleSearchEntry[] = news.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.shortDescription || '',
    href: `/news/${article.slug}`,
    type: 'news',
    image: article.heroImage,
    date: article.publishedAt,
    categories: article.categories,
  }))

  const eventEntries: ArticleSearchEntry[] = events.map((event) => ({
    slug: event.slug,
    title: event.title,
    excerpt: event.shortDescription || '',
    href: `/events/${event.slug}`,
    type: 'event',
    image: event.heroImage,
    date: event.eventDate,
    categories: event.categories,
  }))

  const storyEntries: ArticleSearchEntry[] = stories.map((story) => ({
    slug: story.slug,
    title: story.heading || story.title,
    excerpt: story.subHeading || story.title,
    href: `/success-stories/${story.slug}`,
    type: 'story',
    image: story.thumbnail,
    date: story.publishedDate,
    categories: [SUCCESS_STORY_CATEGORY_LABELS[story.category]],
  }))

  return [...newsEntries, ...eventEntries, ...storyEntries]
}

export function searchArticles(entries: ArticleSearchEntry[], query: string, limit = 24): ArticleSearchEntry[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return entries
    .filter((entry) => {
      const haystack = [
        entry.title,
        entry.excerpt,
        entry.categories?.join(' '),
        entry.type,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalized)
    })
    .slice(0, limit)
}
