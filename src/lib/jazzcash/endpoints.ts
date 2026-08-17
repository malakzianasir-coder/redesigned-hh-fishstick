export const ENDPOINTS = {
  sandbox: {
    mwallet: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v2/rest/payments/m-wallet',
    statusInquiry: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v1/rest/payments/status-inquiry',
  },
  production: {
    mwallet: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v2/rest/payments/m-wallet',
    statusInquiry: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v1/rest/payments/status-inquiry',
  },
} as const
