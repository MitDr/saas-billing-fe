export interface FeatureRequest {
  "code": string,
  "name": string,
  "description"?: string,
  "status": 'ACTIVE' | 'INACTIVE',
  // "plans": [],
  "plans"?: number[],
  "tenantId": number

}
