'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

type DonationCheckoutProps = {
  title: string
  causeLabel?: string
  causeSlug?: string
  initialAmount?: string
}

export function DonationCheckout({ title, causeLabel, causeSlug, initialAmount }: DonationCheckoutProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<'mwallet' | 'portal'>('mwallet')
  const [amount, setAmount] = useState(initialAmount && Number(initialAmount) > 0 ? initialAmount : '5000')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [cnicLast6, setCnicLast6] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    try {
      if (paymentMethod === 'mwallet') {
        const res = await fetch('/api/jazzcash/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donorName: name,
            mobileNumber,
            cnicLast6,
            amount: Number(amount),
            causeSlug,
            causeTitle: causeLabel
          })
        })
        
        const data = await res.json()
        
        if (data.success && data.redirectUrl) {
          router.push(data.redirectUrl)
        } else {
          setErrorMsg(data.message || data.responseMessage || 'Transaction failed. Please try again.')
        }
      } else {
        const res = await fetch('/api/jazzcash/portal/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donorName: name,
            amount: Number(amount),
            causeSlug,
            causeTitle: causeLabel
          })
        })
        
        const data = await res.json()
        
        if (data.success && data.endpoint && data.params) {
          const form = document.createElement('form')
          form.method = 'POST'
          form.action = data.endpoint
          
          Object.entries(data.params).forEach(([key, value]) => {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = String(value)
            form.appendChild(input)
          })
          
          document.body.appendChild(form)
          form.submit()
        } else {
          setErrorMsg(data.message || 'Failed to initiate secure checkout. Please try again.')
        }
      }
    } catch (_err) {
      setErrorMsg('A network error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div className="text-center">
            <p className="kicker">Online Donation</p>
            <h1 className="text-h3M font-bold leading-[120%] tracking-display text-primary-blue lg:text-h3">
              {title}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="card grid grid-cols-1 gap-6 p-6 lg:p-8">
             {errorMsg && (
              <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {errorMsg}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setPaymentMethod('mwallet')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${paymentMethod === 'mwallet' ? 'bg-white text-primary-blue shadow' : 'text-gray-600 hover:text-gray-900'}`}
              >
                JazzCash App Approval
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('portal')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-colors ${paymentMethod === 'portal' ? 'bg-white text-primary-blue shadow' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Cards / Other Methods
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="donation-field-label" htmlFor="donor-name">Donor Name</label>
                <input
                  id="donor-name"
                  className="donation-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  maxLength={100}
                  disabled={isLoading}
                />
              </div>

              {paymentMethod === 'mwallet' && (
                <>
                  <div>
                    <label className="donation-field-label" htmlFor="mobile-number">JazzCash Mobile Number</label>
                    <input
                      id="mobile-number"
                      type="tel"
                      className="donation-field"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="03XXXXXXXXX"
                      required
                      pattern="^03\d{9}$"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="donation-field-label" htmlFor="cnic-last6">CNIC Last 6 Digits</label>
                    <input
                      id="cnic-last6"
                      type="text"
                      className="donation-field"
                      value={cnicLast6}
                      onChange={(e) => setCnicLast6(e.target.value)}
                      placeholder="123456"
                      required
                      pattern="^\d{6}$"
                      maxLength={6}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="donation-field-label" htmlFor="donation-amount">Amount (PKR)</label>
                <input
                  id="donation-amount"
                  className="donation-field"
                  type="number"
                  min={50}
                  max={10000000}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {causeLabel ? (
              <p className="text-b14 text-primary-blue/85">
                <span className="font-semibold text-primary-blue">Selected cause: </span>
                {causeLabel}
              </p>
            ) : null}
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Processing...' : (paymentMethod === 'mwallet' ? 'Proceed with JazzCash App' : 'Proceed to Secure Checkout')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
