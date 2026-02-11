import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const PAYMENT_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Payments",
    route: "/admin/tables/payments",
    activable: true
  }
]
