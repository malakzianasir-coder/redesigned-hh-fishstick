import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getJazzCashConfig, normalizePayload, verifySecureHash, generateSecureHash } from '@/lib/jazzcash'

export async function POST(req: Request) {
  try {
    const rawBody = await req.json()
    const normalized = normalizePayload(rawBody)
    const config = getJazzCashConfig()

    // 1. Verify Hash
    const isValid = verifySecureHash(normalized, config.integritySalt)
    if (!isValid) {
      console.error('IPN Hash Verification Failed', normalized)
      return NextResponse.json({ error: 'Invalid Hash' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const txnRefNo = normalized.pp_TxnRefNo

    // 2. Find existing record
    const { docs } = await payload.find({
      collection: 'donations',
      where: { txnRefNo: { equals: txnRefNo } }
    })

    if (docs.length > 0) {
      const doc = docs[0]
      if (!doc) throw new Error('Transaction record missing')
      const responseCode = normalized.pp_ResponseCode || ''
      
      let newStatus = doc.status
      if (responseCode === '121' && doc.status !== 'confirmed') {
        newStatus = 'confirmed'
      } else if (['199', '999'].includes(responseCode) && doc.status !== 'failed') {
        newStatus = 'failed'
      }

      // 3. Update idempotently
      if (doc.status !== newStatus || !doc.ipnReceivedAt) {
        await payload.update({
          collection: 'donations',
          id: doc.id,
          data: {
            status: newStatus as 'pending' | 'confirmed' | 'failed',
            responseCode: responseCode,
            responseMessage: normalized.pp_ResponseMessage,
            authCode: normalized.pp_AuthCode,
            retrievalRefNo: normalized.pp_RetreivalReferenceNo || normalized.pp_RetrievalReferenceNo,
            ipnReceivedAt: new Date().toISOString(),
            ipnPayload: rawBody
          }
        })
      }
    } else {
       console.warn(`IPN received for unknown txnRefNo: ${txnRefNo}`)
    }

    // 4. Construct response hash
    const responseParams = {
      pp_ResponseCode: '000',
      pp_ResponseMessage: 'IPN received successfully',
      pp_SecureHash: ''
    }
    responseParams.pp_SecureHash = generateSecureHash(responseParams, config.integritySalt)

    return NextResponse.json(responseParams)

  } catch (error) {
    console.error('IPN Processing Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
