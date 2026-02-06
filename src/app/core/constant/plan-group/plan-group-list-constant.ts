import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const PLAN_GROUP_ROUTE_CONSTANT: BreadCrumbInterface [] = [
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
    name: "Plan-Groups",
    route: "/admin/tables/plan-groups",
    activable: true
  }
  ]
