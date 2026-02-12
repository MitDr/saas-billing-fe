import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const WEBHOOK_LOG_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Webhook-Logs",
    route: "/admin/tables/webhook-logs",
    activable: true
  }
]
