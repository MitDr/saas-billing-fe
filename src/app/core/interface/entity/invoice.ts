import {SubscriberDTO} from '../DTO/SubscriberDTO';
import {TenantDTO} from '../DTO/TenantDTO';

export interface Invoice {
  "id": number,
  "invoiceNumber": string,
  "amount": number,
  "currency": "VND" | 'USD',
  "status": "PAID" | 'DRAFT' | 'UNPAID' | 'VOID',
  "paidDate": string,
  "billingPeriodStart": string,
  "billingPeriodEnd": string,
  "amountUsd": number,
  "exchangeRate": string,
  "subscriber": SubscriberDTO,
  "createdDate": string,
  "modifiedDate": string,
  "tenant": TenantDTO,
  "subscription": SubscriberDTO,
  "softDelete": boolean,
  "metadata": any
}
