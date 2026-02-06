import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const FEATURE_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Features",
    route: "/admin/tables/Features",
    activable: true
  }
]
