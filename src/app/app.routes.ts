import {Routes} from '@angular/router';
import {PublicLayout} from './layout/public/public-layout/public-layout';
import {Home} from './pages/home/home';
import {Dashboard} from './pages/admin/dashboard/dashboard';
import {DashboardLayout} from './layout/admin/dashboard-layout/dashboard-layout';
import {DashboardAuthLayout} from './layout/auth/dashboard-auth-layout/dashboard-auth-layout';
import {AuthDashboard} from './pages/auth/auth-dashboard/auth-dashboard';
import {UserList} from './pages/admin/tables/user/user-list/user-list';
import {UserCreate} from './pages/admin/tables/user/user-create/user-create';
import {UserDetail} from './pages/admin/tables/user/user-detail/user-detail';
import {TenantList} from './pages/admin/tables/tenant/tenant-list/tenant-list';
import {TenantDetail} from './pages/admin/tables/tenant/tenant-detail/tenant-detail';
import {TenantCreate} from './pages/admin/tables/tenant/tenant-create/tenant-create';
import {TenantEdit} from './pages/admin/tables/tenant/tenant-edit/tenant-edit';
import {FeatureList} from './pages/admin/tables/feature/feature-list/feature-list';
import {PlanList} from './pages/admin/tables/plan/plan-list/plan-list';
import {PlanGroupList} from './pages/admin/tables/plan-group/plan-group-list/plan-group-list';
import {PriceList} from './pages/admin/tables/price/price-list/price-list';
import {AuthFormLayout} from './layout/public/auth-form-layout/auth-form-layout';
import {Login} from './pages/public/login/login';
import {adminGuard, authGuard} from './core/auth/guard/auth-guard';
import {SubscriberList} from './pages/admin/tables/subscriber/subscriber-list/subscriber-list';
import {SubscriptionList} from './pages/admin/tables/subscription/subscription-list/subscription-list';
import {Register} from './pages/public/register/register/register';
import {EntitlementList} from './pages/admin/tables/entitlement/entitlement-list/entitlement-list';
import {ImageList} from './pages/admin/tables/image/image-list/image-list';
import {InvoiceList} from './pages/admin/tables/invoice/invoice-list/invoice-list';
import {PaymentList} from './pages/admin/tables/payment/payment-list/payment-list';
import {PayoutList} from './pages/admin/tables/payout/payout-list/payout-list';
import {WebhookEndpointList} from './pages/admin/tables/webhook-endpoint/webhook-endpoint-list/webhook-endpoint-list';
import {WebhookLogList} from './pages/admin/tables/webhook-log/webhook-log-list/webhook-log-list';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: 'auth',
    component: AuthFormLayout,
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },
  {
    path: 'admin',
    component: DashboardLayout,
    // canActivate: [adminGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'tables/users',
        component: UserList,
      },
      {
        path: 'tables/users/create',
        component: UserCreate
      },
      {
        path: 'tables/users/:id',
        component: UserDetail,
      },
      //Tenants
      {
        path: 'tables/tenants',
        component: TenantList,
      },
      {
        path: 'tables/tenants/create',
        component: TenantCreate
      },
      {
        path: 'tables/tenants/:id',
        component: TenantDetail,
      },
      {
        path: 'tables/tenants/:id/edit',
        component: TenantEdit,
      },
      //Features
      {
        path: 'tables/features',
        component: FeatureList,
      },
      //Plan
      {
        path: 'tables/plans',
        component: PlanList
      },
      //Plan-group
      {
        path: 'tables/plan-groups',
        component: PlanGroupList
      },
      //Price
      {
        path: 'tables/prices',
        component: PriceList
      },
      //Subscribers
      {
        path: 'tables/subscribers',
        component: SubscriberList
      },
      //Subscriptions
      {
        path: 'tables/subscriptions',
        component: SubscriptionList
      },
      //Entitlement
      {
        path: 'tables/entitlements',
        component: EntitlementList
      },
      //Image
      {
        path: 'tables/images',
        component: ImageList
      },
      //Invoice
      {
        path: 'tables/invoices',
        component: InvoiceList
      },
      //Payment
      {
        path: 'tables/payments',
        component: PaymentList
      },
      //Payout
      {
        path: 'tables/payouts',
        component: PayoutList
      },
      //Webhook Endpoints
      {
        path: 'tables/webhook-endpoints',
        component: WebhookEndpointList,
      },
      //Webhook Log
      {
        path: 'tables/webhook-logs',
        component: WebhookLogList
      }
    ]
  },
  {
    path: 'app',
    component: DashboardAuthLayout,
    // canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: AuthDashboard
      }
    ]
  }
  // {
  //   path: 'dashboard',
  //   component: DashboardLayout,
  //   children: [
  //     {
  //       path: '',
  //       component: Dashboard
  //     }
  //   ]
  // },
];
