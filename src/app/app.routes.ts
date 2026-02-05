import { Routes } from '@angular/router';
import {HOME_ROUTES} from './pages/home/home.route';
import {PublicLayout} from './layout/public-layout/public-layout';
import {Home} from './pages/home/home';
import {Dashboard} from './pages/admin/dashboard/dashboard';
import {DashboardLayout} from './layout/admin/dashboard-layout/dashboard-layout';
import {DashboardAuthLayout} from './layout/auth/dashboard-auth-layout/dashboard-auth-layout';
import {AuthDashboard} from './pages/auth/auth-dashboard/auth-dashboard';
import {UserList} from './pages/admin/tables/user/user-list/user-list';
import {UserForm} from './pages/admin/tables/user/user-form/user-form';
import {UserCreate} from './pages/admin/tables/user/user-create/user-create';
import {UserDetail} from './pages/admin/tables/user/user-detail/user-detail';
import {TenantList} from './pages/admin/tables/tenant/tenant-list/tenant-list';
import {TenantDetail} from './pages/admin/tables/tenant/tenant-detail/tenant-detail';

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
    path: 'admin',
    component: DashboardLayout,
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
        path: 'tables/tenants',
        component: TenantList,
      },
      // {
      //   path: 'tables/tenants/create',
      //   component: UserCreate
      // },
      {
        path: 'tables/tenants/:id',
        component: TenantDetail,
      }
    ]
  },
  {
    path: 'app',
    component: DashboardAuthLayout,
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
