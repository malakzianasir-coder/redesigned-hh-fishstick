/**
 * Header / mega-menu navigation helper.
 * - Cross-route: let the browser/Next handle navigation, then scroll to top.
 * - Same-route hash (e.g. /departments#surgery-allied): update hash so hub
 *   filter pills sync even when Next would no-op a soft navigation.
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

  if (samePath) {
    event?.preventDefault()

    if (nextHash) {
      if (currentHash !== nextHash) {
        window.location.hash = nextHash
      } else {
        window.dispatchEvent(new Event('hashchange'))
      }
    } else if (currentHash) {
      window.history.pushState(null, '', `${next.pathname}${next.search}`)
      window.dispatchEvent(new PopStateEvent('popstate'))
    } else {
      window.dispatchEvent(new Event('hashchange'))
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return
  }

  // Different path — Next Link proceeds; force top after click.
  window.setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, 0)
}
