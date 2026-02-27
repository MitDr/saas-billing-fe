export interface AuthPlanRequest{
  name: string,
  image: string,
  status: 'DEACTIVATED' | 'ACTIVE' | 'CANCEL',
  planGroupId?: number,
  prices?: number[],
  features?: number[]
}
