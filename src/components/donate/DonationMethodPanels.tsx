import Image from 'next/image'
import { QrCode } from '@phosphor-icons/react/dist/ssr'

import { CopyChip } from '@/components/donate/CopyChip'
import type { HowToDonateBankAccount } from '@/lib/content/types'

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
  return (
    <article className="card flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <div className="bank-logo flex h-12 w-16 items-center justify-center rounded-xl border border-dark-gray/15 bg-whitebg px-2">
          {account.logo ? (
            <Image
              src={account.logo}
              alt={account.bank}
              width={56}
              height={36}
              className="max-h-[36px] max-w-[56px] object-contain"
            />
          ) : (
            <span className="text-b12 font-bold text-primary-blue">{account.bank}</span>
          )}
        </div>
        <div>
          <h3 className="text-h6M font-bold text-primary-blue lg:text-h6">{account.title}</h3>
          <p className="text-b12 text-dark-gray">{account.bank}</p>
        </div>
      </div>
      <dl className="flex flex-col gap-2 text-b14">
        {account.fields.map((field) => (
          <div
            key={field.label}
            className="flex flex-col gap-2 border-b border-dark-gray/15 pb-2 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <dt className="text-dark-gray">{field.label}</dt>
            <dd className="flex flex-wrap items-center justify-end gap-2 text-right font-mono text-primary-blue">
              <span className="break-all">{field.value}</span>
              {field.copyValue ? <CopyChip value={field.copyValue} /> : null}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
