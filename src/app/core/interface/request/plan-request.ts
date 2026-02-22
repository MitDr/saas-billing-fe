export interface PlanRequest {
  name: string,
  image: string,
  "status": 'DEACTIVATED' | 'ACTIVE' | 'CANCEL',
  planGroupId?: number,
  prices?: number[],
  features?: number[],
  tenantId: number
}
