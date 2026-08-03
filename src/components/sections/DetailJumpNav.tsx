'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { JumpLink } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type DetailJumpNavProps = {
  links: JumpLink[]
}

export function DetailJumpNav({ links }: DetailJumpNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const sectionIds = links
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
    <nav className="sticky-bar" aria-label="On this page">
      <div className="container mx-auto px-6 py-3 lg:px-[30px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="field-label-text mr-1">On this page</span>
          {links.map((link) => {
            const sectionId = link.href.replace(/^#/, '')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn('chip', activeId === sectionId && 'is-active')}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
