import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const PAYOUT_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Payouts",
    route: "/admin/tables/Payouts",
    activable: true
  }
]
