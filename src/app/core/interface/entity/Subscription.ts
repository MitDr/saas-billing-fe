import {SubscriberDTO} from '../DTO/SubscriberDTO';
import {PriceDTO} from '../DTO/PriceDTO';
import {TenantDTO} from '../DTO/TenantDTO';

export interface Subscription{
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
  "invoices": number,
  "tenant": TenantDTO,
  "metadata": any,
  "trial": boolean
}
