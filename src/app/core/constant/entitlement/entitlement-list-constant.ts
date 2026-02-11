import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const ENTITLEMENT_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Entitlements",
    route: "/admin/tables/entitlements",
    activable: true
  }
]
