const fs = require('fs');

const content = `'use client'

import { useState } from 'react'
import Image from 'next/image'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { QrCode, CaretDown, CaretUp } from '@phosphor-icons/react/dist/ssr'

import { CopyChip } from '@/components/donate/CopyChip'
import type { HowToDonateBankAccount } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

export function QrPlaceholder({ note }: { note: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-3 rounded-2xl border border-dark-gray/15 bg-whitebg p-5">
      <div
        className="flex h-36 w-36 items-center justify-center rounded-xl border border-dashed border-dark-gray/40 bg-cardbg text-primary-blue/40"
        aria-hidden="true"
      >
        <QrCode size={64} weight="duotone" />
      </div>
      <p className="max-w-[180px] text-center text-b12 text-dark-gray">{note}</p>
    </div>
  )
}

export function BankAccountCard({ account }: { account: HowToDonateBankAccount }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <InteractiveCard as="article" className="flex flex-col p-6 lg:p-8">
      <button 
        type="button"
        className="flex items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 rounded-xl"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl border border-dark-gray/10 bg-white p-2 shadow-sm">
          {account.logo ? (
            <Image
              src={account.logo}
              alt={account.bank}
              width={64}
              height={40}
              className="max-h-[40px] max-w-[64px] object-contain"
            />
          ) : (
            <span className="text-center text-b12 font-bold leading-[120%] text-primary-blue">{account.bank}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <h3 className="text-h6M font-bold leading-tight text-primary-blue">{account.title}</h3>
          <p className="text-b14 font-medium text-dark-gray">{account.bank}</p>
        </div>
        <div className="flex shrink-0 items-center justify-center h-10 w-10 rounded-full border border-dark-gray/15 text-primary-blue transition-colors hover:bg-cardbg">
          {isExpanded ? <CaretUp size={20} weight="bold" /> : <CaretDown size={20} weight="bold" />}
        </div>
      </button>

      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-6 border-t border-dark-gray/10 pt-6" : "grid-rows-[0fr] opacity-0 mt-0 border-t-0 pt-0"
        )}
      >
        <div className="overflow-hidden">
          <dl className="flex flex-col gap-5 text-b14">
            {account.fields.map((field) => (
              <div key={field.label} className="flex flex-col gap-1.5">
                <dt className="text-b12 font-semibold uppercase tracking-wider text-dark-gray">{field.label}</dt>
                <dd className="flex items-center gap-3">
                  <span className="font-mono text-b16 font-medium text-primary-blue">{field.value}</span>
                  {field.copyValue ? <CopyChip value={field.copyValue} label="Copy" /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </InteractiveCard>
  )
}
`

fs.writeFileSync('src/components/donate/DonationMethodPanels.tsx', content)
console.log('Updated Panels');
