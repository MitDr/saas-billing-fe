export interface PlanGroupRequest {
  name: string,
  description?: string,
  plans?: number[],
  tenantId: number
}
