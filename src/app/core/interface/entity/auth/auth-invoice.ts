import {SubscriberDTO} from '../../DTO/SubscriberDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {SubscriptionDTO} from '../../DTO/SubscriptionDTO';
import {AuthSubscriberDto} from '../../DTO/auth/auth-subscriber-dto';
import {AuthSubscriptionDto} from '../../DTO/auth/auth-subscription-dto';

export interface AuthInvoice{
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
  "subscriber": AuthSubscriberDto,
  "createdDate": string,
  "modifiedDate": string,
  "subscription": AuthSubscriptionDto,
  "metadata": any;
}
