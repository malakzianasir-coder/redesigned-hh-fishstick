'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  Ambulance,
  CalendarBlank,
  CaretDown,
  HandCoins,
  Phone,
  Stethoscope,
  FileText,
  X,
} from '@phosphor-icons/react'
import { cn } from '@/utilities/ui'

const LAB_REPORTS_URL = 'http://110.39.146.42:82/Patient/Login.aspx'
const HELPLINE_TEL = 'tel:009242111044529'

const FLOAT_ACTIONS = [
  {
    key: 'emergency',
    label: 'Emergency',
    shortLabel: 'SOS',
    href: '/services/emergency',
    Icon: Ambulance,
    variant: 'emergency' as const,
    pulse: true,
    ariaLabel: '24/7 Emergency services',
  },
  {
    key: 'appointment',
    label: 'Book Appointment',
    shortLabel: 'Book',
    href: '/appointment',
    Icon: CalendarBlank,
    variant: 'book' as const,
    pulse: false,
    ariaLabel: 'Book an appointment with a doctor',
  },
  {
    key: 'find-doctor',
    label: 'Find Doctor',
    shortLabel: 'Doctor',
    href: '/doctors',
    Icon: Stethoscope,
    variant: 'default' as const,
    pulse: false,
    ariaLabel: 'Find a doctor by job title or name',
  },
  {
    key: 'lab-reports',
    label: 'Lab Reports',
    shortLabel: 'Reports',
    href: LAB_REPORTS_URL,
    Icon: FileText,
    variant: 'default' as const,
    pulse: false,
    ariaLabel: 'View your lab reports securely',
  },
  {
    key: 'call',
    label: 'Call Helpline',
    shortLabel: 'Call',
    href: HELPLINE_TEL,
    Icon: Phone,
    variant: 'default' as const,
    pulse: false,
    ariaLabel: 'Call our 24/7 helpline',
  },
  {
    key: 'donate',
    label: 'Donate Now',
    shortLabel: 'Donate',
    href: '/donate',
    Icon: HandCoins,
    variant: 'default' as const,
    pulse: false,
    ariaLabel: 'Support Hijaz Hospital with a donation',
  },
] as const

function useScrollVisibility(threshold = 80) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return visible
}

function actionButtonClass(variant: 'emergency' | 'book' | 'default') {
  if (variant === 'emergency') {
    return 'bg-primary-red text-white shadow-e2 hover:bg-primary-blue'
  }
  if (variant === 'book') {
    return 'bg-primary-blue text-white shadow-e2 hover:bg-primary-red'
  }
  return 'border border-dark-gray/15 bg-white text-primary-blue shadow-e1 hover:border-primary-red hover:text-primary-red'
}

function ActionLink({
  action,
  className,
  iconSize = 20,
  showLabel = false,
}: {
  action: (typeof FLOAT_ACTIONS)[number]
  className?: string
  iconSize?: number
  showLabel?: boolean
}) {
  const { Icon } = action
  const content = (
    <>
      <Icon size={iconSize} weight="regular" aria-hidden />
      {showLabel ? (
        <span className="text-[10px] font-semibold leading-tight">{action.shortLabel}</span>
      ) : null}
    </>
  )

  const classes = cn(
    'inline-flex items-center justify-center rounded-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40',
    actionButtonClass(action.variant),
    action.pulse && 'relative',
    className,
  )

  const isExternal = action.href.startsWith('http')

  if (isExternal || action.href.startsWith('tel:')) {
    return (
      <a
        href={action.href}
        aria-label={action.ariaLabel}
        className={classes}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
        {action.pulse ? (
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary-red" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-primary-red opacity-75" />
          </span>
        ) : null}
      </a>
    )
  }

  return (
    <Link href={action.href} aria-label={action.ariaLabel} className={classes}>
      {content}
      {action.pulse ? (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary-red" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-primary-red opacity-75" />
        </span>
      ) : null}
    </Link>
  )
}

export function FloatingQuickActions() {
  const visible = useScrollVisibility()
  const [expanded, setExpanded] = useState(false)
  const mobileBarRef = useRef<HTMLDivElement>(null)

  const primaryActions = FLOAT_ACTIONS.slice(0, 3)
  const moreActions = FLOAT_ACTIONS.slice(3)

  useEffect(() => {
    if (!expanded) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [expanded])

  return (
    <>
      <div
        role="toolbar"
        aria-label="Quick actions"
        aria-orientation="vertical"
        className={cn(
          'fixed bottom-6 right-5 z-overlay hidden flex-col items-center gap-2 rounded-[28px] border border-dark-gray/15 bg-white/80 p-2 shadow-e3 backdrop-blur transition-all duration-300 xl:flex',
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        )}
      >
        {FLOAT_ACTIONS.map((action) => (
          <div key={action.key} className="group relative">
            <ActionLink action={action} className="h-12 w-12" />
            <span className="pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary-blue px-3 py-1.5 text-b12 font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
              {action.label}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={mobileBarRef}
        role="toolbar"
        aria-label="Quick actions"
        aria-orientation="horizontal"
        className={cn(
          'fixed bottom-0 left-0 right-0 z-overlay border-t border-dark-gray/15 bg-white/90 backdrop-blur transition-transform duration-300 xl:hidden',
          visible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {expanded ? (
          <div className="mx-3 mb-2 rounded-[22px] border border-dark-gray/15 bg-white/95 p-3 shadow-e2 backdrop-blur">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-b12 font-bold uppercase tracking-kicker text-dark-gray">
                More actions
              </span>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close more actions"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-dark-gray transition hover:bg-cardbg hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moreActions.map((action) => (
                <ActionLink
                  key={action.key}
                  action={action}
                  className="flex-col gap-1.5 rounded-2xl px-3 py-3"
                  iconSize={20}
                  showLabel
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1.5">
          <div className="mx-auto flex w-full max-w-lg items-center justify-between gap-0.5 px-1">
            {primaryActions.map((action) => (
              <ActionLink
                key={action.key}
                action={action}
                className="relative flex flex-1 flex-col gap-0.5 rounded-xl py-1.5"
                iconSize={18}
                showLabel
              />
            ))}
            <button
              type="button"
              aria-expanded={expanded}
              aria-label={expanded ? 'Show fewer actions' : 'Show more actions'}
              onClick={() => setExpanded((prev) => !prev)}
              className="flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-dark-gray transition hover:bg-cardbg hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cardbg text-primary-blue">
                <CaretDown
                  size={18}
                  className={cn('transition-transform duration-200', expanded && 'rotate-180')}
                  aria-hidden
                />
              </span>
              <span className="text-[10px] font-semibold leading-tight">{expanded ? 'Less' : 'More'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
