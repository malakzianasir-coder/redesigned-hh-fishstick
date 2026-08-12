"use client"

import { usePathname } from "next/navigation"
import { FeedbackErrorBoundary } from "@/components/feedback/FeedbackErrorBoundary"
import { FeedbackOverlay } from "@/components/feedback/FeedbackOverlay"
import { MultiplayerCursors } from "@/components/feedback/MultiplayerCursors"

export function FeedbackTools() {
  const pathname = usePathname()

  return (
    <FeedbackErrorBoundary key={pathname}>
      <MultiplayerCursors />
      <FeedbackOverlay />
    </FeedbackErrorBoundary>
  )
}
