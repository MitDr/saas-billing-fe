export interface PriceRequest {
  price: number,
  currency: 'USD' | 'VND',
  cycle: "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  status: "ACTIVE" | 'DEACTIVATED' | 'CANCEL',
  maxUnit: number,
  cycleCount: number,
  trialCycle: "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  trialPeriod: number,
  dueDelay: number,
  planId?: number,
  tenantId: number
}
