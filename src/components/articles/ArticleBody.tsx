import Image from 'next/image'
import React from 'react'

import type { ArticleBlock } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type ArticleBodyProps = {
  blocks: ArticleBlock[]
  className?: string
}

const headingClasses: Record<number, string> = {
  2: 'text-h4M font-bold text-primary-blue lg:text-h4',
  3: 'text-h5M font-bold text-primary-blue lg:text-h5',
  4: 'text-h6 font-bold text-primary-blue',
}

export function ArticleBody({ blocks, className }: ArticleBodyProps) {
  return (
    <div className={cn('mx-auto flex max-w-[1080px] flex-col gap-6', className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className="text-b16 leading-[150%] text-primary-blue/85">
                {block.text}
              </p>
            )
          case 'heading':
            const level = block.level ?? 3
            const Tag = level === 2 ? 'h2' : level === 4 ? 'h4' : 'h3'
            return (
              <Tag key={index} className={headingClasses[level]}>
                {block.text}
              </Tag>
            )
          case 'image':
            return (
              <figure key={index} className="flex flex-col gap-2">
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={block.src}
                    alt={block.alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1080px) 100vw, 1080px"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="text-b14 text-dark-gray">{block.caption}</figcaption>
                ) : null}
              </figure>
            )
          case 'quote':
            return (
              <blockquote
                key={index}
                className="border-l-4 border-primary-red pl-4 text-b16 italic leading-[150%] text-primary-blue/85"
              >
                &ldquo;{block.text}&rdquo;
                {block.attribution ? (
                  <cite className="mt-2 block text-b14 font-semibold not-italic text-primary-blue">
                    — {block.attribution}
                  </cite>
                ) : null}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
