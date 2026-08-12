"use client"

import { Component, type ReactNode } from "react"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class FeedbackErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override componentDidCatch(error: Error) {
    console.error("Feedback overlay error:", error)
  }

  override render() {
    if (this.state.hasError) {
      return null
    }

    return this.props.children
  }
}
