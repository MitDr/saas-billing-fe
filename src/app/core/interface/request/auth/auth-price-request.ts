export interface AuthPriceRequest{
  price: number,
  currency: 'USD' | 'VND',
  scheme: "FLAT_RATE" | 'PER_UNIT',
  cycle: "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  status: "ACTIVE" | 'DEACTIVATED' | 'CANCEL',
  maxUnit: number,
  cycleCount: number,
  trialCycle: "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  trialPeriod: number,
  dueDelay: number,
  planId?: number,
}
