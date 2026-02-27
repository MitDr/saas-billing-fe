export interface AuthWebhookLogRequest{
  "eventType": "PAYMENT_SUCCESS" | 'SUBSCRIPTION_CREATED' | 'SUBSCRIPTION_CANCELLED' | 'SUBSCRIPTION_RENEWED' | 'SUBSCRIPTION_RENEWAL_FAILED',
  data: any,
  "status": "SUCCESS" | 'FAILED' | 'NO_RESPONSE',
  "responseCode": number,
  "responseBody": string,
  "webhookEndpointId": number
}
