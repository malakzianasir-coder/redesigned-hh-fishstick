import { JazzCashConfig, JazzCashEnvironment } from './types'

export function getJazzCashConfig(): JazzCashConfig {
  const env = process.env.JAZZCASH_ENVIRONMENT as JazzCashEnvironment || 'sandbox'
  
  return {
    merchantId: process.env.JAZZCASH_MERCHANT_ID || '',
    password: process.env.JAZZCASH_PASSWORD || '',
    integritySalt: process.env.JAZZCASH_INTEGRITY_SALT || '',
    environment: env,
    returnUrl: process.env.JAZZCASH_RETURN_URL || '',
    ipnUrl: process.env.JAZZCASH_IPN_URL || '',
  }
}

export function validateConfig(config: JazzCashConfig) {
  if (!config.merchantId || !config.password || !config.integritySalt) {
    throw new Error('JazzCash configuration is missing required credentials.')
  }
}
