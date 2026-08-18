'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { MagicCardEffect } from './MagicCardEffect'

export type CardLayout = 'vertical' | 'horizontal' | 'centered'
export type CardMediaType = 'image' | 'avatar' | 'portrait' | 'icon' | 'custom'

export type InteractiveCardProps = React.HTMLAttributes<HTMLElement> & {
  href?: string
  as?: React.ElementType
  layout?: CardLayout
  mediaType?: CardMediaType
  media?: string | React.ReactNode 
  mediaAlt?: string
  kicker?: string
  title?: React.ReactNode
  titleAccessory?: React.ReactNode 
  subtitle?: React.ReactNode
  body?: React.ReactNode 
  badges?: string[] 
  actionLabel?: string 
  withActionArrow?: boolean
}

export const InteractiveCard = React.forwardRef<HTMLElement, InteractiveCardProps>(
  ({ 
    href, as, className, children,
    layout, mediaType, media, mediaAlt,
    kicker, title, titleAccessory, subtitle, body,
    badges, actionLabel, withActionArrow,
    ...props 
  }, ref) => {
    const Component = href ? Link : (as || 'article')
    
    // If standard CMS props are passed, we could render the structured DOM here.
    // For now, if children are provided, we strictly use the escape hatch to guarantee 100% legacy coverage.
    
    return (
      <Component
        href={href as any}
        className={cn('card-interactive relative group', className)}
        ref={ref as any}
        {...props}
      >
        <MagicCardEffect />
        
        {children ? (
          /* ESCAPE HATCH: Renders raw children for custom layouts (like founder-card) */
          children
        ) : (
          /* STANDARD CMS DOM (Future Integration) */
          <div className="relative z-10 flex flex-col h-full">
            {media && mediaType === 'image' && (
              <div className="aspect-card overflow-hidden bg-cardbg">
                {/* Image rendering would go here */}
              </div>
            )}
            <div className="flex flex-col gap-2 p-6 flex-1">
              {kicker && <p className="kicker">{kicker}</p>}
              {title && <h3 className="text-h6 font-bold text-primary-blue">{title}</h3>}
              {body && <p className="text-b14 text-primary-blue/85">{body}</p>}
            </div>
          </div>
        )}
      </Component>
    )
  }
)
InteractiveCard.displayName = 'InteractiveCard'
