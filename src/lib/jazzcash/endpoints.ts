// The Status Inquiry API is mandatory per the integration guide (§3.2) but its spec is not part
// of jazz-api-guide-consolidated.txt. Add its endpoint here once JazzCash supplies the document.
export const ENDPOINTS = {
  sandbox: {
    mwallet: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v2/rest/payments/m-wallet',
    statusInquiry: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v1/rest/payments/status-inquiry',
    portal: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/CustomerPortal/transactionmanagement/merchantform',
  },
  production: {
    mwallet: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v2/rest/payments/m-wallet',
    statusInquiry: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/api/v1/rest/payments/status-inquiry',
    portal: 'https://onlinepayments.jazzcash.com.pk/payment-orchestrator/CustomerPortal/transactionmanagement/merchantform',
  },
} as const
