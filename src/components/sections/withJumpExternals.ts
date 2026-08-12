import type { JumpLink } from '@/lib/content/types'

/** Append other-page chips without duplicating hrefs already in the list. */
export function withJumpExternals(links: JumpLink[] = [], extras: JumpLink[] = []): JumpLink[] {
  const seen = new Set(links.map((link) => link.href))
  return [...links, ...extras.filter((link) => !seen.has(link.href))]
}
