'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { CaretDown, List, X } from '@phosphor-icons/react'
import navigationData from '../../../content/navigation.json'
import type { NavigationData, NavTopLevelItem } from '@/lib/navigation/types'
import { cn } from '@/utilities/ui'
import { UtilityTopBar } from './UtilityTopBar'

const navigation = navigationData as NavigationData

function getPanelGridClasses(item: NavTopLevelItem) {
  const groupCount = item.groups.length
  const hasFeatured = Boolean(item.featured)

  if (item.id === 'doctors') {
    return null
  }

  if (hasFeatured && groupCount >= 4) {
    return 'grid-cols-1 gap-8 xl:grid-cols-5'
  }

  if (hasFeatured && groupCount === 3) {
    return 'grid-cols-1 gap-8 xl:grid-cols-4'
  }

  if (groupCount === 2) {
    return 'grid-cols-1 gap-8 xl:grid-cols-2 xl:gap-10 max-w-4xl'
  }

  if (groupCount >= 3) {
    return 'grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-10'
  }

  return 'grid-cols-1 gap-8'
}

function DescribedLink({
  link,
  onNavigate,
}: {
  link: NavTopLevelItem['groups'][number]['links'][number]
  onNavigate?: () => void
}) {
  return (
    <div>
      <Link href={link.href} className="mega-link !text-b16 font-bold" onClick={onNavigate}>
        {link.label}
      </Link>
      {link.description ? (
        <p className="mt-1 text-b12 leading-[150%] text-dark-gray">{link.description}</p>
      ) : null}
    </div>
  )
}

