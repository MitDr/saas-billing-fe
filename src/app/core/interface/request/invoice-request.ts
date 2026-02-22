export interface InvoiceRequest {
  "amount": number,
  "currency": "USD" | 'VND',
  "status": "PAID" | 'DRAFT' | 'UNPAID' | 'VOID',
  "paidDate"?: string,
  "billingPeriodStart": string,
  "billingPeriodEnd": string,
  "amountUsd": number,
  "exchangeRate": number,
  "subscriberId": number,
  "tenantId": number,
  "subscriptionId": number,
  "metadata"?: any,
}
