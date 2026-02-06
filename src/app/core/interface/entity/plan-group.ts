import {TenantDTO} from '../DTO/TenantDTO';
import {PlanDTO} from '../DTO/planDTO';

export interface PlanGroup {
  "id": number,
  "name": string,
  "description": string,
  "createdDate": string,
  "modifiedDate": string,
  "plans": PlanDTO[],
  "tenant": TenantDTO
}