function GroupColumn({
  group,
  onNavigate,
}: {
  group: NavTopLevelItem['groups'][number]
  onNavigate?: () => void
}) {
  return (
    <div>
      <p className="field-label-text mb-3">{group.heading}</p>
      <ul>
        {group.links.map((link) => (
          <li key={link.href + link.label}>
            {link.description ? (
              <div className="mb-3">
                <Link href={link.href} className="mega-link !text-b16 font-bold" onClick={onNavigate}>
                  {link.label}
                </Link>
                <p className="mt-1 text-b12 leading-[150%] text-dark-gray">{link.description}</p>
              </div>
            ) : (
              <Link href={link.href} className="mega-link" onClick={onNavigate}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FeaturedSlot({
  featured,
  onNavigate,
}: {
  featured: NonNullable<NavTopLevelItem['featured']>
  onNavigate?: () => void
}) {
  return (
    <aside className="featured-slot" aria-label={`Featured: ${featured.title}`}>
      <div className="featured-img">
        <span className="field-label-text">Image slot</span>
      </div>
      <p className="text-b14 font-bold leading-[150%] text-primary-blue">{featured.title}</p>
      <p className="text-b12 leading-[150%] text-dark-gray">{featured.description}</p>
      <Link href={featured.href} className="btn-ghost mt-auto min-h-[40px] text-b12" onClick={onNavigate}>
        {featured.ctaLabel}
      </Link>
    </aside>
  )
}

function MegaPanel({
  item,
  panelId,
  triggerId,
  onNavigate,
}: {
  item: NavTopLevelItem
  panelId: string
  triggerId: string
  onNavigate?: () => void
}) {
  const gridClasses = getPanelGridClasses(item)
  const doctorsGroup = item.id === 'doctors' ? item.groups[0] : null

  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      className="mega-panel"
    >
      <div className="mx-auto max-w-screen-xl px-6 py-8 xl:px-8">
        {doctorsGroup ? (
          <>
            <p className="field-label-text mb-3">{doctorsGroup.heading}</p>
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
            {item.featured ? <FeaturedSlot featured={item.featured} onNavigate={onNavigate} /> : null}
          </div>
        )}

        {item.moreLink ? (
          <div className="mt-6 flex justify-end border-t border-dark-gray/10 pt-4">
            <Link href={item.moreLink.href} className="mega-more" onClick={onNavigate}>
              {item.moreLink.label}
            </Link>
          </div>
        ) : null}
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
              <p className="field-label-text mb-2">{item.groups[0].heading}</p>
              {item.groups[0].links.map((link) => (
                <div key={link.href + link.label} className="mb-3">
                  <Link href={link.href} onClick={onNavigate}>
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
                <p className="field-label-text mb-2">{group.heading}</p>
                {group.links.map((link) => (
                  <Link key={link.href + link.label} href={link.href} onClick={onNavigate}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))
          )}
          {item.featured ? (
            <div className="featured-slot mb-4">
              <p className="text-b14 font-bold leading-[150%] text-primary-blue">{item.featured.title}</p>
              <p className="text-b12 leading-[150%] text-dark-gray">{item.featured.description}</p>
              <Link href={item.featured.href} className="mega-more mt-2 inline-block" onClick={onNavigate}>
                {item.featured.ctaLabel}
              </Link>
            </div>
          ) : null}
          {item.moreLink ? (
            <Link
              href={item.moreLink.href}
              className="mega-more mt-2 inline-block !font-bold"
              onClick={onNavigate}
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
  const [openItemId, setOpenItemId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const closeMegaMenu = useCallback((returnFocus = false) => {
    setOpenItemId((current) => {
      if (returnFocus && current) {
        triggerRefs.current[current]?.focus()
      }
      return null
    })
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`)
    }

    setHeaderHeight()
    const observer = new ResizeObserver(setHeaderHeight)
    observer.observe(header)
    window.addEventListener('resize', setHeaderHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', setHeaderHeight)
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
    const onPointerDown = (event: MouseEvent) => {
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
        className="sticky top-0 z-header relative border-b border-dark-gray/15 bg-white/95 backdrop-blur"
      >
        <UtilityTopBar />

        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-6 py-3 xl:px-8">
          <Link href="/">
            <Image
              src="/hijaz-hospital-logo-dark.svg"
              alt="Hijaz Hospital"
              width={200}
              height={48}
              className="h-12 w-auto"
              priority
              unoptimized
            />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/services/emergency"
              className="inline-flex h-9 items-center rounded-full bg-primary-red px-4 text-b14 font-bold text-white transition-colors duration-300 hover:bg-primary-blue lg:h-11 lg:px-5"
            >
              Emergency
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-blue/25 text-primary-blue transition-colors duration-200 hover:border-primary-red hover:text-primary-red xl:hidden"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <List size={24} aria-hidden />
            </button>
          </div>
        </div>

        <nav aria-label="Primary" className="hidden border-t border-dark-gray/15 xl:block">
          <ul className="mx-auto flex max-w-screen-xl items-stretch justify-between px-2">
            {navigation.topLevel.map((item) => {
              const triggerId = `mega-trigger-${item.id}`
              const panelId = `mega-panel-${item.id}`
              const isOpen = openItemId === item.id

              return (
                <li
                  key={item.id}
                  className={cn('mega-item', isOpen && 'is-open')}
                  onMouseEnter={() => setOpenItemId(item.id)}
                  onMouseLeave={() => {
                    window.setTimeout(() => {
                      setOpenItemId((current) => {
                        if (current !== item.id) return current
                        const node = document.getElementById(triggerId)?.closest('.mega-item')
                        if (node?.matches(':focus-within') || node?.matches(':hover')) return current
                        return null
                      })
                    }, 0)
                  }}
                  onFocus={() => setOpenItemId(item.id)}
                  onBlur={(event) => {
                    window.setTimeout(() => {
                      if (!event.currentTarget.matches(':focus-within') && !event.currentTarget.matches(':hover')) {
                        setOpenItemId((current) => (current === item.id ? null : current))
                      }
                    }, 0)
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
                    onClick={() =>
                      setOpenItemId((current) => (current === item.id ? null : item.id))
                    }
                  >
                    {item.label}
                    <CaretDown size={14} aria-hidden className="shrink-0 transition-transform duration-200" />
                  </button>
                  <MegaPanel
                    item={item}
                    panelId={panelId}
                    triggerId={triggerId}
                    onNavigate={() => closeMegaMenu(false)}
                  />
                </li>
              )
            })}
          </ul>
        </nav>
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
          <Link href="/" onClick={() => setDrawerOpen(false)}>
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
            className="btn-primary flex w-full min-h-[48px] items-center justify-center text-b14"
            onClick={() => setDrawerOpen(false)}
          >
            Emergency
          </Link>
        </div>
      </div>
      ) : null}
    </>
  )
}
