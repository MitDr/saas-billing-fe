import {BreadCrumbInterface} from '../../interface/bread-crumb-interface';

export const IMAGE_ROUTE_CONSTANT: BreadCrumbInterface[] = [
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
    name: "Images",
    route: "/admin/tables/Images",
    activable: true
  }
]
