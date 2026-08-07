'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

type BackButtonProps = {
  fallbackHref: string
  children: ReactNode
  className?: string
}

function sameOriginReferrer(): string | null {
  const referrer = document.referrer
  if (!referrer) return null

  try {
    const referrerUrl = new URL(referrer)
    if (referrerUrl.origin !== window.location.origin) return null
    return `${referrerUrl.pathname}${referrerUrl.search}${referrerUrl.hash}`
  } catch {
    return null
  }
}

export function BackButton({ fallbackHref, children, className }: BackButtonProps) {
  const router = useRouter()

  function handleClick() {
    if (window.history.length > 1) {
      router.back()
      return
    }

    const referrerPath = sameOriginReferrer()
    if (referrerPath) {
      router.push(referrerPath)
      return
    }

    router.push(fallbackHref)
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
