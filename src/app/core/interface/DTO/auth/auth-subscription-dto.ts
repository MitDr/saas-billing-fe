export interface AuthSubscriptionDto {
  "id": number,
  "status": "ACTIVE" | 'DRAFT' | 'PENDING' | 'ENDED' | 'CANCEL',
  "startDate": string,
  "endDate": string,
  "trial": boolean
}
