import {WebhookEndpointDTO} from '../DTO/webhookEndpointDTO';

export interface WebhookLog{
  "id": number,
  "eventType": "PAYMENT_SUCCESS" | 'SUBSCRIPTION_CREATED' | 'SUBSCRIPTION_CANCELLED' | 'SUBSCRIPTION_RENEWED' | 'SUBSCRIPTION_RENEWAL_FAILED',
  "data": any,
  "status": "SUCCESS" |'FAILED' | 'NO_RESPONSE',
  "responseCode": number,
  "responseBody": string,
  "createdDate": string,
  "webhookEndpoint": WebhookEndpointDTO
}
