import {PlanGroupDTO} from '../../DTO/planGroupDTO';
import {PriceDTO} from '../../DTO/PriceDTO';
import {FeatureDTO} from '../../DTO/FeatureDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {AuthPlanGroupDto} from '../../DTO/auth/auth-plan-group-dto';
import {AuthPriceDto} from '../../DTO/auth/auth-price-dto';
import {AuthFeatureDto} from '../../DTO/auth/auth-feature-dto';

export interface AuthPlan{
  "id": number,
  "name": string,
  "image": string,
  "status": 'DEACTIVATED' | 'ACTIVE' | 'CANCEL',
  "createdDate": string,
  "modifiedDate": string,
  "planGroup": AuthPlanGroupDto,
  "prices": AuthPriceDto[],
  "features": AuthFeatureDto[],
}
