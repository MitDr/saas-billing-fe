import {SubscriberDTO} from '../../DTO/SubscriberDTO';
import {PriceDTO} from '../../DTO/PriceDTO';
import {InvoiceDTO} from '../../DTO/InvoiceDTO';
import {TenantDTO} from '../../DTO/TenantDTO';
import {AuthSubscriberDto} from '../../DTO/auth/auth-subscriber-dto';
import {AuthPriceDto} from '../../DTO/auth/auth-price-dto';
import {AuthInvoiceDto} from '../../DTO/auth/auth-invoice-dto';

export interface AuthSubscription{
  "id": number,
  "status": "ACTIVE" | 'DRAFT' | 'PENDING' | 'ENDED' | 'CANCEL',
  "quantity": number,
  "startDate": string,
  "endDate": string,
  "cancelAtPeriodEnd": boolean,
  "cancelDate": string,
  "dueDate": string,
  "createdDate": string,
  "modifiedDate": string,
  "subscriber": AuthSubscriberDto,
  "price": AuthPriceDto,
  "invoices": AuthInvoiceDto[],
  "metadata": any,
  "trial": boolean,
}
