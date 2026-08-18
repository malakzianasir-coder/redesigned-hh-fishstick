'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer transition-shadow duration-300 hover:shadow-lg',
        className,
      )}
      ref={card.ref}
      onMouseMove={(e) => {
        if (!card.ref.current) return
        const rect = card.ref.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        card.ref.current.style.setProperty('--mouse-x', `${x}px`)
      }}
    >
      {/* Magic Glow & Dots Hover Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden transition-opacity duration-500 opacity-0 group-hover:opacity-100">
        {/* Dots Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: 'radial-gradient(#1B2441 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 60%)',
          }}
        />
        
        {/* Tracking Glow Container */}
        <div 
          className="absolute top-0 w-[400px] h-[150px] -translate-x-1/2 -translate-y-1/2 transition-[left] duration-75 ease-out"
          style={{ left: 'var(--mouse-x, 50%)' }}
        >
          {/* Red Aura */}
          <div className="absolute inset-0 bg-[#E30016] rounded-full blur-[40px] opacity-50" />
          {/* Navy Core */}
          <div className="absolute top-1/2 left-1/2 w-[200px] h-[50px] -translate-x-1/2 -translate-y-1/2 bg-[#1B2441] rounded-full blur-[20px] opacity-60" />
          {/* White Hot Center */}
          <div className="absolute top-1/2 left-1/2 w-[80px] h-[20px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-[10px] opacity-80" />
        </div>

        {/* Crisp glowing top border line */}
        <div 
          className="absolute top-0 h-[2px] w-[200px] -translate-x-1/2 transition-[left] duration-75 ease-out"
          style={{ 
            left: 'var(--mouse-x, 50%)',
            background: 'linear-gradient(90deg, transparent 0%, #E30016 50%, transparent 100%)',
            boxShadow: '0 0 12px 2px #E30016',
          }}
        />
      </div>

      <div className="relative z-10 w-full ">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className="relative z-10 p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
