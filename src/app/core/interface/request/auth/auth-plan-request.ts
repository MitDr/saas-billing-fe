export interface AuthPlanRequest {
  name: string,
  status: 'DEACTIVATED' | 'ACTIVE' | 'CANCEL',
  planGroupId?: number,
  prices?: number[],
  features?: number[]
}
