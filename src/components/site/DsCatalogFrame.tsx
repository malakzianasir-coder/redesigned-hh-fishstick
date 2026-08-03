'use client'

import { useEffect, useRef } from 'react'

type DsCatalogFrameProps = {
  src: string
  title: string
}

export function DsCatalogFrame({ src, title }: DsCatalogFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let resizeObserver: ResizeObserver | undefined

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument
        if (!doc?.body) return
        const height = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
        iframe.style.height = `${height}px`
      } catch {
        // Keep viewport fallback from className when the document is not accessible.
      }
    }

    const onLoad = () => {
      syncHeight()
      const doc = iframe.contentDocument
      if (!doc?.body) return

      resizeObserver = new ResizeObserver(syncHeight)
      resizeObserver.observe(doc.body)
    }

    iframe.addEventListener('load', onLoad)
    return () => {
      iframe.removeEventListener('load', onLoad)
      resizeObserver?.disconnect()
    }
  }, [src])

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className="min-h-[calc(100vh-var(--header-h,148px))] w-full border-0"
    />
  )
}
