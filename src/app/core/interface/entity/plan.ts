import {FeatureDTO} from '../DTO/FeatureDTO';
import {TenantDTO} from '../DTO/TenantDTO';
import {PriceDTO} from '../DTO/PriceDTO';
import {PlanGroupDTO} from '../DTO/planGroupDTO';

export interface Plan {
  "id": number,
  "name": string,
  "image": string,
  "status": 'DEACTIVATED' | 'ACTIVE' | 'CANCEL',
  "createdDate": string,
  "modifiedDate": string,
  "planGroup": PlanGroupDTO,
  "prices": PriceDTO[],
  "features": FeatureDTO[],
  "tenant": TenantDTO,
  "softDelete": boolean
}
