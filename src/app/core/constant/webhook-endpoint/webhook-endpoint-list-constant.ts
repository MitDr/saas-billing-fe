import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const WEBHOOK_ENDPOINT_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Webhook-Endpoint",
    route: "/admin/tables/webhook-endpoints",
    activable: true
  }
]
