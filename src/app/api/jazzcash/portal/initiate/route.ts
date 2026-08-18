import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { generatePortalParams, toBillReference, getJazzCashConfig, redactJazzCashParams, clientIp, rateLimit } from '@/lib/jazzcash'
import { ENDPOINTS } from '@/lib/jazzcash'
import { verifyRecaptchaToken } from '@/lib/recaptcha'

function buildAutoSubmitHtml(endpoint: string, params: Record<string, string>): string {
  const hiddenFields = Object.entries(params)
    .map(([key, value]) => {
      const safeValue = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      return `<input type="hidden" name="${key}" value="${safeValue}" />`
    })
    .join('\n      ')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Redirecting to JazzCash...</title></head>
<body>
  <p style="text-align:center;margin-top:80px;font-family:sans-serif;color:#555;">
    Redirecting you to JazzCash secure checkout&hellip;
  </p>
  <form id="jcForm" method="POST" action="${endpoint}">
      ${hiddenFields}
  </form>
  <script>document.getElementById('jcForm').submit();</script>
</body>
</html>`
}

export async function POST(req: Request) {
  const ip = clientIp(req)
  const limit = rateLimit(`portal_initiate:${ip}`, 5, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  try {
    const body = await req.json()
    const { donorName, amount, causeSlug, causeTitle, recaptchaToken } = body

    // 1. Validation — cheap field checks run before reCAPTCHA verification because
    // each siteverify call consumes the user's single-use token.
    console.log('[JazzCash Portal Initiate] Step 1: Validating payload...')
    if (!donorName || typeof donorName !== 'string') {
      console.warn('[JazzCash Portal Initiate] Step 1 Failed: Missing donorName')
      return NextResponse.json({ success: false, message: 'Donor name is required.' }, { status: 400 })
    }
    if (!amount || amount < 50 || amount > 10000000) {
      console.warn('[JazzCash Portal Initiate] Step 1 Failed: Invalid amount', amount)
      return NextResponse.json({ success: false, message: 'Invalid amount.' }, { status: 400 })
    }

    // 2. Security verification
    const siteSettings = await import('@/lib/content/loaders').then(m => m.getSiteSettings())
    const recaptchaEnabled = siteSettings.forms?.recaptcha?.enabled ?? true

    if (recaptchaEnabled) {
      const recaptchaResult = await verifyRecaptchaToken(
        typeof recaptchaToken === 'string' ? recaptchaToken : undefined,
        ip,
      )
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { success: false, message: recaptchaResult.message || 'Security verification failed.' },
          { status: 400 },
        )
      }
    }

    const billReference = toBillReference(causeSlug || 'general')
    const sanitizedDonorName = donorName.substring(0, 100)

    // 3. Generate Portal Params
    console.log('[JazzCash Portal Initiate] Step 3: Generating Hash and Portal Params...')
    const { txnRefNo, params } = generatePortalParams({
      amount,
      billReference,
      description: `Donation: ${causeTitle || 'General'}`,
    })

    const config = getJazzCashConfig()
    const endpoint = ENDPOINTS[config.environment].portal

    console.log('\n================ JAZZCASH PORTAL CHECKOUT INITIATED ================')
    console.log('Timestamp:', new Date().toISOString())
    console.log('TxnRefNo: ', txnRefNo)
    console.log('Action:   ', endpoint)
    console.log('Payload:  ', JSON.stringify(redactJazzCashParams(params), null, 2))
    console.log('====================================================================\n')

    // 4. Save pending transaction to Payload CMS
    console.log(`[JazzCash Portal Initiate] Step 4: Saving pending transaction ${txnRefNo} to Payload CMS...`)
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'donations',
      data: {
        txnRefNo,
        donorName: sanitizedDonorName,
        donorMobile: 'HostedCheckout',
        causeSlug,
        causeTitle,
        amountPKR: amount,
        billReference,
        status: 'pending',
      },
    })
    console.log(`[JazzCash Portal Initiate] Step 4 Complete: Transaction saved successfully.`)

    // 5. Return auto-submitting HTML — pp_Password never leaves the server as JSON
    console.log(`[JazzCash Portal Initiate] Step 5: Returning auto-submit HTML to browser.`)
    const html = buildAutoSubmitHtml(endpoint, params)

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })

  } catch (error: unknown) {
    console.error('[JazzCash Portal Initiate] Fatal Error:', error)
    const msg = error instanceof Error ? error.message : 'Internal error'
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
