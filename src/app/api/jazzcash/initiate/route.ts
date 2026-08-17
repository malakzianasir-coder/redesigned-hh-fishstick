import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { initiatePayment, toBillReference } from '@/lib/jazzcash'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { donorName, mobileNumber, cnicLast6, amount, causeSlug, causeTitle } = body

    // 1. Validation
    if (!amount || amount < 50 || amount > 10000000) {
      return NextResponse.json({ success: false, message: 'Invalid amount.' }, { status: 400 })
    }
    if (!/^03\d{9}$/.test(mobileNumber)) {
      return NextResponse.json({ success: false, message: 'Invalid mobile number.' }, { status: 400 })
    }
    if (!/^\d{6}$/.test(cnicLast6)) {
      return NextResponse.json({ success: false, message: 'Invalid CNIC.' }, { status: 400 })
    }

    const billReference = toBillReference(causeSlug || 'general')
    const sanitizedDonorName = donorName.substring(0, 100)

    // 2. Call JazzCash Client
    const jcResponse = await initiatePayment({
      amount,
      mobileNumber,
      cnicLast6,
      billReference,
      description: `Donation: ${causeTitle || 'General'}`,
    })

    // 3. Save to Payload CMS
    const payload = await getPayload({ config: configPromise })
    
    await payload.create({
      collection: 'donations',
      data: {
        txnRefNo: jcResponse.txnRefNo,
        donorName: sanitizedDonorName,
        donorMobile: mobileNumber,
        causeSlug,
        causeTitle,
        amountPKR: amount,
        billReference,
        status: jcResponse.success ? 'confirmed' : (jcResponse.responseCode ? 'failed' : 'pending'),
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
      redirectUrl: jcResponse.success ? `/thank-you?txn=${jcResponse.txnRefNo}` : null
    })

  } catch (error: unknown) {
    console.error('JazzCash Initiate Error:', error)
    const msg = error instanceof Error ? error.message : 'Internal error'
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
