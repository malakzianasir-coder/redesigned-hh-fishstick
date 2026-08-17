import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getJazzCashConfig, normalizePayload, verifySecureHash, redactJazzCashParams } from '@/lib/jazzcash'

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

    console.log('\n================ JAZZCASH RETURN URL RECEIVED ================')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Payload:  ', JSON.stringify(redactJazzCashParams(normalized), null, 2))
    console.log('==============================================================\n')

    // 1. Verify Hash
    console.log('[JazzCash Return URL] Step 1: Verifying secure hash...')
    const isValid = verifySecureHash(normalized, config.integritySalt)
    if (!isValid) {
      console.error('[JazzCash Return URL] Step 1 Failed: Hash Verification Failed!', redactJazzCashParams(normalized))
      return NextResponse.redirect(new URL('/donate/failed?reason=hash', req.url))
    }
    console.log('[JazzCash Return URL] Step 1 Complete: Hash is valid.')

    const payload = await getPayload({ config: configPromise })
    const txnRefNo = normalized.pp_TxnRefNo
    const responseCode = normalized.pp_ResponseCode || ''

    // 2. Find and update existing record idempotently
    console.log(`[JazzCash Return URL] Step 2: Looking up transaction ${txnRefNo} in CMS...`)
    const { docs } = await payload.find({
      collection: 'donations',
      where: { txnRefNo: { equals: txnRefNo } }
    })

    if (docs.length > 0) {
      const doc = docs[0]
      if (!doc) throw new Error('Transaction record missing')
      
      console.log(`[JazzCash Return URL] Found record. Current status: ${doc.status}`)
      let newStatus = doc.status
      
      if (responseCode === '000' && doc.status !== 'confirmed') {
        newStatus = 'confirmed'
      } else if (doc.status !== 'confirmed') {
        newStatus = 'failed'
      }

      console.log(`[JazzCash Return URL] Updating record status to: ${newStatus}`)
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
      console.log(`[JazzCash Return URL] Step 2 Complete: Record updated successfully.`)
    } else {
      console.warn(`[JazzCash Return URL] Warning: Transaction ${txnRefNo} not found in database!`)
    }

    // 3. Redirect to appropriate frontend page
    console.log(`[JazzCash Return URL] Step 3: Redirecting user to frontend...`)
    if (responseCode === '000') {
      console.log(`[JazzCash Return URL] Success: Redirecting to /thank-you?txn=${txnRefNo}`)
      return NextResponse.redirect(new URL(`/thank-you?txn=${txnRefNo}`, req.url))
    } else {
      console.log(`[JazzCash Return URL] Failure: Redirecting to /donate/failed`)
      return NextResponse.redirect(new URL(`/donate/failed`, req.url))
    }

  } catch (error) {
    console.error('[JazzCash Return URL] Fatal Error:', error)
    return NextResponse.redirect(new URL('/donate/failed?reason=error', req.url))
  }
}
