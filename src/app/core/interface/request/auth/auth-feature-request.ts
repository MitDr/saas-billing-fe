export interface AuthFeatureRequest{
  "code": string,
  "name": string,
  "description"?: string,
  "status": 'ACTIVE' | 'INACTIVE',
  "plans"?: number[],
}
