import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const PLAN_ROUTE_CONSTANT: BreadCrumbInterface [] = [
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
    name: "Plans",
    route: "/admin/tables/plans",
    activable: true
  }
]
