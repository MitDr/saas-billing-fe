import {TenantDTO} from '../DTO/TenantDTO';

export interface Payout {
  "id": number,
  "amount": number,
  "currency": "USD" | 'VND',
  status: "SUCCESS" | 'REQUESTED' | 'PROCESSING' | 'FAILED',
  "createdDate": string,
  "modifiedDate": string,
  "stripeTransferId": string,
  "stripePayoutId": string,
  "stripeBalanceTransactionId": string,
  "tenant": TenantDTO
}
