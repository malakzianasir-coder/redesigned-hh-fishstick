import { getJazzCashConfig, validateConfig } from './config'
import { ENDPOINTS } from './endpoints'
import { generateSecureHash, normalizePayload, verifySecureHash } from './hash'
import {
  generateTxnDateTime,
  generateTxnExpiryDateTime,
  generateTxnRefNo,
  toBillReference,
  toJazzCashAmount,
  fromJazzCashAmount,
} from './txn'
import type { JazzCashConfig, MWalletPaymentRequest, MWalletPaymentResponse } from './types'

const REDACTED_KEYS = new Set(['pp_Password', 'pp_SecureHash', 'pp_MerchantMPIN'])

export function redactJazzCashParams(params: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [key, value] of Object.entries(params)) {
    out[key] = REDACTED_KEYS.has(key) && value !== '' ? '***' : value
  }
  return out
}

// Exact payload required by the MWallet REST API v2.0 sample: all string values,
// empty strings (never null) for the documented empty fields, nothing added or removed.
export function buildPaymentParams(
  req: MWalletPaymentRequest,
  config: JazzCashConfig,
  txnDateTime: string,
): Record<string, string> {
  const params: Record<string, string> = {
    pp_Amount: toJazzCashAmount(req.amount),
    pp_BankID: '',
    pp_BillReference: toBillReference(req.billReference),
    pp_CNIC: req.cnicLast6,
    pp_Description: req.description,
    pp_Language: 'EN',
    pp_MerchantID: config.merchantId,
    pp_MobileNumber: req.mobileNumber,
    pp_Password: config.password,
    pp_ProductID: '',
    pp_SecureHash: '',
    pp_SubMerchantID: '',
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: txnDateTime,
    pp_TxnExpiryDateTime: generateTxnExpiryDateTime(txnDateTime),
    pp_TxnRefNo: generateTxnRefNo(txnDateTime),
    ppmpf_1: '',
    ppmpf_2: '',
    ppmpf_3: '',
    ppmpf_4: '',
    ppmpf_5: '',
  }

  params.pp_SecureHash = generateSecureHash(params, config.integritySalt)
  return params
}

export async function initiatePayment(
  req: MWalletPaymentRequest,
): Promise<MWalletPaymentResponse> {
  const config = getJazzCashConfig()
  validateConfig(config)

  const txnDateTime = generateTxnDateTime()
  const params = buildPaymentParams(req, config, txnDateTime)
  const txnRefNo = params.pp_TxnRefNo || ''

  const endpoint = ENDPOINTS[config.environment].mwallet
  const verbose = config.environment === 'sandbox'

  if (verbose) {
    console.log(
      '[jazzcash] mwallet request:',
      JSON.stringify(redactJazzCashParams(params), null, 2),
    )
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })

  const rawResponse: unknown = await response.json()
  const normalizedResponse = normalizePayload(rawResponse as Record<string, unknown>)

  const isValidHash = verifySecureHash(normalizedResponse, config.integritySalt)

  if (!isValidHash && normalizedResponse.pp_ResponseCode === '000') {
    throw new Error('Invalid secure hash from JazzCash')
  }

  console.log(
    `[jazzcash] mwallet txnRefNo=${txnRefNo} http=${response.status} code=${normalizedResponse.pp_ResponseCode} hashValid=${isValidHash}`,
  )
  if (verbose) {
    console.log(
      '[jazzcash] mwallet response:',
      JSON.stringify(redactJazzCashParams(normalizedResponse), null, 2),
    )
  }

  return {
    success: normalizedResponse.pp_ResponseCode === '000' && isValidHash,
    responseCode: normalizedResponse.pp_ResponseCode || '',
    responseMessage: normalizedResponse.pp_ResponseMessage || 'Unknown error',
    txnRefNo: normalizedResponse.pp_TxnRefNo || txnRefNo,
    authCode: normalizedResponse.pp_AuthCode,
    retrievalRefNo: normalizedResponse.pp_RetreivalReferenceNo,
    amountPKR: normalizedResponse.pp_Amount
      ? fromJazzCashAmount(normalizedResponse.pp_Amount)
      : undefined,
    rawResponse: normalizedResponse,
  }
}
