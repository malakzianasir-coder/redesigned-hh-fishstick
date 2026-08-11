'use client'

import { X } from '@phosphor-icons/react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'

import type { CommitteeCard } from '@/lib/content/types'

type CommitteeDrawerProps = {
  committee: CommitteeCard | null
  onClose: () => void
  exOfficioNote?: string
}

export function CommitteeDrawer({ committee, onClose, exOfficioNote }: CommitteeDrawerProps) {
  useEffect(() => {
    if (!committee) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [committee, onClose])

  if (!committee || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-modal flex justify-end bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="committee-drawer-title"
      onClick={onClose}
    >
      <div
        className="card flex h-full w-full max-w-lg flex-col overflow-hidden rounded-none border-0 shadow-e3 sm:max-w-xl sm:rounded-s-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-dark-gray/15 p-6">
          <div className="flex flex-col gap-2">
            <span className="chip w-fit text-b12 is-active">
              Core Committee
            </span>
            <h2 id="committee-drawer-title" className="text-h3M font-bold text-primary-blue lg:text-h3">
              {committee.name}
            </h2>
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

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
          {committee.convener && (
            <div>
              <span className="field-label-text">Convener</span>
              <p className="text-b16 font-semibold text-primary-blue mt-1">{committee.convener}</p>
            </div>
          )}

          {committee.coConvener && (
            <div>
              <span className="field-label-text">Co-Convener</span>
              <p className="text-b16 font-semibold text-primary-blue mt-1">{committee.coConvener}</p>
            </div>
          )}

          {committee.members && committee.members.length > 0 && (
            <div>
              <span className="field-label-text">Members</span>
              <ul className="mt-2 flex flex-col gap-2">
                {committee.members.map((member) => (
                  <li key={member} className="flex items-start gap-2 text-b14 leading-[150%] text-primary-blue/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-red" aria-hidden />
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {exOfficioNote && (
          <div className="shrink-0 border-t border-dark-gray/15 bg-whitebg p-6">
            <p className="text-b12 italic text-primary-blue/70">
              * {exOfficioNote}
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
