export type JazzCashEnvironment = 'sandbox' | 'production'

export type JazzCashConfig = {
  merchantId: string
  password: string
  integritySalt: string
  environment: JazzCashEnvironment
  returnUrl: string
  ipnUrl: string
}

export type MWalletPaymentRequest = {
  amount: number // In PKR
  mobileNumber: string
  cnicLast6: string
  billReference: string
  description: string
}

export type MWalletPaymentResponse = {
  success: boolean
  responseCode: string
  responseMessage: string
  txnRefNo: string
  authCode?: string
  retrievalRefNo?: string
  rawResponse: Record<string, string>
}
