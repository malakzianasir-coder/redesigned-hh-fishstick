"use client"

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type FeedbackPortalProps = {
  children: ReactNode
}

export function FeedbackPortal({ children }: FeedbackPortalProps) {
  const [mounted, setMounted] = useState(false)
  const [documentHeight, setDocumentHeight] = useState(0)

  useEffect(() => {
    setMounted(true)

    const updateHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight)
    }

    updateHeight()

    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(document.documentElement)
    window.addEventListener("resize", updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return createPortal(
    <div
      className="pointer-events-none absolute left-0 top-0 z-[90] w-full"
      style={{ height: documentHeight }}
    >
      {children}
    </div>,
    document.body,
  )
}
