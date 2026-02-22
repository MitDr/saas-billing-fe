export interface EntitlementRequest {
  "startDate": string,
  "endDate": string,
  "status": 'ACTIVE' | 'EXPIRED' | 'REVOKED',
  "subscriptionId": number,
  "tenantId": number,
  "featureId": number
}
