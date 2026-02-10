import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const SUBSCRIPTION_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Subscriptions",
    route: "/admin/tables/subscriptions",
    activable: true
  }
]
