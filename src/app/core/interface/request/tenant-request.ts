export interface TenantRequest {
  name: string,
  email: string,
  currentAmount: number,
  pendingAmount: number,
  stripeAccountId?: string,
  creatorId: number,
  users?: number[]
}
