import {AuthEntitlementDto} from '../../DTO/auth/auth-entitlement-dto';
import {AuthPlanDto} from '../../DTO/auth/auth-plan-dto';

export interface AuthFeature {
  id: number;
  code: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdDate: string;
  modifiedDate: string;
  entitlements: AuthEntitlementDto[];
  plans: AuthPlanDto[];
}

