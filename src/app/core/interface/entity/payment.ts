import {TenantDTO} from '../DTO/TenantDTO';
import {InvoiceDTO} from '../DTO/InvoiceDTO';

export interface Payment{
  "id": number,
  "amount": number,
  "currency": "VND" | 'USD',
  "status": "PENDING" | 'AVAILABLE' | 'REFUNDED',
  "paymentIntentId": string,
  "chargeId": string,
  "balanceTransactionId": string,
  "paymentMethod": string,
  "invoice": InvoiceDTO,
  "tenant": TenantDTO,
  "availableOn": string,
  "createdDate": string,
  "modifiedDate": string,
  "softDelete": boolean,
  "metadata": any
}
