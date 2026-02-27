import {TenantDTO} from '../../DTO/TenantDTO';

export interface AuthWebhookEndpoint{
  "id": number,
  "url": string,
  "secret": string,
  "status": "ACTIVE" | 'DISABLED',
  "createdDate": string,
  "modifiedDate": string,
}
