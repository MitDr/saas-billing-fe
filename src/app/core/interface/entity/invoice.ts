import {SubscriberDTO} from '../DTO/SubscriberDTO';
import {TenantDTO} from '../DTO/TenantDTO';
import {SubscriptionDTO} from '../DTO/SubscriptionDTO';

export interface Invoice {
  "id": number,
  "invoiceNumber": string,
  "amount": number,
  "currency": "VND" | 'USD',
  "status": "PAID" | 'DRAFT' | 'UNPAID' | 'VOID',
  "paidDate"?: string,
  "billingPeriodStart": string,
  "billingPeriodEnd": string,
  "amountUsd": number,
  "exchangeRate": string,
  "subscriber": SubscriberDTO,
  "createdDate": string,
  "modifiedDate": string,
  "tenant": TenantDTO,
  "subscription": SubscriptionDTO,
  "softDelete": boolean,
  "metadata": any;
}
