import {TenantDTO} from './TenantDTO';

export interface FeatureDTO {
  id: number;
  code: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdDate: string;
  modifiedDate: string;
  softDelete: boolean;
}
