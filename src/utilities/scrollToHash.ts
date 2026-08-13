type LenisLike = {
  scrollTo: (
    target: number | HTMLElement | string,
    options?: { offset?: number; immediate?: boolean },
  ) => void
}

type ScrollToHashOptions = {
  hash?: string
  lenis?: LenisLike | null
  immediate?: boolean
}

function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h')
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 140
}

/** Scroll to `location.hash` (or top when none). Returns false if the target is not in the DOM yet. */
export function scrollToHash(options: ScrollToHashOptions = {}): boolean {
  if (typeof window === 'undefined') return false

  const hash = options.hash ?? window.location.hash
  const id = hash.replace(/^#/, '')
  const lenis = options.lenis
  const immediate = options.immediate ?? true

  if (!id) {
    if (lenis) lenis.scrollTo(0, { immediate })
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return true
  }

  const el = document.getElementById(id)
  if (!el) return false

  if (lenis) {
    lenis.scrollTo(el, { offset: -headerOffset(), immediate })
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  }

  return true
}

/** Update the URL hash (or clear it) and fire `hashchange` so LenisHashScroll can scroll. */
export function navigateToHash(hash: string) {
  if (typeof window === 'undefined') return

  const id = hash.replace(/^#/, '')
  const current = window.location.hash.replace(/^#/, '')

  if (!id) {
    if (current) {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    window.dispatchEvent(new Event('hashchange'))
    return
  }

  if (current !== id) {
    window.location.hash = id
  } else {
    window.dispatchEvent(new Event('hashchange'))
  }
}

/** Scroll to a section id (Lenis-aware). Default target: hub filter results. */
export function scrollToSectionId(
  id = 'hub-results',
  lenis?: LenisLike | null,
) {
  if (typeof window === 'undefined') return
  requestAnimationFrame(() => {
    scheduleScrollToHash({ hash: `#${id}`, lenis: lenis ?? null, immediate: true })
  })
}

export function scheduleScrollToHash(options: ScrollToHashOptions = {}): () => void {
  // Wait for compact header + --header-h, then correct once after the 300ms header transition.
  const delays = [50, 350]
  const timers: number[] = []

  delays.forEach((delay) => {
    timers.push(window.setTimeout(() => scrollToHash(options), delay))
  })

  return () => timers.forEach((id) => window.clearTimeout(id))
}
