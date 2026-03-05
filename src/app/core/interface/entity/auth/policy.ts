import {PolicyCheckDto} from '../../DTO/auth/policy-check-dto';

export interface Policy{
    entitlements: PolicyCheckDto[];
}
