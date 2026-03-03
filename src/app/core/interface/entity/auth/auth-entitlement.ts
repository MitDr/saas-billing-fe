import {SubscriptionDTO} from '../../DTO/SubscriptionDTO';
import {FeatureDTO} from '../../DTO/FeatureDTO';
import {SubscriberDTO} from '../../DTO/SubscriberDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {AuthSubscriptionDto} from '../../DTO/auth/auth-subscription-dto';
import {AuthFeatureDto} from '../../DTO/auth/auth-feature-dto';
import {AuthSubscriberDto} from '../../DTO/auth/auth-subscriber-dto';

export interface AuthEntitlement{
  "id": number,
  "startDate": string,
  "endDate": string,
  "status": 'ACTIVE' | 'EXPIRED' | 'REVOKED',
  "createdDate": string,
  "modifiedDate": string,
  "subscription": AuthSubscriptionDto,
  "feature": AuthFeatureDto,
  "subscriber": AuthSubscriberDto,
}
