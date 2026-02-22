import {PlanDTO} from '../DTO/planDTO';
import {TenantDTO} from '../DTO/TenantDTO';

export interface Price {
  "id": number,
  "price": number,
  "currency": 'USD' | 'VND',
  "scheme": "FLAT_RATE" | 'PER_UNIT',
  "cycle": "MONTH" | 'DAY' | 'WEEK' | 'YEAR',
  "status": "ACTIVE" | 'DEACTIVATED' | 'CANCEL',
  "maxUnit": number,
  "cycleCount": number,
  "trialPeriod": number,
  'trialCycle': "MONTH" | 'DAY' | 'WEEK' | 'YEAR'
  "dueDelay": number,
  "createdDate": string,
  "modifiedDate": string,
  "plan": PlanDTO,
  "tenant": TenantDTO,
  "softDelete": boolean
}
