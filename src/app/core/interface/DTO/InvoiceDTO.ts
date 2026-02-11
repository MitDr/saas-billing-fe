export interface InvoiceDTO{
  "id": number,
  "invoiceNumber": string,
  "amount": number,
  "currency": "VND" | 'USD',
  "status": "PAID" | 'DRAFT' | 'UNPAID' | 'VOID',
  "paidDate": string,
  "billingPeriodStart": string,
  "billingPeriodEnd": string,
  "createdDate": string,
  "modifiedDate": string,
  "softDelete": boolean
}
