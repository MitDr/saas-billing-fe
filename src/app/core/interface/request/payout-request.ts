export interface PayoutRequest {
  amount: number,
  currency: 'USD' | 'VND',
  status: "SUCCESS" | 'REQUESTED' | 'PROCESSING' | 'FAILED',
  stripeTransferId?: string,
  stripePayoutId?: string,
  stripeBalanceTransactionId?: string,
  tenantId: number
}
