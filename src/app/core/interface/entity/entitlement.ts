import {FeatureDTO} from '../DTO/FeatureDTO';
import {SubscriberDTO} from '../DTO/SubscriberDTO';
import {TenantDTO} from '../DTO/TenantDTO';
import {SubscriptionDTO} from '../DTO/SubscriptionDTO';

export interface Entitlement {
  "id": number,
  "startDate": string,
  "endDate": string,
  "status": 'ACTIVE' | 'EXPIRED' | 'REVOKED',
  "createdDate": string,
  "modifiedDate": string,
  "subscription": SubscriptionDTO,
  "feature": FeatureDTO,
  "subscriber": SubscriberDTO,
  "tenant": TenantDTO,
  "softDelete": boolean
}
