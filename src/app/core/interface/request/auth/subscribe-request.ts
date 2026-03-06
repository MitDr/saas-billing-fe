export interface SubscribeRequest{
  quantity: number,
  numberOfCycle: number,
  isTrial: boolean,
  subscriberId: number,
  priceId: number,
  cancelAtPeriodEnd: boolean,
  metadata: any
}
