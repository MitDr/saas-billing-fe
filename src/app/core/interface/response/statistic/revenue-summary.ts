export interface RevenueSummary {
  totalRevenue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  expectedRecurringRevenue: number;
  numberOfInvoices: number;
  paidInvoices: number;
  unpaidInvoices: number;
}
