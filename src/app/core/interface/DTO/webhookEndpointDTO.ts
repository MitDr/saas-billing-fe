export interface WebhookEndpointDTO{
  "id": number,
  "url": string,
  "status": "ACTIVE" | "DISABLED",
  "createdDate": string,
  "modifiedDate": string
}
