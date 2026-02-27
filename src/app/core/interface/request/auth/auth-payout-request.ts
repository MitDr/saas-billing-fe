export interface AuthPayoutRequest{
  amount: number,
  currency: 'USD' | 'VND',
  status: "SUCCESS" | 'REQUESTED' | 'PROCESSING' | 'FAILED',
  stripeTransferId?: string,
  stripePayoutId?: string,
  stripeBalanceTransactionId?: string,
}
