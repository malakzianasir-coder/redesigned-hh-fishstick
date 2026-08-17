import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { generatePortalParams, toBillReference, getJazzCashConfig } from '@/lib/jazzcash'
import { ENDPOINTS } from '@/lib/jazzcash'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { donorName, amount, causeSlug, causeTitle } = body

    // 1. Validation
    if (!amount || amount < 50 || amount > 10000000) {
      return NextResponse.json({ success: false, message: 'Invalid amount.' }, { status: 400 })
    }

    const billReference = toBillReference(causeSlug || 'general')
    const sanitizedDonorName = donorName.substring(0, 100)

    // 2. Generate Portal Params (No HTTP request is made here)
    const { txnRefNo, params } = generatePortalParams({
      amount,
      billReference,
      description: `Donation: ${causeTitle || 'General'}`,
    })

    // 3. Save pending transaction to Payload CMS
    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'donations',
      data: {
        txnRefNo,
        donorName: sanitizedDonorName,
        donorMobile: 'HostedCheckout', // Mobile not collected upfront
        causeSlug,
        causeTitle,
        amountPKR: amount,
        billReference,
        status: 'pending',
      },
    })

    // 4. Return params to frontend to build the form
    const config = getJazzCashConfig()
    return NextResponse.json({
      success: true,
      endpoint: ENDPOINTS[config.environment].portal,
      params,
    })

  } catch (error: unknown) {
    console.error('JazzCash Portal Initiate Error:', error)
    const msg = error instanceof Error ? error.message : 'Internal error'
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
