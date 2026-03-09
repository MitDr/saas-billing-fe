import {AuthSubscriberDto} from '../DTO/auth/auth-subscriber-dto';
import {AuthPriceDto} from '../DTO/auth/auth-price-dto';
import {AuthInvoiceDto} from '../DTO/auth/auth-invoice-dto';
import {PortalPlanDto} from './DTO/portal-plan-dto';

export interface PortalSubscription{
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
  "plan": PortalPlanDto
  "isTrial": boolean,
}
