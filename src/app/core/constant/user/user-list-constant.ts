import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const USER_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Users",
    route: "/admin/tables/users",
    activable: true
  }
]
