import {TenantDTO} from '../DTO/TenantDTO';

export interface Subscriber {
  "id": number,
  "name": string,
  "email": string,
  "subscriptions": number
  "createdDate": string,
  "modifiedDate": string,
  "tenant": TenantDTO,
  "softDelete": boolean;
}
