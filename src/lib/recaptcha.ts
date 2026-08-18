/**
 * Server-side Google reCAPTCHA verification utility.
 */

export type RecaptchaVerifyResult = {
  success: boolean
  message?: string
  score?: number
  action?: string
  challengeTs?: string
  hostname?: string
  errorCodes?: string[]
}

const SITEVERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

/**
 * Verifies a Google reCAPTCHA response token against Google's verification API.
 *
 * If RECAPTCHA_SECRET_KEY is not configured in the environment,
 * verification passes in development to avoid blocking local workflows.
 */
export async function verifyRecaptchaToken(
  token?: string | null,
  remoteIp?: string,
): Promise<RecaptchaVerifyResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[reCAPTCHA] RECAPTCHA_SECRET_KEY is not configured. Bypassing verification in development.',
      )
      return { success: true }
    }
    console.error('[reCAPTCHA] RECAPTCHA_SECRET_KEY is missing in production environment.')
    return {
      success: false,
      message: 'reCAPTCHA configuration error on server. Please contact support.',
    }
  }

  if (!token || typeof token !== 'string' || !token.trim()) {
    return {
      success: false,
      message: 'Please complete the reCAPTCHA verification to proceed.',
    }
  }

  // Handle local dev / test mock tokens
  if (token === 'mock-recaptcha-token' && process.env.NODE_ENV !== 'production') {
    return { success: true }
  }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secretKey)
    formData.append('response', token.trim())
    if (remoteIp) {
      formData.append('remoteip', remoteIp)
    }

    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      cache: 'no-store',
      // Bound the verification call so a hung request cannot stall the donation flow.
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      console.error(`[reCAPTCHA] Verification API returned HTTP status ${response.status}`)
      return {
        success: false,
        message: 'Could not contact reCAPTCHA verification service. Please try again.',
      }
    }

    const data = (await response.json()) as {
      success: boolean
      score?: number
      action?: string
      challenge_ts?: string
      hostname?: string
      'error-codes'?: string[]
    }

    if (!data.success) {
      console.warn('[reCAPTCHA] Verification failed:', data['error-codes'])
      return {
        success: false,
        message: 'reCAPTCHA verification failed. Please try again.',
        errorCodes: data['error-codes'],
      }
    }

    return {
      success: true,
      score: data.score,
      action: data.action,
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
    }
  } catch (error) {
    console.error('[reCAPTCHA] Network or unexpected error during verification:', error)
    return {
      success: false,
      message: 'An error occurred during security verification. Please try again.',
    }
  }
}
