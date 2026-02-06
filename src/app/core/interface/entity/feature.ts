import {TenantDTO} from '../DTO/TenantDTO';

export interface Feature {
  id: number;
  code: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdDate: string;
  modifiedDate: string;
  entitlements: number;
  plans: number;
  tenant: TenantDTO;
  softDelete: boolean;
}
