import {TenantDTO} from '../DTO/TenantDTO';
import {PlanDTO} from '../DTO/planDTO';
import {EntitlementDTO} from '../DTO/EntitlementDTO';

export interface Feature {
  id: number;
  code: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdDate: string;
  modifiedDate: string;
  entitlements: EntitlementDTO[];
  plans: PlanDTO[];
  tenant: TenantDTO;
  softDelete: boolean;
}
