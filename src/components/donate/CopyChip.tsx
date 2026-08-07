'use client'

import { Copy } from '@phosphor-icons/react'
import { useState } from 'react'

type CopyChipProps = {
  value: string
  label?: string
}

export function CopyChip({ value, label }: CopyChipProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="copy-chip">
      <Copy size={14} weight="bold" />
      {copied ? 'Copied' : label ?? 'Copy'}
    </button>
  )
}
