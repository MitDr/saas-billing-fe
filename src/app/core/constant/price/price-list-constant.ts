import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const PRICE_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Prices",
    route: "/admin/tables/prices",
    activable: true
  }
]
export const AUTH_PRICE_ROUTE_CONSTANT: BreadCrumbInterface[] = [
  {
    name: "Dashboard",
    route: "/app/dashboard",
    activable: true
  },
  {
    name: "Tables",
    route: "/app/tables",
    activable: false
  },
  {
    name: "Prices",
    route: "/app/tables/prices",
    activable: true
  }
]
