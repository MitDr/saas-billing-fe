import {TenantDTO} from '../DTO/TenantDTO';
import {SubscriptionDTO} from '../DTO/SubscriptionDTO';

export interface Subscriber {
  "id": number,
  "name": string,
  "email": string,
  customerId: string,
  "subscriptions": SubscriptionDTO[]
  "createdDate": string,
  "modifiedDate": string,
  "tenant": TenantDTO,
  "softDelete": boolean;
}
