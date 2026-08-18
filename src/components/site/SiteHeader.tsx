'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import { CaretDown, List, X } from '@phosphor-icons/react'
import navigationData from '../../../content/navigation.json'
import type { NavigationData, NavTopLevelItem } from '@/lib/navigation/types'
import { handleHeaderNavigation } from '@/utilities/headerNavigation'
import { cn } from '@/utilities/ui'
import { UtilityTopBar } from './UtilityTopBar'

const navigation = navigationData as NavigationData

/** Compact/expand follows the wheel gesture, not Lenis interpolation (which overshoots once). */
const HEADER_TOP_PX = 24
const HEADER_NOISE_PX = 8
const HEADER_COMPACT_PX = 160
const HEADER_EXPAND_PX = 90
const HEADER_APPLY_DELAY_MS = 160
const HEADER_COOLDOWN_MS = 400
const HEADER_REVERSE_PX = 48
const HEADER_WHEEL_LOCK_MS = 1200

/** Compact/expand CSS transition — keep in sync with `duration-300` on .site-header / .site-header__utility. */
const HEADER_TRANSITION_MS = 300
/** Delay before re-syncing --header-h after a compact/expand toggle: transition plus a small easing tail. */
const HEADER_HEIGHT_SYNC_DELAY_MS = HEADER_TRANSITION_MS + 20

function syncHeaderHeight(header: HTMLElement, compact: boolean) {
  const height = `${header.offsetHeight}px`
  document.documentElement.style.setProperty('--header-h', height)
  if (!compact) {
    document.documentElement.style.setProperty('--header-h-expanded', height)
  }
}

function navClick(href: string, onNavigate?: () => void) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()
    handleHeaderNavigation(href, event)
  }
}

function getPanelLayout(item: NavTopLevelItem) {
  const groupCount = item.groups.length

  if (item.id === 'doctors') {
    return { gridClasses: null, maxWidth: 'max-w-5xl' as const }
  }

  if (groupCount === 2) {
    return {
      gridClasses: 'grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-10',
      maxWidth: 'max-w-3xl' as const,
    }
  }

  if (groupCount >= 4) {
    return {
      gridClasses: 'grid-cols-1 gap-8 xl:grid-cols-4 xl:gap-8',
      maxWidth: 'max-w-6xl' as const,
    }
  }

  if (groupCount === 3) {
    return {
      gridClasses: 'grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-10',
      maxWidth: 'max-w-5xl' as const,
    }
  }

  return {
    gridClasses: 'grid-cols-1 gap-8',
    maxWidth: 'max-w-xl' as const,
  }
}

function DescribedLink({
  link,
  onNavigate,
}: {
  link: NavTopLevelItem['groups'][number]['links'][number]
  onNavigate?: () => void
}) {
  return (
    <div className="min-w-0 text-left">
      <Link href={link.href} className="mega-link !text-b16 font-bold" onClick={navClick(link.href, onNavigate)}>
        {link.label}
      </Link>
      {link.description ? (
        <p className="mt-1 text-b12 leading-[150%] text-dark-gray">{link.description}</p>
      ) : null}
    </div>
  )
}

function GroupHeading({
  group,
  className = 'field-label-text mb-3',
  onNavigate,
}: {
  group: NavTopLevelItem['groups'][number]
  className?: string
  onNavigate?: () => void
}) {
  if (group.href) {
    return (
      <Link
        href={group.href}
        className={`${className} transition-colors hover:text-primary-red`}
        onClick={navClick(group.href, onNavigate)}
      >
        {group.heading}
      </Link>
    )
  }

  return <p className={className}>{group.heading}</p>
}

