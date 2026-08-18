'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { MagicCardEffect } from './MagicCardEffect'

export type InteractiveCardProps = React.HTMLAttributes<HTMLElement> & {
  href?: string
  as?: React.ElementType
  target?: string
  rel?: string
}

export const InteractiveCard = React.forwardRef<HTMLElement, InteractiveCardProps>(
  ({
    href, as, target, rel, className, children,
    ...props
  }, ref) => {
    const Component = href ? Link : (as || 'article')

    return (
      <Component
        href={href as any}
        target={target}
        rel={rel}
        className={cn('card-interactive relative group', className)}
        ref={ref as any}
        {...props}
      >
        {children}
        <MagicCardEffect />
      </Component>
    )
  }
)
InteractiveCard.displayName = 'InteractiveCard'
