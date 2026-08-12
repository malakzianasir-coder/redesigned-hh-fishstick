'use client'

import { useEffect, useState } from 'react'

import { ChipRail } from '@/components/sections/ChipRail'
import type { JumpLink } from '@/lib/content/types'

type JumpNavProps = {
  links: JumpLink[]
}

function isHashLink(href: string) {
  return href.startsWith('#')
}

/** In-document section jump nav — sticky, hash chips scroll; other-page chips open in a new tab. */
export function JumpNav({ links }: JumpNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const hashLinks = links.filter((link) => isHashLink(link.href))
  const externalLinks = links.filter((link) => !isHashLink(link.href))

  useEffect(() => {
    const sectionIds = links
      .filter((link) => isHashLink(link.href))
      .map((link) => link.href.replace(/^#/, ''))
      .filter(Boolean)

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [links])

  return (
    <ChipRail
      className="jump-nav-rail"
      label="On this page"
      ariaLabel="On this page"
      items={hashLinks.map((link) => ({
        label: link.label,
        href: link.href,
        active: activeId === link.href.replace(/^#/, ''),
      }))}
      externals={externalLinks}
    />
  )
}
