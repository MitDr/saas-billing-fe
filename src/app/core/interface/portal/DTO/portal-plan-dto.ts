export interface PortalPlanDto{
  id: number,
  name: string,
  image: string,
  status: 'ACTIVE' | 'DEACTIVATED' | 'CANCEL'
  createdDate: string,
  modifiedDate: string
}
