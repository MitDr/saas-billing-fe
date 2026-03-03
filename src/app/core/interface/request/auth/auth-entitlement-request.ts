export interface AuthEntitlementRequest{
  "startDate": string,
  "endDate": string,
  "status": 'ACTIVE' | 'EXPIRED' | 'REVOKED',
  "subscriptionId": number,
  "featureId": number
}
