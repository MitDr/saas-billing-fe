import {TenantDTO} from '../DTO/TenantDTO';

export interface WebhookEndpoint {
  "id": number,
  "url": string,
    "secret": string,
    "status": "ACTIVE" | 'DISABLED',
    "createdDate": string,
    "modifiedDate": string,
    "tenant": TenantDTO
}
