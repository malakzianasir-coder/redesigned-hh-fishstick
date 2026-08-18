'use client'

import { useState } from 'react'
import Image from 'next/image'
import { InteractiveCard } from '@/components/ui/InteractiveCard'
import { QrCode, ArrowRight } from '@phosphor-icons/react/dist/ssr'

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
    <InteractiveCard as="article" className="flex flex-col gap-3 p-6 group">
      <div className="flex shrink-0 items-start">
        {account.logo ? (
          <Image
            src={account.logo}
            alt={account.bank}
            width={120}
            height={36}
            className="h-[36px] w-auto object-contain"
          />
        ) : (
          <span className="text-b14 font-bold leading-[120%] text-primary-blue">{account.bank}</span>
        )}
      </div>
      
      <h3 className="text-h6 font-bold leading-[120%] text-primary-blue transition-colors group-hover:text-primary-red lg:text-h6M">
        {account.title}
      </h3>
      <p className="text-b14 leading-[150%] text-primary-blue/85">{account.bank}</p>

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="mt-auto inline-flex items-center gap-1 text-b14 font-bold text-primary-red transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 rounded w-max"
      >
        {isExpanded ? "Hide Details" : "View Details"}
        <ArrowRight
          size={16}
          weight="bold"
          className={cn("transition-transform duration-300", isExpanded ? "rotate-90" : "group-hover:translate-x-1")}
        />
      </button>

      <div 
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-dark-gray/15 pt-5">
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
      </div>
    </InteractiveCard>
  )
}
