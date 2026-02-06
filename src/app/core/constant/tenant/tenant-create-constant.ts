import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const TENANT_CREATE_ROUTE_CONSTANT: BreadCrumbInterface[] = [
  {
    name: "Dashboard",
    route: "/admin/dashboard",
    activable: true
  },
  {
    name: "Tables",
    route: "/admin/tables",
    activable: false
  },
  {
    name: "Tenants",
    route: "/admin/tables/tenants",
    activable: true
  },
  {
    name: "Create",
    route: "/admin/tables/tenants/create",
    activable: true
  }
]
