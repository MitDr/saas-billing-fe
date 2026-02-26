import {TenantDTO} from '../../DTO/TenantDTO';

export interface AuthPayout{
  "id": number,
  "amount": number,
  "currency": "USD" | 'VND',
  status: "SUCCESS" | 'REQUESTED' | 'PROCESSING' | 'FAILED',
  "createdDate": string,
  "modifiedDate": string
}
