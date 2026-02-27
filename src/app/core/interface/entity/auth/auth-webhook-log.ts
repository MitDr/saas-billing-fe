import {WebhookEndpointDTO} from '../../DTO/webhookEndpointDTO';
import {AuthWebhookEndpointDto} from '../../DTO/auth/auth-webhook-endpoint-dto';

export interface AuthWebhookLog{
  "id": number,
  "eventType": "PAYMENT_SUCCESS" | 'SUBSCRIPTION_CREATED' | 'SUBSCRIPTION_CANCELLED' | 'SUBSCRIPTION_RENEWED' | 'SUBSCRIPTION_RENEWAL_FAILED',
  "data": any,
  "status": "SUCCESS" |'FAILED' | 'NO_RESPONSE',
  "responseCode": number,
  "responseBody": string,
  "createdDate": string,
  "webhookEndpoint": AuthWebhookEndpointDto
}
