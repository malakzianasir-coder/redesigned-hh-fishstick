'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type MockDonationFlowProps = {
  title: string
  causeLabel?: string
}

export function MockDonationFlow({ title, causeLabel }: MockDonationFlowProps) {
  const router = useRouter()
  const [amount, setAmount] = useState('5000')
  const [name, setName] = useState('')

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div className="text-center">
            <p className="kicker">Mockup Flow</p>
            <h1 className="text-h3M font-bold text-primary-blue lg:text-h3">{title}</h1>
            <p className="mt-2 text-b16 text-primary-blue/85">
              This is a prototype only. Payment is simulated and no real transaction happens on the site.
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
              <label className="mb-2 block text-b14 font-semibold text-primary-blue">Donor name</label>
              <input
                className="donation-field"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-b14 font-semibold text-primary-blue">Amount (PKR)</label>
              <input
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
            <button
              type="submit"
              className="inline-flex min-h-[50px] items-center justify-center rounded-full bg-primary-red px-6 text-b16 font-bold text-white transition-colors duration-300 hover:bg-primary-blue"
            >
              Proceed to JazzCash (Mock)
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
