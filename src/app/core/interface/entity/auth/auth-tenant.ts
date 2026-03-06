import {User} from '../user';
import {AuthUserDto} from '../../DTO/auth/auth-user-dto';

export interface AuthTenant{
  id: number;
  name: string;
  email: string;
  apiKey: string;
  currentAmount: number;
  pendingAmount: number;
  stripeOnboarded: boolean,
  createdDate: string;
  modifiedDate: string;
  creator: AuthUserDto;
  users: AuthUserDto[];
}
