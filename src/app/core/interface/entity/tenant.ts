import {User} from './user';

export interface Tenant {
  id: number;
  name: string;
  email: string;
  apiKey: string;
  currentAmount: number;
  pendingAmount: number;
  stripeAccountId: string;
  stripeOnboarded: boolean,
  createdDate: string;
  modifiedDate: string;
  creator: User;
  users: User[];
  softDelete: boolean;
}
