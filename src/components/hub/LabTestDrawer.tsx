'use client'

import { X } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

import type { ContentBlock, LabTestRecord } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type LabTestDrawerProps = {
  test: LabTestRecord | null
  onClose: () => void
}

function renderBlocks(blocks: ContentBlock[] | undefined) {
  if (!blocks?.length) return null
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-b14 text-primary-blue/85">
            {block.text}
          </p>
        )
      case 'heading':
        return block.level === 3 ? (
          <h4 key={index} className="text-h4M font-bold text-primary-blue lg:text-h4">
            {block.text}
          </h4>
        ) : (
          <h5 key={index} className="text-b16 font-bold text-primary-blue">
            {block.text}
          </h5>
        )
      case 'quote':
        return (
          <blockquote
            key={index}
            className="border-s-4 border-primary-red/40 ps-4 text-b14 italic text-primary-blue/85"
          >
            {block.text}
          </blockquote>
        )
      default:
        return null
    }
  })
}

function DrawerSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  if (!children) return null
  return (
    <section className={cn('flex flex-col gap-2', className)}>
      <h4 className="text-b16 font-bold text-primary-blue">{title}</h4>
      {children}
    </section>
  )
}

export function LabTestDrawer({ test, onClose }: LabTestDrawerProps) {
  useEffect(() => {
    if (!test) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [test, onClose])

  if (!test || typeof document === 'undefined') return null

  const hasAbout = Boolean(test.description?.length)
  const hasPrep = Boolean(test.preparation?.length)
  const hasIncluded = Boolean(test.includedTests?.length)

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-test-drawer-title"
      onClick={onClose}
    >
      <div
        className="card flex h-full w-full max-w-lg flex-col overflow-hidden rounded-none border-0 shadow-e3 sm:max-w-xl sm:rounded-s-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-dark-gray/15 p-6">
          <div className="flex flex-col gap-2">
            <span
              className={cn(
                'chip w-fit text-b12',
                test.isOutsourced ? 'border-warning/40 bg-warning/10 text-warning' : 'is-active',
              )}
            >
              {test.isOutsourced ? 'Outsourced' : 'In-house'}
            </span>
            <h2 id="lab-test-drawer-title" className="text-h3M font-bold text-primary-blue lg:text-h3">
              {test.name}
            </h2>
            {test.alsoKnownAs && test.alsoKnownAs.length > 0 ? (
              <p className="text-b12 text-dark-gray">
                Also known as: {test.alsoKnownAs.map((a) => a.name).join(', ')}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost !min-h-[44px] !px-3"
            aria-label="Close"
          >
            <X size={20} weight="bold" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="field-label-text">Specimen</dt>
              <dd className="text-b14 text-primary-blue/85">{test.specimen || '—'}</dd>
            </div>
            <div>
              <dt className="field-label-text">Reporting time</dt>
              <dd className="text-b14 text-primary-blue/85">{test.reportingTime || '—'}</dd>
            </div>
            <div>
              <dt className="field-label-text">Category</dt>
              <dd className="text-b14 text-primary-blue/85">{test.category}</dd>
            </div>
          </dl>

          {hasAbout ? (
            <DrawerSection title="About">
              <div className="flex flex-col gap-2">{renderBlocks(test.description)}</div>
            </DrawerSection>
          ) : null}

          {hasPrep ? (
            <DrawerSection title="Preparation">
              <div className="flex flex-col gap-2">{renderBlocks(test.preparation)}</div>
            </DrawerSection>
          ) : null}

          {hasIncluded ? (
            <DrawerSection title="Included tests">
              <ul className="list-disc ps-5 text-b14 text-primary-blue/85">
                {test.includedTests!.map((item, i) => (
                  <li key={`${item.name}-${i}`}>{item.name}</li>
                ))}
              </ul>
            </DrawerSection>
          ) : null}

          {test.sampleInstructions ? (
            <DrawerSection title="Sample instructions">
              <p className="text-b14 text-primary-blue/85">{test.sampleInstructions}</p>
            </DrawerSection>
          ) : null}

          {test.reportDelivery ? (
            <DrawerSection title="Report delivery">
              <p className="text-b14 text-primary-blue/85">{test.reportDelivery}</p>
            </DrawerSection>
          ) : null}

          {test.availability ? (
            <DrawerSection title="Availability">
              <p className="text-b14 text-primary-blue/85">{test.availability}</p>
            </DrawerSection>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-dark-gray/15 bg-whitebg p-6">
          <p className="text-b14 text-primary-blue/70">
            For booking help call{' '}
            <a href="tel:009242111044529" className="font-semibold text-primary-red hover:text-primary-blue">
              042 111 044 529
            </a>
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
