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
import {EntitlementDetail} from './pages/admin/tables/entitlement/entitlement-detail/entitlement-detail';
import {ImageDetail} from './pages/admin/tables/image/image-detail/image-detail';
import {InvoiceDetail} from './pages/admin/tables/invoice/invoice-detail/invoice-detail';
import {FeatureDetail} from './pages/admin/tables/feature/feature-detail/feature-detail';
import {PaymentDetail} from './pages/admin/tables/payment/payment-detail/payment-detail';
import {PayoutDetail} from './pages/admin/tables/payout/payout-detail/payout-detail';
import {PlanDetail} from './pages/admin/tables/plan/plan-detail/plan-detail';
import {PlanGroupDetail} from './pages/admin/tables/plan-group/plan-group-detail/plan-group-detail';
import {PriceDetail} from './pages/admin/tables/price/price-detail/price-detail';
import {SubscriberDetail} from './pages/admin/tables/subscriber/subscriber-detail/subscriber-detail';
import {SubscriptionDetail} from './pages/admin/tables/subscription/subscription-detail/subscription-detail';
import {
  WebhookEndpointDetail
} from './pages/admin/tables/webhook-endpoint/webhook-endpoint-detail/webhook-endpoint-detail';
import {WebhookLogDetail} from './pages/admin/tables/webhook-log/webhook-log-detail/webhook-log-detail';
import {UserEdit} from './pages/admin/tables/user/user-edit/user-edit';
import {EntitlementEdit} from './pages/admin/tables/entitlement/entitlement-edit/entitlement-edit';
import {EntitlementCreate} from './pages/admin/tables/entitlement/entitlement-create/entitlement-create';
import {FeatureCreate} from './pages/admin/tables/feature/feature-create/feature-create';
import {FeatureEdit} from './pages/admin/tables/feature/feature-edit/feature-edit';
import {ImageEdit} from './pages/admin/tables/image/image-edit/image-edit';
import {ImageCreate} from './pages/admin/tables/image/image-create/image-create';
import {InvoiceCreate} from './pages/admin/tables/invoice/invoice-create/invoice-create';
import {InvoiceEdit} from './pages/admin/tables/invoice/invoice-edit/invoice-edit';
import {PaymentCreate} from './pages/admin/tables/payment/payment-create/payment-create';
import {PaymentEdit} from './pages/admin/tables/payment/payment-edit/payment-edit';
import {PayoutCreate} from './pages/admin/tables/payout/payout-create/payout-create';
import {PayoutEdit} from './pages/admin/tables/payout/payout-edit/payout-edit';
import {PlanEdit} from './pages/admin/tables/plan/plan-edit/plan-edit';
import {PlanCreate} from './pages/admin/tables/plan/plan-create/plan-create';
import {PlanGroupCreate} from './pages/admin/tables/plan-group/plan-group-create/plan-group-create';
import {PlanGroupEdit} from './pages/admin/tables/plan-group/plan-group-edit/plan-group-edit';
import {PriceCreate} from './pages/admin/tables/price/price-create/price-create';
import {PriceEdit} from './pages/admin/tables/price/price-edit/price-edit';
import {SubscriberCreate} from './pages/admin/tables/subscriber/subscriber-create/subscriber-create';
import {SubscriberEdit} from './pages/admin/tables/subscriber/subscriber-edit/subscriber-edit';
import {SubscriptionEdit} from './pages/admin/tables/subscription/subscription-edit/subscription-edit';
import {SubscriptionCreate} from './pages/admin/tables/subscription/subscription-create/subscription-create';
import {
  WebhookEndpointCreate
} from './pages/admin/tables/webhook-endpoint/webhook-endpoint-create/webhook-endpoint-create';
import {WebhookEndpointEdit} from './pages/admin/tables/webhook-endpoint/webhook-endpoint-edit/webhook-endpoint-edit';
import {FeatureAuthList} from './pages/auth/tables/feature/feature-auth-list/feature-auth-list';
import {AuthInvoiceList} from './pages/auth/tables/invoice/auth-invoice-list/auth-invoice-list';
import {AuthPaymentList} from './pages/auth/tables/payment/auth-payment-list/auth-payment-list';

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
      {
        path: 'tables/users/:id/edit',
        component: UserEdit
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
      {
        path: 'tables/features/create',
        component: FeatureCreate,
      },
      {
        path: 'tables/features/:id',
        component: FeatureDetail,
      },
      {
        path: 'tables/features/:id/edit',
        component: FeatureEdit
      },
      //Plan
      {
        path: 'tables/plans',
        component: PlanList
      },
      {
        path: 'tables/plans/create',
        component: PlanCreate
      },
      {
        path: 'tables/plans/:id',
        component: PlanDetail
      },
      {
        path: 'tables/plans/:id/edit',
        component: PlanEdit
      },
      //Plan-group
      {
        path: 'tables/plan-groups',
        component: PlanGroupList
      },
      {
        path: 'tables/plan-groups/create',
        component: PlanGroupCreate
      },
      {
        path: 'tables/plan-groups/:id',
        component: PlanGroupDetail
      },
      {
        path: 'tables/plan-groups/:id/edit',
        component: PlanGroupEdit
      },
      //Price
      {
        path: 'tables/prices',
        component: PriceList
      },
      {
        path: 'tables/prices/create',
        component: PriceCreate
      },
      {
        path: 'tables/prices/:id',
        component: PriceDetail
      },
      {
        path: 'tables/prices/:id/edit',
        component: PriceEdit
      },
      //Subscribers
      {
        path: 'tables/subscribers',
        component: SubscriberList
      },
      {
        path: 'tables/subscribers/create',
        component: SubscriberCreate
      },
      {
        path: 'tables/subscribers/:id',
        component: SubscriberDetail
      },
      {
        path: 'tables/subscribers/:id/edit',
        component: SubscriberEdit
      },
      //Subscriptions
      {
        path: 'tables/subscriptions',
        component: SubscriptionList
      },
      {
        path: 'tables/subscriptions/create',
        component: SubscriptionCreate
      },
      {
        path: 'tables/subscriptions/:id',
        component: SubscriptionDetail
      },
      {
        path: 'tables/subscriptions/:id/edit',
        component: SubscriptionEdit
      },
      //Entitlement
      {
        path: 'tables/entitlements',
        component: EntitlementList
      },
      {
        path: 'tables/entitlements/create',
        component: EntitlementCreate
      },
      {
        path: 'tables/entitlements/:id',
        component: EntitlementDetail,
      },

      {
        path: 'tables/entitlements/:id/edit',
        component: EntitlementEdit
      },
      //Image
      {
        path: 'tables/images',
        component: ImageList
      },
      {
        path: 'tables/images/create',
        component: ImageCreate
      },
      {
        path: 'tables/images/:id',
        component: ImageDetail,
      },
      {
        path: 'tables/images/:id/edit',
        component: ImageEdit
      },
      //Invoice
      {
        path: 'tables/invoices',
        component: InvoiceList
      },
      {
        path: 'tables/invoices/create',
        component: InvoiceCreate
      },
      {
        path: 'tables/invoices/:id',
        component: InvoiceDetail,
      },
      {
        path: 'tables/invoices/:id/edit',
        component: InvoiceEdit
      },
      //Payment
      {
        path: 'tables/payments',
        component: PaymentList
      },
      {
        path: 'tables/payments/create',
        component: PaymentCreate
      },
      {
        path: 'tables/payments/:id',
        component: PaymentDetail,
      },
      {
        path: 'tables/payments/:id/edit',
        component: PaymentEdit
      },
      //Payout
      {
        path: 'tables/payouts',
        component: PayoutList
      },
      {
        path: 'tables/payouts/create',
        component: PayoutCreate
      },
      {
        path: 'tables/payouts/:id',
        component: PayoutDetail
      },
      {
        path: 'tables/payouts/:id/edit',
        component: PayoutEdit
      },
      //Webhook Endpoints
      {
        path: 'tables/webhook-endpoints',
        component: WebhookEndpointList,
      },
      {
        path: 'tables/webhook-endpoints/create',
        component: WebhookEndpointCreate,
      },
      {
        path: 'tables/webhook-endpoints/:id',
        component: WebhookEndpointDetail
      },
      {
        path: 'tables/webhook-endpoints/:id/edit',
        component: WebhookEndpointEdit
      },
      //Webhook Log
      {
        path: 'tables/webhook-logs',
        component: WebhookLogList
      },
      {
        path: 'tables/webhook-logs/:id',
        component: WebhookLogDetail
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
      },
      //Features
      {
        path: 'tables/features',
        component: FeatureAuthList
      },
      //Invoice
      {
        path: 'tables/invoices',
        component: AuthInvoiceList
      },
      //Payment
      {
        path: 'tables/payments',
        component: AuthPaymentList
      },
      //Payout
      // {
      //   path: 'tables/payouts',
      //   component: AuthPayoutList
      // },
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
