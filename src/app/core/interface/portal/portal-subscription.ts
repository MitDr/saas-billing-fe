import {PortalPlanDto} from './DTO/portal-plan-dto';

export interface PortalSubscription {
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
  "trial": boolean,
}
