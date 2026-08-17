import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { clientIp, rateLimit } from '@/lib/jazzcash'

// Internal lookup against our own records — not the JazzCash Status Inquiry API,
// whose spec is still pending from JazzCash.
export async function GET(req: Request) {
  const limit = rateLimit(`status:${clientIp(req)}`, 10, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    )
  }

  try {
    const { searchParams } = new URL(req.url)
    const txnRefNo = searchParams.get('txnRefNo')

    if (!txnRefNo) {
      return NextResponse.json({ success: false, message: 'txnRefNo is required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const { docs } = await payload.find({
      collection: 'donations',
      where: { txnRefNo: { equals: txnRefNo } },
    })

    if (docs.length === 0) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 })
    }

    const doc = docs[0]
    if (!doc) {
      return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      txnRefNo: doc.txnRefNo,
      status: doc.status,
      responseCode: doc.responseCode,
    })
  } catch (error: unknown) {
    console.error('JazzCash Status Inquiry Error:', error)
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 })
  }
}
