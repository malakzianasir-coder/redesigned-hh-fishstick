import { getJazzCashConfig, validateConfig } from './config'
import { generateSecureHash } from './hash'
import { generateTxnDateTime, generateTxnExpiryDateTime, generateTxnRefNo, toBillReference, toJazzCashAmount } from './txn'
import type { HostedPaymentRequest } from './types'

export function generatePortalParams(req: HostedPaymentRequest) {
  const config = getJazzCashConfig()
  validateConfig(config)

  const txnDateTime = generateTxnDateTime()
  const txnRefNo = generateTxnRefNo()

  const params: Record<string, string> = {
    pp_Version: '2.0',
    pp_TxnType: '', // Optional: Leave empty to show all methods
    pp_MerchantID: config.merchantId,
    pp_Password: config.password,
    pp_Language: 'EN',
    pp_SubMerchantID: '',
    pp_BankID: '',
    pp_ProductID: '',
    pp_TxnRefNo: txnRefNo,
    pp_Amount: toJazzCashAmount(req.amount),
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: txnDateTime,
    pp_TxnExpiryDateTime: generateTxnExpiryDateTime(txnDateTime),
    pp_BillReference: toBillReference(req.billReference),
    pp_Description: req.description,
    pp_ReturnURL: config.returnUrl,
    pp_SecureHash: '',
    ppmpf_1: '',
    ppmpf_2: '',
    ppmpf_3: '',
    ppmpf_4: '',
    ppmpf_5: '',
  }

  params.pp_SecureHash = generateSecureHash(params, config.integritySalt)

  return {
    txnRefNo,
    params,
  }
}
