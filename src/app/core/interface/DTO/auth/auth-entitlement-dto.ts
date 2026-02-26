export interface AuthEntitlementDto{
  id: number;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  createdDate: string;
  modifiedDate: string;
}
