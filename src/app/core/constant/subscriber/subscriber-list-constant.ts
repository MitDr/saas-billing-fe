import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const SUBSCRIBER_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Subscribers",
    route: "/admin/tables/subscribers",
    activable: true
  }
]
