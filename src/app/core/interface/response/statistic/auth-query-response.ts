import {AuthSourceDto} from '../../DTO/auth/auth-source-dto';

export interface AuthQueryResponse {
  answer: string,
  sources: AuthSourceDto[]
}
