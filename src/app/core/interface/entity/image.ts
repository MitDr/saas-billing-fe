import {TenantDTO} from '../DTO/TenantDTO';

export interface Image {
  "id": number,
  "url": string,
  "publicId": string,
  "createdDate": string,
  "modifiedDate": string,
  "tenant": TenantDTO
}
