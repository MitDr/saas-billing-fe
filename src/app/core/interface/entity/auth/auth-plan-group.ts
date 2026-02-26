import {PlanDTO} from '../../DTO/planDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {AuthPlanDto} from '../../DTO/auth/auth-plan-dto';

export interface AuthPlanGroup{
  "id": number,
  "name": string,
  "description": string,
  "createdDate": string,
  "modifiedDate": string,
  "plans": AuthPlanDto[],
}
