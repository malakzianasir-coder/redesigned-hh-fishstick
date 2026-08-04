import type { PaginatedResult } from './types'

export const DEFAULT_ARTICLE_PAGE_SIZE = 6

export function paginate<T>(
  items: T[],
  page: number,
  pageSize: number = DEFAULT_ARTICLE_PAGE_SIZE,
): PaginatedResult<T> {
  const safePage = Math.max(1, page)
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const clampedPage = Math.min(safePage, totalPages)
  const start = (clampedPage - 1) * pageSize

  return {
    items: items.slice(start, start + pageSize),
    page: clampedPage,
    pageSize,
    totalItems,
    totalPages,
  }
}
