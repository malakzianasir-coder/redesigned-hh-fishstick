/**
 * @deprecated This mock flow is being replaced by the real JazzCash MWallet integration in DonationCheckout.tsx.
 * Keep this file around temporarily for local design iteration without JazzCash.
 */
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type MockDonationFlowProps = {
  title: string
  causeLabel?: string
  initialAmount?: string
}

export function MockDonationFlow({ title, causeLabel, initialAmount }: MockDonationFlowProps) {
  const router = useRouter()
  const [amount, setAmount] = useState(initialAmount && Number(initialAmount) > 0 ? initialAmount : '5000')
  const [name, setName] = useState('')

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div className="text-center">
            <p className="kicker">Mockup Flow</p>
            <h1 className="text-h3M font-bold leading-[120%] tracking-display text-primary-blue lg:text-h3">
              {title}
            </h1>
            <p className="mt-2 text-b16 leading-[150%] text-primary-blue/85">
              This is a prototype only. Payment is simulated and no real transaction happens on the
              site.
            </p>
          </div>

          <form
            className="card grid grid-cols-1 gap-4 p-6 lg:p-8"
            onSubmit={(event) => {
              event.preventDefault()
              router.push('/thank-you?mock=1')
            }}
          >
            <div>
              <label className="donation-field-label" htmlFor="donor-name">
                Donor name
              </label>
              <input
                id="donor-name"
                className="donation-field"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="donation-field-label" htmlFor="donation-amount">
                Amount (PKR)
              </label>
              <input
                id="donation-amount"
                className="donation-field"
                type="number"
                min={50}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>
            {causeLabel ? (
              <p className="text-b14 text-primary-blue/85">
                <span className="font-semibold text-primary-blue">Selected cause: </span>
                {causeLabel}
              </p>
            ) : null}
            <button type="submit" className="btn-primary">
              Proceed to JazzCash (Mock)
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
