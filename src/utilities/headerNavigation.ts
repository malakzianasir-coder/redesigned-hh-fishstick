import { scheduleScrollToHash } from '@/utilities/scrollToHash'

/**
 * Header / mega-menu navigation helper.
 * - Cross-route: let Next handle navigation; HashScroll restores hash targets.
 * - Same-route hash (e.g. /our-purpose#our-compliance): update hash and scroll.
 */
export function handleHeaderNavigation(
  href: string,
  event?: { preventDefault: () => void },
) {
  if (typeof window === 'undefined') return

  const next = new URL(href, window.location.origin)
  const samePath = next.pathname === window.location.pathname
  const nextHash = next.hash.replace(/^#/, '')
  const currentHash = window.location.hash.replace(/^#/, '')

  if (!samePath) return

  event?.preventDefault()

  if (nextHash) {
    if (currentHash !== nextHash) {
      window.location.hash = nextHash
    } else {
      window.dispatchEvent(new Event('hashchange'))
    }
    return
  }

  if (currentHash) {
    window.history.pushState(null, '', `${next.pathname}${next.search}`)
    window.dispatchEvent(new Event('hashchange'))
  }

  scheduleScrollToHash({ hash: '', immediate: true })
}
