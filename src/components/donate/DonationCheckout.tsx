'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import { Recaptcha, type RecaptchaRef } from '@/components/forms/Recaptcha'

type DonationCheckoutProps = {
  title: string
  causeLabel?: string
  causeSlug?: string
  initialAmount?: string
  recaptchaEnabled?: boolean
}

export function DonationCheckout({
  title,
  causeLabel,
  causeSlug,
  initialAmount,
  recaptchaEnabled = true,
}: DonationCheckoutProps) {
  const router = useRouter()
  const recaptchaRef = useRef<RecaptchaRef>(null)
  const [paymentMethod, setPaymentMethod] = useState<'mwallet' | 'portal'>('mwallet')
  const [amount, setAmount] = useState(initialAmount && Number(initialAmount) > 0 ? initialAmount : '5000')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [cnicLast6, setCnicLast6] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMsg('')

    if (recaptchaEnabled && !recaptchaToken) {
      setErrorMsg('Please complete the reCAPTCHA verification to proceed.')
      return
    }

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
            causeTitle: causeLabel,
            recaptchaToken,
          }),
        })

        const data = await res.json()

        if (data.success && data.redirectUrl) {
          router.push(data.redirectUrl)
        } else {
          recaptchaRef.current?.reset()
          setRecaptchaToken('')
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
            causeTitle: causeLabel,
            recaptchaToken,
          }),
        })

        const contentType = res.headers.get('content-type') || ''

        if (contentType.includes('text/html')) {
          // Server returned auto-submitting HTML — write it to document to redirect
          const html = await res.text()
          document.open()
          document.write(html)
          document.close()
          return // Page is now replaced, no further action needed
        } else {
          // Server returned JSON error
          const data = await res.json()
          recaptchaRef.current?.reset()
          setRecaptchaToken('')
          setErrorMsg(data.message || 'Failed to initiate secure checkout. Please try again.')
        }
      }
    } catch (_err) {
      recaptchaRef.current?.reset()
      setRecaptchaToken('')
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
            {errorMsg ? (
              <div
                className="rounded-xl border border-error/20 bg-redbg p-4 text-b14 font-medium text-error"
                role="alert"
              >
                {errorMsg}
              </div>
            ) : null}

            <div className="flex flex-col gap-2 rounded-2xl bg-cardbg p-1 sm:flex-row">
              <button
                type="button"
                onClick={() => setPaymentMethod('mwallet')}
                className={`min-h-[44px] flex-1 rounded-xl px-4 text-b14 font-bold transition-all duration-300 ${
                  paymentMethod === 'mwallet'
                    ? 'bg-white text-primary-blue shadow-sm'
                    : 'text-primary-blue/70 hover:text-primary-blue'
                }`}
              >
                JazzCash App Approval
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('portal')}
                className={`min-h-[44px] flex-1 rounded-xl px-4 text-b14 font-bold transition-all duration-300 ${
                  paymentMethod === 'portal'
                    ? 'bg-white text-primary-blue shadow-sm'
                    : 'text-primary-blue/70 hover:text-primary-blue'
                }`}
              >
                Cards / Other Methods
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="donation-field-label" htmlFor="donor-name">
                  Donor Name
                </label>
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
                    <label className="donation-field-label" htmlFor="mobile-number">
                      JazzCash Mobile Number
                    </label>
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
                    <label className="donation-field-label" htmlFor="cnic-last6">
                      CNIC Last 6 Digits
                    </label>
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
                <label className="donation-field-label" htmlFor="donation-amount">
                  Amount (PKR)
                </label>
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

            {recaptchaEnabled && (
              <div>
                <label className="donation-field-label">Security Verification</label>
                <Recaptcha
                  ref={recaptchaRef}
                  onVerify={(token) => {
                    setRecaptchaToken(token)
                    setErrorMsg('')
                  }}
                  onExpire={() => setRecaptchaToken('')}
                  onError={() => {
                    setRecaptchaToken('')
                    setErrorMsg('Security verification encountered an error. Please try again.')
                  }}
                />
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading
                ? 'Processing...'
                : paymentMethod === 'mwallet'
                  ? 'Proceed with JazzCash App'
                  : 'Proceed to Secure Checkout'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
