import {ChurnRateDto} from '../../DTO/churn-rate-dto';

export interface ChurnRateResponse{
  period: number,
  churnRate: number,
  data: ChurnRateDto[],
}
