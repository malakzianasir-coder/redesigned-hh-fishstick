'use client'

import Link from 'next/link'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'

type MarketingBreadcrumbProps = {
  items: { label: string; href?: string }[]
}

export function MarketingBreadcrumb({ items }: MarketingBreadcrumbProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stickToEndRef = useRef(true)
  const [showStartFade, setShowStartFade] = useState(false)
  const [showEndFade, setShowEndFade] = useState(false)

  const syncScroller = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = Math.max(0, el.scrollWidth - el.clientWidth)
    if (stickToEndRef.current) {
      el.scrollLeft = max
    }
    if (max <= 1) {
      setShowStartFade(false)
      setShowEndFade(false)
      stickToEndRef.current = true
      return
    }
    setShowStartFade(el.scrollLeft > 1)
    setShowEndFade(el.scrollLeft < max - 1)
    stickToEndRef.current = el.scrollLeft >= max - 1
  }, [])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    stickToEndRef.current = true
    syncScroller()
    el.addEventListener('scroll', syncScroller, { passive: true })
    window.addEventListener('resize', syncScroller)
    const observer = new ResizeObserver(syncScroller)
    observer.observe(el)
    const trail = el.firstElementChild
    if (trail) observer.observe(trail)

    return () => {
      el.removeEventListener('scroll', syncScroller)
      window.removeEventListener('resize', syncScroller)
      observer.disconnect()
    }
  }, [items, syncScroller])

  return (
    <nav aria-label="Breadcrumb" className="border-b border-dark-gray/15 bg-white pt-[var(--header-h-expanded)]">
      <div className="container mx-auto px-6 py-2 lg:px-[30px]">
        <div className="breadcrumb-overflow">
          <div
            className={cn('breadcrumb-overflow__fade breadcrumb-overflow__fade--start', showStartFade && 'is-visible')}
            aria-hidden
          />
          <div
            className={cn('breadcrumb-overflow__fade breadcrumb-overflow__fade--end', showEndFade && 'is-visible')}
            aria-hidden
          />
          <div ref={scrollerRef} className="breadcrumb-scroller">
            <ol className="flex w-max flex-nowrap items-center gap-2 text-b12 leading-[150%] text-dark-gray">
              {items.map((item, index) => (
                <li key={`${item.label}-${index}`} className="flex shrink-0 items-center gap-2">
                  {index > 0 ? <span className="text-dark-gray/40">/</span> : null}
                  {item.href ? (
                    <Link href={item.href} className="text-primary-blue transition-colors hover:text-primary-red">
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-primary-blue">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { JumpNav } from '@/components/sections/JumpNav'
