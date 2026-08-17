import { generateSecureHash } from './hash'

// Exact acknowledgement body required by the IPN guide (§1.1).
export function buildIpnAcknowledgement(integritySalt: string): Record<string, string> {
  const ack: Record<string, string> = {
    pp_ResponseCode: '000',
    pp_ResponseMessage: 'IPN received successfully',
    pp_SecureHash: '',
  }
  ack.pp_SecureHash = generateSecureHash(ack, integritySalt)
  return ack
}
