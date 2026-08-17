import { getJazzCashConfig, validateConfig } from './config'
import { ENDPOINTS } from './endpoints'
import { generateSecureHash, normalizePayload, verifySecureHash } from './hash'
import { generateTxnDateTime, generateTxnExpiryDateTime, generateTxnRefNo, toBillReference, toJazzCashAmount } from './txn'
import type { MWalletPaymentRequest, MWalletPaymentResponse } from './types'

export async function initiatePayment(req: MWalletPaymentRequest): Promise<MWalletPaymentResponse> {
  const config = getJazzCashConfig()
  validateConfig(config)

  const txnDateTime = generateTxnDateTime()
  const txnRefNo = generateTxnRefNo()

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
    pp_TxnRefNo: txnRefNo,
    ppmpf_1: '',
    ppmpf_2: '',
    ppmpf_3: '',
    ppmpf_4: '',
    ppmpf_5: '',
  }

  params.pp_SecureHash = generateSecureHash(params, config.integritySalt)

  const endpoint = ENDPOINTS[config.environment].mwallet
  const headers = { 'Content-Type': 'application/json' }
  
  console.log('\n================ JAZZCASH API REQUEST ================')
  console.log('Timestamp:', new Date().toISOString())
  console.log('Method:    POST')
  console.log('Endpoint: ', endpoint)
  console.log('Headers:  ', JSON.stringify(headers, null, 2))
  console.log('Payload:  ', JSON.stringify(params, null, 2))
  console.log('======================================================\n')

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  })

  const rawResponse = await response.json()
  
  console.log('\n================ JAZZCASH API RESPONSE ===============')
  console.log('Timestamp:', new Date().toISOString())
  console.log('Status:   ', response.status, response.statusText)
  console.log('Headers:  ', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2))
  console.log('Payload:  ', JSON.stringify(rawResponse, null, 2))
  console.log('======================================================\n')
  const normalizedResponse = normalizePayload(rawResponse)
  
  const isValidHash = verifySecureHash(normalizedResponse, config.integritySalt)
  
  if (!isValidHash && normalizedResponse.pp_ResponseCode === '000') {
    throw new Error('Invalid secure hash from JazzCash')
  }

  return {
    success: normalizedResponse.pp_ResponseCode === '000' && isValidHash,
    responseCode: normalizedResponse.pp_ResponseCode || '',
    responseMessage: normalizedResponse.pp_ResponseMessage || 'Unknown error',
    txnRefNo: normalizedResponse.pp_TxnRefNo || txnRefNo,
    authCode: normalizedResponse.pp_AuthCode,
    retrievalRefNo: normalizedResponse.pp_RetreivalReferenceNo,
    rawResponse: normalizedResponse,
  }
}
