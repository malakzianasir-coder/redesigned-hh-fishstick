'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

declare global {
  interface Window {
    grecaptcha?: {
      ready?: (callback: () => void) => void
      render?: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark'
          size?: 'normal' | 'compact'
        },
      ) => number
      reset?: (widgetId?: number) => void
      getResponse?: (widgetId?: number) => string
    }
    __recaptchaLoaded?: () => void
  }
}

export type RecaptchaRef = {
  reset: () => void
  getResponse: () => string
}

export type RecaptchaProps = {
  siteKey?: string
  onVerify: (token: string) => void
  onExpire?: () => void
  onError?: () => void
  theme?: 'light' | 'dark'
  className?: string
}

const SCRIPT_ID = 'google-recaptcha-script'

export const Recaptcha = forwardRef<RecaptchaRef, RecaptchaProps>(function Recaptcha(
  { siteKey, onVerify, onExpire, onError, theme = 'light', className = '' },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<number | null>(null)
  const id = useId()
  const activeSiteKey = siteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isSimulatedChecked, setIsSimulatedChecked] = useState(false)

  // Reset imperative handle
  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        if (widgetIdRef.current !== null && window.grecaptcha && window.grecaptcha.reset) {
          window.grecaptcha.reset(widgetIdRef.current)
        }
        setIsSimulatedChecked(false)
      },
      getResponse: () => {
        if (widgetIdRef.current !== null && window.grecaptcha && window.grecaptcha.getResponse) {
          return window.grecaptcha.getResponse(widgetIdRef.current)
        }
        return isSimulatedChecked ? 'mock-recaptcha-token' : ''
      },
    }),
    [isSimulatedChecked],
  )

  // Stable callbacks
  const handleVerify = useCallback(
    (token: string) => {
      onVerify(token)
    },
    [onVerify],
  )

  const handleExpire = useCallback(() => {
    onExpire?.()
  }, [onExpire])

  const handleError = useCallback(() => {
    onError?.()
  }, [onError])

  // Load Google reCAPTCHA script when site key is present
  useEffect(() => {
    if (!activeSiteKey) return

    if (window.grecaptcha && window.grecaptcha.render) {
      setIsScriptLoaded(true)
      return
    }

    const existingScript = document.getElementById(SCRIPT_ID)
    if (existingScript) {
      const checkInterval = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render) {
          setIsScriptLoaded(true)
          clearInterval(checkInterval)
        }
      }, 100)
      return () => clearInterval(checkInterval)
    }

    window.__recaptchaLoaded = () => {
      setIsScriptLoaded(true)
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://www.google.com/recaptcha/api.js?onload=__recaptchaLoaded&render=explicit'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Don't remove script to avoid re-fetching on unmount/remount
    }
  }, [activeSiteKey])

  // Render Google reCAPTCHA widget into container
  useEffect(() => {
    if (!activeSiteKey || !isScriptLoaded || !containerRef.current) return
    if (widgetIdRef.current !== null) return

    try {
      if (window.grecaptcha && window.grecaptcha.render) {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: activeSiteKey,
          callback: handleVerify,
          'expired-callback': handleExpire,
          'error-callback': handleError,
          theme,
        })
      }
    } catch (err) {
      console.error('[reCAPTCHA] Failed to render widget:', err)
      onError?.()
    }
  }, [activeSiteKey, isScriptLoaded, handleVerify, handleExpire, handleError, theme, onError])

  // If no siteKey is configured, render a simulated fallback for dev/demo mode
  if (!activeSiteKey) {
    return (
      <div className={`recaptcha-container my-2 ${className}`}>
        <div className="flex w-full max-w-[304px] items-center justify-between rounded-xl border border-dark-gray/25 bg-white p-3.5 shadow-sm transition-all hover:border-dark-gray/40">
          <label
            htmlFor={`sim-recaptcha-${id}`}
            className="flex cursor-pointer select-none items-center gap-3"
          >
            <input
              id={`sim-recaptcha-${id}`}
              type="checkbox"
              checked={isSimulatedChecked}
              onChange={(e) => {
                const checked = e.target.checked
                setIsSimulatedChecked(checked)
                if (checked) {
                  onVerify('mock-recaptcha-token')
                } else {
                  onExpire?.()
                }
              }}
              className="h-6 w-6 cursor-pointer rounded border-dark-gray/30 text-primary-red accent-primary-red focus:ring-primary-red/20"
            />
            <span className="text-b14 font-medium text-primary-blue">
              I&apos;m not a robot
            </span>
          </label>

          <div className="flex flex-col items-center pl-2">
            <svg
              className="h-7 w-7 text-primary-blue/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-dark-gray">
              reCAPTCHA
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`recaptcha-container my-2 ${className}`}>
      <div ref={containerRef} className="min-h-[78px]" />
    </div>
  )
})

export default Recaptcha
