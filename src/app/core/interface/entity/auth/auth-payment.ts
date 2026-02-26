import {InvoiceDTO} from '../../DTO/InvoiceDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {AuthInvoiceDto} from '../../DTO/auth/auth-invoice-dto';

export interface AuthPayment{
  "id": number,
  "amount": number,
  "currency": "VND" | 'USD',
  "status": "PENDING" | 'AVAILABLE' | 'REFUNDED',
  "invoice": AuthInvoiceDto,
  "availableOn": string,
  "createdDate": string,
  "modifiedDate": string,
  "metadata": any
}
