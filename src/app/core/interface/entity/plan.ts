import {Feature} from './feature';
import {FeatureDTO} from '../DTO/FeatureDTO';
import {TenantDTO} from '../DTO/TenantDTO';

export interface Plan {
  "id": number,
  "name": string,
  "image": string,
  "status": 'ACTIVE' | 'INACTIVE',
  "createdDate": string,
  "modifiedDate": string,
  "planGroup": number,
  "prices": number,
  "features": FeatureDTO[],
  "tenant": TenantDTO,
  "softDelete": boolean
}
