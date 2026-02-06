export interface PlanDTO {
  "id": number,
  "name": string,
  "image": string,
  "status": 'ACTIVE' | 'INACTIVE',
  "createdDate": string,
  "modifiedDate": string,
  "softDelete": boolean
}
