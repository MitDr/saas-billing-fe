export interface SubscriptionDTO{
  "id": number,
  "status": "ACTIVE" | 'DRAFT' | 'PENDING' | 'ENDED' | 'CANCEL',
  "startDate": string,
  "endDate": string,
  "softDelete": boolean,
  "trial": boolean
}
