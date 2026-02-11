import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const INVOICE_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Invoices",
    route: "/admin/tables/invoices",
    activable: true
  }
]
