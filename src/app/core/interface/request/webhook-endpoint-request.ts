export interface WebhookEndpointRequest {
  url: string,
  status: "ACTIVE" | 'DISABLED',
  tenantId: number
}
