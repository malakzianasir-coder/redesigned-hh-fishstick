'use client'

import { ArrowSquareOut } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import type { JumpLink } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

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

  if (!links.length) return null

  return (
    <nav className="sticky-bar" aria-label="On this page">
      <div className="container mx-auto px-6 py-4 lg:px-[30px]">
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-6">
          {hashLinks.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="field-label-text mr-1">On this page</span>
              {hashLinks.map((link) => {
                const sectionId = link.href.replace(/^#/, '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn('chip', activeId === sectionId && 'is-active')}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          ) : null}
          {hashLinks.length > 0 && externalLinks.length > 0 ? (
            <div className="hidden h-6 w-px bg-dark-gray/15 lg:block" aria-hidden="true" />
          ) : null}
          {externalLinks.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <ArrowSquareOut size={16} weight="bold" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
