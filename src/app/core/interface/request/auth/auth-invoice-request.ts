export interface AuthInvoiceRequest{
  "amount": number,
  "currency": "USD" | 'VND',
  "status": "PAID" | 'DRAFT' | 'UNPAID' | 'VOID',
  "paidDate"?: string,
  "billingPeriodStart": string,
  "billingPeriodEnd": string,
  "amountUsd": number,
  "exchangeRate": number,
  "subscriberId": number,
  "subscriptionId": number,
  "metadata"?: any,
}
