export interface ExpectedRenewal{
  subscriptionId: number;
  subscriberId: number;
  subscriberName: string;
  planName: string;
  renewalDate: string;
  expectedAmountUsd: number;
  autoRenew: boolean;
}
