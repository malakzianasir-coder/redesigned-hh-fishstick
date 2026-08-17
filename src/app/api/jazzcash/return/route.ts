import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getJazzCashConfig, normalizePayload, verifySecureHash } from '@/lib/jazzcash'

export async function POST(req: Request) {
  try {
    // JazzCash posts data as application/x-www-form-urlencoded
    const formData = await req.formData()
    const rawBody: Record<string, string> = {}
    formData.forEach((value, key) => {
      rawBody[key] = value.toString()
    })

    const normalized = normalizePayload(rawBody)
    const config = getJazzCashConfig()

    // 1. Verify Hash
    const isValid = verifySecureHash(normalized, config.integritySalt)
    if (!isValid) {
      console.error('Return URL Hash Verification Failed', normalized)
      return NextResponse.redirect(new URL('/donate/failed?reason=hash', req.url))
    }

    const payload = await getPayload({ config: configPromise })
    const txnRefNo = normalized.pp_TxnRefNo
    const responseCode = normalized.pp_ResponseCode || ''

    // 2. Find and update existing record idempotently
    const { docs } = await payload.find({
      collection: 'donations',
      where: { txnRefNo: { equals: txnRefNo } }
    })

    if (docs.length > 0) {
      const doc = docs[0]
      if (!doc) throw new Error('Transaction record missing')
      
      let newStatus = doc.status
      
      if (responseCode === '000' && doc.status !== 'confirmed') {
        newStatus = 'confirmed'
      } else if (doc.status !== 'confirmed') {
        newStatus = 'failed'
      }

      await payload.update({
        collection: 'donations',
        id: doc.id,
        data: {
          status: newStatus as 'pending' | 'confirmed' | 'failed',
          responseCode,
          responseMessage: normalized.pp_ResponseMessage,
          authCode: normalized.pp_AuthCode,
          retrievalRefNo: normalized.pp_RetreivalReferenceNo,
        }
      })
    }

    // 3. Redirect to appropriate frontend page
    if (responseCode === '000') {
      return NextResponse.redirect(new URL(`/thank-you?txn=${txnRefNo}`, req.url))
    } else {
      return NextResponse.redirect(new URL(`/donate/failed`, req.url))
    }

  } catch (error) {
    console.error('Return URL Processing Error:', error)
    return NextResponse.redirect(new URL('/donate/failed?reason=error', req.url))
  }
}
