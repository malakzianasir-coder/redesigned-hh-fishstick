'use client'

import { type FormEvent, useMemo, useRef, useState } from 'react'

import { Recaptcha, type RecaptchaRef } from '@/components/forms/Recaptcha'
import type { FormDefinition, FormFieldDefinition } from '@/lib/content/types'
import { cn } from '@/utilities/ui'

type DynamicFormProps = {
  form: FormDefinition
}

export function DynamicForm({ form }: DynamicFormProps) {
  const recaptchaRef = useRef<RecaptchaRef>(null)
  const [values, setValues] = useState<Record<string, string | boolean>>({})
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const fieldOrder = useMemo(() => form.fields, [form.fields])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}

    fieldOrder.forEach((field) => {
      if (!field.required) return
      const value = values[field.name]
      if (field.type === 'checkbox') {
        if (!value) nextErrors[field.name] = 'Required'
        return
      }
      if (!String(value || '').trim()) nextErrors[field.name] = 'Required'
    })

    // Client-side gate only: this form has no submission endpoint yet, so the
    // recaptchaToken is never verified server-side (unlike the JazzCash routes).
    // Wire it into the future form-submission API before treating it as protection.
    if (form.recaptcha?.enabled && !recaptchaToken) {
      nextErrors.recaptcha = 'Please complete the security verification.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
    setValues({})
    setRecaptchaToken('')
    recaptchaRef.current?.reset()
  }

  const setValue = (fieldName: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }))
    setErrors((prev) => {
      if (!prev[fieldName]) return prev
      const clone = { ...prev }
      delete clone[fieldName]
      return clone
    })
  }

  return (
    <form onSubmit={onSubmit} className="card grid grid-cols-1 gap-4 p-6 lg:grid-cols-2 lg:p-8">
      {fieldOrder.map((field) => (
        <div key={field.name} className={cn(field.width === 'half' ? '' : 'lg:col-span-2')}>
          <label className="mb-2 block text-b14 font-semibold text-primary-blue">
            {field.label}
            {field.required ? <span className="ml-1 text-primary-red">*</span> : null}
          </label>
          <FieldInput field={field} value={values[field.name]} onChange={(value) => setValue(field.name, value)} />
          {errors[field.name] ? <p className="mt-1 text-b14 text-error">{errors[field.name]}</p> : null}
        </div>
      ))}
      <div className="lg:col-span-2">
        {form.recaptcha?.enabled ? (
          <div className="mb-4">
            <label className="donation-field-label">Security Verification</label>
            <Recaptcha
              ref={recaptchaRef}
              siteKey={form.recaptcha.siteKey}
              onVerify={(token) => {
                setRecaptchaToken(token)
                setErrors((prev) => {
                  if (!prev.recaptcha) return prev
                  const clone = { ...prev }
                  delete clone.recaptcha
                  return clone
                })
              }}
              onExpire={() => setRecaptchaToken('')}
              onError={() => {
                setRecaptchaToken('')
                setErrors((prev) => ({ ...prev, recaptcha: 'Security verification failed.' }))
              }}
            />
            {errors.recaptcha ? <p className="mt-1 text-b14 text-error">{errors.recaptcha}</p> : null}
          </div>
        ) : null}
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-red px-4 text-b14 font-bold leading-none text-white transition-colors duration-300 ease-in-out hover:bg-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-red/40 focus-visible:ring-offset-2"
        >
          {form.submitLabel}
        </button>
        {submitted ? <p className="mt-3 text-b14 text-success">{form.successMessage}</p> : null}
      </div>
    </form>
  )
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FormFieldDefinition
  value: string | boolean | undefined
  onChange: (value: string | boolean) => void
}) {
  if (field.type === 'textarea') {
    return (
      <textarea
        className="float-textarea"
        placeholder={field.placeholder}
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (field.type === 'select') {
    return (
      <select
        className="brand-select"
        value={typeof value === 'string' ? value : ''}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  if (field.type === 'radio') {
    return (
      <div className="flex flex-wrap gap-2">
        {field.options?.map((option) => (
          <label key={option.value} className="chip inline-flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={value === option.value}
              onChange={(event) => onChange(event.target.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    )
  }

  if (field.type === 'checkbox') {
    return (
      <label className="inline-flex items-center gap-2 text-b14 text-primary-blue/85">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{field.placeholder || 'Confirm'}</span>
      </label>
    )
  }

  return (
    <input
      type={field.type}
      className="donation-field"
      placeholder={field.placeholder}
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
