export interface AuthWebhookEndpointRequest{
  url: string,
  status: "ACTIVE" | 'DISABLED',
}
