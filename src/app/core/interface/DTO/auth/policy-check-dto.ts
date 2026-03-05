import {AuthFeatureDto} from './auth-feature-dto';

export interface PolicyCheckDto{
  feature: AuthFeatureDto;
  allowed: boolean,
  validUntil: string,
  message: string
}
