import {SubscriptionDTO} from '../../DTO/SubscriptionDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {AuthSubscriptionDto} from '../../DTO/auth/auth-subscription-dto';

export interface AuthSubscriber{
  "id": number,
  "name": string,
  "email": string,
  "subscriptions": AuthSubscriptionDto[]
  "createdDate": string,
  "modifiedDate": string,
}