function GroupColumn({
  group,
  onNavigate,
}: {
  group: NavTopLevelItem['groups'][number]
  onNavigate?: () => void
}) {
  return (
    <div className="min-w-0 text-left">
      <GroupHeading group={group} onNavigate={onNavigate} />
      <ul>
        {group.links.map((link) => (
          <li key={link.href + link.label}>
            {link.description ? (
              <div className="mb-3">
                <Link
                  href={link.href}
                  className="mega-link !text-b16 font-bold"
                  onClick={navClick(link.href, onNavigate)}
                >
                  {link.label}
                </Link>
                <p className="mt-1 text-b12 leading-[150%] text-dark-gray">{link.description}</p>
              </div>
            ) : (
              <Link href={link.href} className="mega-link" onClick={navClick(link.href, onNavigate)}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function MegaPanel({
  item,
  panelId,
  triggerId,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  item: NavTopLevelItem
  panelId: string
  triggerId: string
  onNavigate?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const { gridClasses, maxWidth } = getPanelLayout(item)
  const doctorsGroup = item.id === 'doctors' ? item.groups[0] : null

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      className="mega-panel"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-6 py-8 lg:px-[30px]">
        <div className={cn('mx-auto w-full text-left', maxWidth)}>
          {doctorsGroup ? (
            <>
              <GroupHeading group={doctorsGroup} onNavigate={onNavigate} />
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-10">
                {doctorsGroup.links.map((link) => (
                  <DescribedLink key={link.href + link.label} link={link} onNavigate={onNavigate} />
                ))}
              </div>
            </>
          ) : (
            <div className={cn('grid', gridClasses)}>
              {item.groups.map((group) => (
                <GroupColumn key={group.heading} group={group} onNavigate={onNavigate} />
              ))}
            </div>
          )}

          {item.moreLink ? (
            <div className="mt-6 flex justify-start border-t border-dark-gray/10 pt-4">
              <Link
                href={item.moreLink.href}
                className="mega-more"
                onClick={navClick(item.moreLink.href, onNavigate)}
              >
                {item.moreLink.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function MobileAccordion({
  item,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavTopLevelItem
  expanded: boolean
  onToggle: () => void
  onNavigate: () => void
}) {
  const panelId = useId()

  return (
    <div className="drawer-group border-b border-dark-gray/10">
      <button
        type="button"
        className="drawer-trigger"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{item.label}</span>
        <CaretDown
          size={18}
          aria-hidden
          className={cn('shrink-0 transition-transform duration-200', expanded && 'rotate-180')}
        />
      </button>
      {expanded ? (
        <div id={panelId} className="drawer-panel pb-4">
          {item.id === 'doctors' && item.groups[0] ? (
            <>
              <GroupHeading
                group={item.groups[0]}
                className="field-label-text mb-2"
                onNavigate={onNavigate}
              />
              {item.groups[0].links.map((link) => (
                <div key={link.href + link.label} className="mb-3">
                  <Link href={link.href} onClick={navClick(link.href, onNavigate)}>
                    {link.label}
                  </Link>
                  {link.description ? (
                    <p className="mt-1 text-b12 leading-[150%] text-dark-gray">{link.description}</p>
                  ) : null}
                </div>
              ))}
            </>
          ) : (
            item.groups.map((group) => (
              <div key={group.heading} className="mb-4">
                <GroupHeading
                  group={group}
                  className="field-label-text mb-2"
                  onNavigate={onNavigate}
                />
                {group.links.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    onClick={navClick(link.href, onNavigate)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))
          )}
          {item.moreLink ? (
            <Link
              href={item.moreLink.href}
              className="mega-more mt-2 inline-block !font-bold"
              onClick={navClick(item.moreLink.href, onNavigate)}
            >
              {item.moreLink.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [openItemId, setOpenItemId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null)
  const [compact, setCompact] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const lastScrollY = useRef(0)
  const scrollAccum = useRef(0)
  const compactRef = useRef(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  compactRef.current = compact

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [])

  const startCloseTimeout = useCallback(
    (itemId: string) => {
      clearHoverTimeout()
      hoverTimeoutRef.current = setTimeout(() => {
        setOpenItemId((current) => (current === itemId ? null : current))
      }, 150)
    },
    [clearHoverTimeout],
  )

  const closeMegaMenu = useCallback(
    (returnFocus = false) => {
      clearHoverTimeout()
      setOpenItemId((current) => {
        if (returnFocus && current) {
          triggerRefs.current[current]?.focus()
        }
        return null
      })
    },
    [clearHoverTimeout],
  )

  useEffect(() => {
    closeMegaMenu(false)
    setDrawerOpen(false)
  }, [pathname, closeMegaMenu])

  useLayoutEffect(() => {
    if (window.location.hash) {
      compactRef.current = true
      setCompact(true)
    }
  }, [pathname])

  // Sync header heights on mount, on window resize, and once webfonts settle (steady state)
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeights = () => syncHeaderHeight(header, header.classList.contains('is-compact'))

    updateHeaderHeights()
    window.addEventListener('resize', updateHeaderHeights)
    // Webfont swaps change the header height without firing a resize event.
    document.fonts.ready.then(updateHeaderHeights)

    return () => {
      window.removeEventListener('resize', updateHeaderHeights)
    }
  }, [])

  // Update --header-h once after the compact/expand transition settles, preventing layout thrashing during scroll
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const timer = window.setTimeout(() => syncHeaderHeight(header, compact), HEADER_HEIGHT_SYNC_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [compact])

  useEffect(() => {
    lastScrollY.current = window.scrollY

    let lastToggleAt = 0
    let lastWheelAt = 0
    let reverseAccum = 0
    let pending: boolean | null = null
    let applyTimer: number | null = null

    const resetAccum = () => {
      scrollAccum.current = 0
      reverseAccum = 0
    }

    const expandAtTop = () => {
      if (applyTimer != null) {
        window.clearTimeout(applyTimer)
        applyTimer = null
      }
      pending = null
      resetAccum()
      if (compactRef.current) {
        compactRef.current = false
        setCompact(false)
      }
    }

    const schedule = (nextCompact: boolean) => {
      if (pending === nextCompact) return
      if (applyTimer != null) window.clearTimeout(applyTimer)
      pending = nextCompact
      applyTimer = window.setTimeout(() => {
        applyTimer = null
        pending = null
        if (window.scrollY <= HEADER_TOP_PX) {
          expandAtTop()
          return
        }
        if (compactRef.current === nextCompact) {
          resetAccum()
          return
        }
        compactRef.current = nextCompact
        setCompact(nextCompact)
        if (nextCompact) setOpenItemId(null)
        lastToggleAt = performance.now()
        resetAccum()
      }, HEADER_APPLY_DELAY_MS)
    }

    const applyDelta = (delta: number, noisePx: number) => {
      if (Math.abs(delta) < noisePx) return
      if (window.scrollY <= HEADER_TOP_PX) {
        expandAtTop()
        return
      }

      const now = performance.now()
      if (lastToggleAt && now - lastToggleAt < HEADER_COOLDOWN_MS) return

      const accum = scrollAccum.current
      const reversing = (delta > 0 && accum < 0) || (delta < 0 && accum > 0)

      if (reversing) {
        reverseAccum += delta
        if (Math.abs(reverseAccum) < HEADER_REVERSE_PX) return
        if (applyTimer != null) {
          window.clearTimeout(applyTimer)
          applyTimer = null
        }
        pending = null
        scrollAccum.current = 0
        reverseAccum = 0
      } else {
        reverseAccum = 0
      }

      scrollAccum.current += delta

      if (scrollAccum.current > HEADER_COMPACT_PX) schedule(true)
      else if (scrollAccum.current < -HEADER_EXPAND_PX) schedule(false)
    }

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      lastWheelAt = performance.now()
      let delta = event.deltaY
      if (event.deltaMode === 1) delta *= 16
      else if (event.deltaMode === 2) delta *= window.innerHeight
      applyDelta(delta, 1)
    }

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      lastScrollY.current = y

      if (y <= HEADER_TOP_PX) {
        expandAtTop()
        return
      }

      // Wheel already decided; Lenis will keep interpolating (and overshoot once).
      if (performance.now() - lastWheelAt < HEADER_WHEEL_LOCK_MS) return

      applyDelta(delta, HEADER_NOISE_PX)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (applyTimer != null) window.clearTimeout(applyTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!openItemId) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMegaMenu(true)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openItemId, closeMegaMenu])

  useEffect(() => {
    const onPointerDown = (event: globalThis.MouseEvent) => {
      if (!openItemId) return
      const target = event.target
      if (target instanceof Element && target.closest('.mega-item')) return
      closeMegaMenu(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [openItemId, closeMegaMenu])

  useEffect(() => {
    if (!drawerOpen) return
    document.body.classList.add('drawer-open')
    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('drawer-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [drawerOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'site-header fixed inset-x-0 top-0 z-header border-b border-dark-gray/15 bg-white/95 backdrop-blur transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out',
          compact && 'is-compact shadow-e2',
        )}
      >
        <div
          className={cn(
            'site-header__utility grid transition-[grid-template-rows,opacity] duration-300 ease-out',
            compact
              ? 'pointer-events-none grid-rows-[0fr] opacity-0'
              : 'grid-rows-[1fr] opacity-100',
          )}
          aria-hidden={compact}
          inert={compact ? true : undefined}
        >
          <div className={cn('min-h-0', compact && 'overflow-hidden')}>
            <UtilityTopBar />
          </div>
        </div>

        <div
          className={cn(
            'site-header__brand container mx-auto grid grid-cols-[1fr_auto] items-center gap-4 px-6 transition-[padding] duration-300 ease-out lg:px-[30px] xl:grid-cols-[1fr_auto_1fr]',
            compact ? 'py-2' : 'py-3',
          )}
        >
          <Link
            href="/"
            className="justify-self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2"
            onClick={navClick('/')}
          >
            <Image
              src="/hijaz-hospital-logo-dark.svg"
              alt="Hijaz Hospital"
              width={200}
              height={48}
              className={cn(
                'w-auto transition-[height] duration-300 ease-out',
                compact ? 'h-9' : 'h-12',
              )}
              priority
              unoptimized
            />
          </Link>

          <nav aria-label="Primary" className="hidden justify-self-center xl:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navigation.topLevel.map((item) => {
                const triggerId = `mega-trigger-${item.id}`
                const panelId = `mega-panel-${item.id}`
                const isOpen = openItemId === item.id

                return (
                  <li
                    key={item.id}
                    className={cn('mega-item', isOpen && 'is-open')}
                    onMouseEnter={() => {
                      clearHoverTimeout()
                      setOpenItemId(item.id)
                    }}
                    onMouseLeave={() => {
                      startCloseTimeout(item.id)
                    }}
                    onFocus={() => {
                      clearHoverTimeout()
                      setOpenItemId(item.id)
                    }}
                    onBlur={() => {
                      startCloseTimeout(item.id)
                    }}
                  >
                    <button
                      type="button"
                      id={triggerId}
                      ref={(node) => {
                        triggerRefs.current[item.id] = node
                      }}
                      className="mega-trigger"
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={panelId}
                      onClick={() => {
                        clearHoverTimeout()
                        setOpenItemId((current) => (current === item.id ? null : item.id))
                      }}
                    >
                      {item.label}
                      <CaretDown size={14} aria-hidden className="shrink-0 transition-transform duration-200" />
                    </button>
                    <MegaPanel
                      item={item}
                      panelId={panelId}
                      triggerId={triggerId}
                      onNavigate={() => closeMegaMenu(false)}
                      onMouseEnter={() => clearHoverTimeout()}
                      onMouseLeave={() => startCloseTimeout(item.id)}
                    />
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="col-start-2 flex items-center justify-self-end gap-3 xl:col-start-3">
            <Link
              href="/services/emergency"
              className={cn(
                'inline-flex items-center justify-center gap-[10px] rounded-full bg-primary-red px-4 text-b14 font-bold text-white transition-colors duration-300 ease-in-out hover:bg-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2',
                compact ? 'h-9' : 'h-9 lg:h-11 lg:px-5',
              )}
              onClick={navClick('/services/emergency')}
            >
              Emergency
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-all duration-300 hover:border-primary-red hover:bg-primary-red hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2 xl:hidden"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <List size={24} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen ? (
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="mobile-drawer is-open"
      >
        <div className="flex items-center justify-between gap-4 border-b border-dark-gray/15 px-6 py-3">
          <Link href="/" onClick={navClick('/', () => setDrawerOpen(false))}>
            <Image
              src="/hijaz-hospital-logo-dark.svg"
              alt="Hijaz Hospital"
              width={160}
              height={40}
              className="h-10 w-auto"
              unoptimized
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-colors duration-200 hover:border-primary-red hover:text-primary-red"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <X size={24} aria-hidden />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-2">
          {navigation.topLevel.map((item) => (
            <MobileAccordion
              key={item.id}
              item={item}
              expanded={mobileExpandedId === item.id}
              onToggle={() =>
                setMobileExpandedId((current) => (current === item.id ? null : item.id))
              }
              onNavigate={() => {
                setDrawerOpen(false)
                setMobileExpandedId(null)
              }}
            />
          ))}
        </nav>

        <div className="border-t border-dark-gray/15 px-6 py-4">
          <Link
            href="/services/emergency"
            className="btn-primary flex w-full items-center justify-center"
            onClick={navClick('/services/emergency', () => setDrawerOpen(false))}
          >
            Emergency
          </Link>
        </div>
      </div>
      ) : null}
    </>
  )
}
