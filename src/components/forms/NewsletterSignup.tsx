'use client'

import { EnvelopeOpen } from '@phosphor-icons/react/dist/ssr'
import { type FormEvent, useState } from 'react'

type NewsletterSignupProps = {
  label: string
  placeholder: string
  buttonLabel: string
  successMessage: string
  errorMessage: string
}

export function NewsletterSignup({
  label,
  placeholder,
  buttonLabel,
  successMessage,
  errorMessage,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) {
      setStatus('error')
      setMessage(errorMessage)
      return
    }
    setStatus('success')
    setMessage(successMessage)
    setEmail('')
  }

  return (
    <div className="mt-3 flex w-full flex-col items-center gap-1 lg:items-start">
      <label htmlFor="footer-email" className="text-b12 font-semibold uppercase tracking-wider text-dark-gray">
        {label}
      </label>
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
      >
        <input
          id="footer-email"
          type="email"
          placeholder={placeholder}
          className="footer-newsletter-input"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="footer-subscribe" aria-label={buttonLabel}>
          <EnvelopeOpen size={18} weight="regular" aria-hidden />
          {buttonLabel}
        </button>
      </form>
      {message ? (
        <p className={status === 'success' ? 'text-b12 text-success' : 'text-b12 text-error'}>{message}</p>
      ) : null}
    </div>
  )
}
