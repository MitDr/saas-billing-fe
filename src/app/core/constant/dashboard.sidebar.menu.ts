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
        title: 'Entitlements',
        icon: 'eye',
        path: '/admin/tables/entitlements',
      },
      {
        title: 'Feature',
        icon: 'bulb',
        path: '/admin/tables/features',
      },
      {
        title: 'Image',
        icon: 'picture',
        path: '/admin/tables/images'
      },
      {
        title: 'Invoice',
        icon: 'file-done',
        path: '/admin/tables/invoices'
      },
      {
        title: 'Payment',
        icon: 'credit-card',
        path: '/admin/tables/payments'
      },
      {
        title: 'Payout',
        icon: 'dollar',
        path: '/admin/tables/payouts'
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
        title: 'Subscriber',
        icon: 'team',
        path: '/admin/tables/subscribers',
      },
      {
        title: 'Subscription',
        icon: 'wallet',
        path: '/admin/tables/subscriptions',
      },
      {
        title: 'Tenant',
        icon: 'container',
        path: '/admin/tables/tenants',
      },
      {
        title: 'Users',
        icon: 'user',
        path: '/admin/tables/users',
      },
      {
        title: 'Webhook Endpoint',
        icon: 'solution',
        path: '/admin/tables/webhook-endpoints',
      },
      {
        title: 'Webhook Log',
        icon: 'file-protect',
        path: '/admin/tables/webhook-logs',
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

