export interface PaymentRequest {
  "amount": number,
  "currency": "VND" | 'USD',
  "status": "PENDING" | 'AVAILABLE' | 'REFUNDED',
  "paymentIntentId"?: string,
  "chargeId"?: string,
  "balanceTransactionId"?: string,
  "paymentMethod"?: string,
  "availableOn"?: string,
  "invoiceId"?: number,
  "tenantId": number,
  "metadata"?: any
}
