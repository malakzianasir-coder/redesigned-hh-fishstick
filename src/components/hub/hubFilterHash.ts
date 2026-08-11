export function readHashSlug(validSlugs: string[]): string {
  if (typeof window === 'undefined') return 'all'
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash || hash === 'all') return 'all'
  return validSlugs.includes(hash) ? hash : 'all'
}

export function writeHashSlug(slug: string) {
  if (typeof window === 'undefined') return
  const nextUrl =
    slug === 'all'
      ? `${window.location.pathname}${window.location.search}`
      : `${window.location.pathname}${window.location.search}#${slug}`
  window.history.pushState(null, '', nextUrl)
}

export function subscribeHashSync(onSync: () => void): () => void {
  const handleLinkClick = (e: MouseEvent) => {
    const target = (e.target as Element).closest('a')
    if (!target) return
    const href = target.getAttribute('href')
    if (!href) return
    const currentPath = window.location.pathname
    if (href.startsWith('#') || href.startsWith(`${currentPath}#`)) {
      setTimeout(onSync, 10)
    }
  }
  window.addEventListener('hashchange', onSync)
  window.addEventListener('popstate', onSync)
  document.addEventListener('click', handleLinkClick)
  return () => {
    window.removeEventListener('hashchange', onSync)
    window.removeEventListener('popstate', onSync)
    document.removeEventListener('click', handleLinkClick)
  }
}
