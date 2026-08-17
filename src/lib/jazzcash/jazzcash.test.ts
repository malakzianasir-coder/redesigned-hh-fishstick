import test from 'node:test'
import assert from 'node:assert/strict'

import { generateSecureHash, verifySecureHash, normalizePayload } from './hash'
import {
  generateTxnDateTime,
  generateTxnExpiryDateTime,
  generateTxnRefNo,
  toBillReference,
  toJazzCashAmount,
  fromJazzCashAmount,
} from './txn'
import { buildPaymentParams } from './client'
import { buildIpnAcknowledgement } from './ipn'
import type { JazzCashConfig } from './types'

// Worked example from the HMAC-SHA256 section of jazz-api-guide-consolidated.txt.
const GUIDE_SALT = '3vv9wu3a18'
const GUIDE_HASH = '2C595361C2DA0E502D18BFBAA92CF4740330215E5E8AD0CF4489A64E7400B117'

const guideParams = {
  pp_Amount: '25000',
  pp_MerchantID: 'MC25041',
  pp_MerchantMPIN: '1234',
  pp_Password: 'sz1v4agvyf',
  pp_TxnCurrency: 'PKR',
  pp_TxnRefNo: 'T20220518150213',
}

test('secure hash matches the guide worked example', () => {
  assert.equal(generateSecureHash(guideParams, GUIDE_SALT), GUIDE_HASH)
})

test('secure hash ignores empty values, excludes pp_SecureHash, and sorts keys', () => {
  const scrambled = {
    pp_z: '',
    pp_TxnRefNo: 'T20220518150213',
    pp_SecureHash: 'must-not-be-hashed',
    pp_TxnCurrency: 'PKR',
    pp_Password: 'sz1v4agvyf',
    pp_A: '',
    pp_MerchantMPIN: '1234',
    pp_MerchantID: 'MC25041',
    pp_Amount: '25000',
  }
  assert.equal(generateSecureHash(scrambled, GUIDE_SALT), GUIDE_HASH)
  assert.ok(verifySecureHash({ ...scrambled, pp_SecureHash: GUIDE_HASH }, GUIDE_SALT))
  assert.equal(verifySecureHash({ ...scrambled, pp_SecureHash: 'wrong' }, GUIDE_SALT), false)
})

test('normalizePayload turns null/undefined into empty strings', () => {
  assert.deepEqual(normalizePayload({ a: null, b: undefined, c: 5, d: 'x' }), {
    a: '',
    b: '',
    c: '5',
    d: 'x',
  })
})

test('amounts are multiplied and divided by 100 (guide §3.3)', () => {
  assert.equal(toJazzCashAmount(100), '10000')
  assert.equal(toJazzCashAmount(2500.55), '250055')
  assert.equal(fromJazzCashAmount('10000'), 100)
})

test('bill reference keeps alphanumerics only (guide §3.4)', () => {
  assert.equal(toBillReference('zakat-2026 / general!'), 'zakat2026general')
  assert.equal(toBillReference('---'), '')
})

test('transaction datetimes are Pakistan Standard Time (guide §3.5)', () => {
  assert.equal(generateTxnDateTime(new Date('2026-08-17T00:00:00Z')), '20260817050000')
  assert.equal(generateTxnDateTime(new Date('2026-08-17T18:59:30Z')), '20260817235930')
  assert.equal(generateTxnDateTime(new Date('2026-08-17T19:00:00Z')), '20260818000000')
})

test('expiry is one day after the transaction (guide §3.5)', () => {
  assert.equal(generateTxnExpiryDateTime('20250908151702'), '20250909151702')
  assert.equal(generateTxnExpiryDateTime('20250131235959'), '20250201235959')
})

test('txn ref uses domain prefix + YmdHis (guide §3.4)', () => {
  assert.equal(generateTxnRefNo('20260817050000'), 'hij20260817050000')
})

const testConfig: JazzCashConfig = {
  merchantId: 'MC25041',
  password: 'sz1v4agvyf',
  integritySalt: GUIDE_SALT,
  environment: 'sandbox',
  returnUrl: '',
  ipnUrl: '',
}

test('payment payload matches the v2.0 sample exactly (guide §3.1)', () => {
  const params = buildPaymentParams(
    {
      amount: 100,
      mobileNumber: '03001234567',
      cnicLast6: '123456',
      billReference: 'billRef185',
      description: 'product description',
    },
    testConfig,
    '20250908151702',
  )

  assert.deepEqual(Object.keys(params).sort(), [
    'pp_Amount',
    'pp_BankID',
    'pp_BillReference',
    'pp_CNIC',
    'pp_Description',
    'pp_Language',
    'pp_MerchantID',
    'pp_MobileNumber',
    'pp_Password',
    'pp_ProductID',
    'pp_SecureHash',
    'pp_SubMerchantID',
    'pp_TxnCurrency',
    'pp_TxnDateTime',
    'pp_TxnExpiryDateTime',
    'pp_TxnRefNo',
    'ppmpf_1',
    'ppmpf_2',
    'ppmpf_3',
    'ppmpf_4',
    'ppmpf_5',
  ].sort())

  assert.equal(params.pp_Amount, '10000')
  assert.equal(params.pp_BankID, '')
  assert.equal(params.pp_ProductID, '')
  assert.equal(params.pp_SubMerchantID, '')
  assert.equal(params.ppmpf_1, '')
  assert.equal(params.ppmpf_2, '')
  assert.equal(params.ppmpf_3, '')
  assert.equal(params.ppmpf_4, '')
  assert.equal(params.ppmpf_5, '')
  assert.equal(params.pp_Language, 'EN')
  assert.equal(params.pp_TxnCurrency, 'PKR')
  assert.equal(params.pp_TxnDateTime, '20250908151702')
  assert.equal(params.pp_TxnExpiryDateTime, '20250909151702')
  assert.equal(params.pp_TxnRefNo, 'hij20250908151702')
  assert.ok(verifySecureHash(params, GUIDE_SALT))
})

test('IPN acknowledgement matches the documented body (IPN guide §1.1)', () => {
  const ack = buildIpnAcknowledgement(GUIDE_SALT)
  assert.deepEqual(Object.keys(ack).sort(), [
    'pp_ResponseCode',
    'pp_ResponseMessage',
    'pp_SecureHash',
  ])
  assert.equal(ack.pp_ResponseCode, '000')
  assert.equal(ack.pp_ResponseMessage, 'IPN received successfully')
  assert.ok(verifySecureHash(ack, GUIDE_SALT))
})
