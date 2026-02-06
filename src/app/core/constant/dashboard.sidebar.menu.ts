import {MenuItem} from '../interface/MenuItem';

export const ADMIN_SIDEBAR_MENU: MenuItem[] =[
  {
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/admin/dashboard'
  },
  {
    title: 'Tables',
    icon: 'table',
    path: '/admin/tables',
    children: [
      {
        title: 'Feature',
        icon: 'bulb',
        path: '/admin/tables/features',
      },
      {
        title: 'Plan',
        icon: 'book',
        path: '/admin/tables/plans',
      },
      {
        title: 'Plan Group',
        icon: 'group',
        path: '/admin/tables/plan-groups'
      },
      {
        title: 'Price',
        icon: 'exception',
        path: '/admin/tables/prices'
      },
      {
        title: 'Users',
        icon: 'user',
        path: '/admin/tables/users',
      },
      {
        title: 'Tenant',
        icon: 'container',
        path: '/admin/tables/tenants',
      },
      {
        title: 'Subscription',
        icon: 'wallet',
        path: '/admin/tables/subscriptions',
      },

    ]
  }
]

export const APP_MENU: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    path: '/app/dashboard'
  },
  {
    title: 'Invoices',
    icon: 'file',
    path: '/app/invoices'
  }
];

