import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { initiatePayment, toBillReference, clientIp, rateLimit } from '@/lib/jazzcash'
import { verifyRecaptchaToken } from '@/lib/recaptcha'

const MAX_DONOR_NAME = 100
const MAX_CAUSE = 120

function badRequest(message: string) {
  return NextResponse.json({ success: false, message }, { status: 400 })
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  const limit = rateLimit(`initiate:${ip}`, 5, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return badRequest('Invalid request body.')
    }

    const { donorName, mobileNumber, cnicLast6, amount, causeSlug, causeTitle, recaptchaToken } =
      (body ?? {}) as Record<string, unknown>

    const siteSettings = await import('@/lib/content/loaders').then(m => m.getSiteSettings())
    const recaptchaEnabled = siteSettings.forms?.recaptcha?.enabled ?? true

    if (recaptchaEnabled) {
      const recaptchaResult = await verifyRecaptchaToken(
        typeof recaptchaToken === 'string' ? recaptchaToken : undefined,
        ip,
      )
      if (!recaptchaResult.success) {
        return badRequest(recaptchaResult.message || 'Security verification failed.')
      }
    }

    const name = typeof donorName === 'string' ? donorName.trim().slice(0, MAX_DONOR_NAME) : ''
    if (!name) {
      return badRequest('Donor name is required.')
    }
    if (typeof amount !== 'number' || !Number.isFinite(amount) || amount < 50 || amount > 10_000_000) {
      return badRequest('Amount must be a number between PKR 50 and PKR 10,000,000.')
    }
    const mobile = typeof mobileNumber === 'string' ? mobileNumber.trim() : ''
    if (!/^03\d{9}$/.test(mobile)) {
      return badRequest('A valid JazzCash mobile number (03XXXXXXXXX) is required.')
    }
    const cnic = typeof cnicLast6 === 'string' ? cnicLast6.trim() : ''
    if (!/^\d{6}$/.test(cnic)) {
      return badRequest('CNIC last 6 digits are required.')
    }

    const slug = typeof causeSlug === 'string' ? causeSlug.trim().slice(0, 60) : ''
    const title = typeof causeTitle === 'string' ? causeTitle.trim().slice(0, MAX_CAUSE) : ''
    const billReference = toBillReference(slug || 'general')

    const jcResponse = await initiatePayment({
      amount,
      mobileNumber: mobile,
      cnicLast6: cnic,
      billReference,
      description: `Donation: ${title || 'General'}`.slice(0, 200),
    })

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'donations',
      data: {
        txnRefNo: jcResponse.txnRefNo,
        donorName: name,
        donorMobile: mobile,
        causeSlug: slug,
        causeTitle: title,
        amountPKR: amount,
        billReference,
        status: jcResponse.success ? 'confirmed' : jcResponse.responseCode ? 'failed' : 'pending',
        responseCode: jcResponse.responseCode,
        responseMessage: jcResponse.responseMessage,
        authCode: jcResponse.authCode,
        retrievalRefNo: jcResponse.retrievalRefNo,
      },
    })

    return NextResponse.json({
      success: jcResponse.success,
      txnRefNo: jcResponse.txnRefNo,
      responseCode: jcResponse.responseCode,
      responseMessage: jcResponse.responseMessage,
      redirectUrl: jcResponse.success ? `/thank-you?txn=${jcResponse.txnRefNo}` : null,
    })
  } catch (error: unknown) {
    console.error('JazzCash Initiate Error:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to process the donation right now. Please try again.' },
      { status: 500 },
    )
  }
}
