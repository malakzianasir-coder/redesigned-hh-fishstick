import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import {
  getJazzCashConfig,
  normalizePayload,
  verifySecureHash,
  buildIpnAcknowledgement,
  redactJazzCashParams,
} from '@/lib/jazzcash'

const IPN_SECRET_KEYS = new Set(['pp_Password', 'pp_SecureHash'])

function stripSecrets(raw: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(raw).filter(([key]) => !IPN_SECRET_KEYS.has(key)),
  )
}

export async function POST(req: Request) {
  try {
    const rawBody: unknown = await req.json()
    const normalized = normalizePayload((rawBody ?? {}) as Record<string, unknown>)
    const config = getJazzCashConfig()

    const isValid = verifySecureHash(normalized, config.integritySalt)
    if (!isValid) {
      console.error(
        'IPN Hash Verification Failed',
        JSON.stringify(redactJazzCashParams(normalized)),
      )
      return NextResponse.json({ error: 'Invalid Hash' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const txnRefNo = normalized.pp_TxnRefNo

    const { docs } = await payload.find({
      collection: 'donations',
      where: { txnRefNo: { equals: txnRefNo } },
    })

    if (docs.length > 0) {
      const doc = docs[0]
      if (!doc) throw new Error('Transaction record missing')
      const responseCode = normalized.pp_ResponseCode || ''

      // IPN guide: 121 = successful; 199, 999 and all other codes = failed.
      let newStatus = doc.status
      if (responseCode === '121') {
        if (doc.status !== 'confirmed') newStatus = 'confirmed'
      } else if (responseCode !== '') {
        if (doc.status !== 'failed') newStatus = 'failed'
      }

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
            ipnPayload: stripSecrets(rawBody as Record<string, unknown>),
          },
        })
      }
    } else {
      console.warn(`IPN received for unknown txnRefNo: ${txnRefNo}`)
    }

    return NextResponse.json(buildIpnAcknowledgement(config.integritySalt))
  } catch (error) {
    console.error('JazzCash IPN Processing Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
