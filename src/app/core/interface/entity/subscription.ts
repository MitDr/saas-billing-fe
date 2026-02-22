import {SubscriberDTO} from '../DTO/SubscriberDTO';
import {PriceDTO} from '../DTO/PriceDTO';
import {TenantDTO} from '../DTO/TenantDTO';
import {InvoiceDTO} from '../DTO/InvoiceDTO';

export interface Subscription {
  "id": number,
  "status": "ACTIVE" | 'DRAFT' | 'PENDING' | 'ENDED' | 'CANCEL',
  "defaultPaymentMethod": string,
  "quantity": number,
  "startDate": string,
  "endDate": string,
  "cancelAtPeriodEnd": boolean,
  "cancelDate": string,
  "dueDate": string,
  "createdDate": string,
  "modifiedDate": string,
  "subscriber": SubscriberDTO,
  "price": PriceDTO,
  "invoices": InvoiceDTO[],
  "tenant": TenantDTO,
  "metadata": any,
  "trial": boolean,
  "softDelete": boolean,
}
