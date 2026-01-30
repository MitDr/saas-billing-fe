import { Routes } from '@angular/router';
import {HOME_ROUTES} from './pages/home/home.route';
import {PublicLayout} from './layout/public-layout/public-layout';
import {Home} from './pages/home/home';
import {Dashboard} from './pages/admin/dashboard/dashboard';
import {DashboardLayout} from './layout/admin/dashboard-layout/dashboard-layout';
import {DashboardAuthLayout} from './layout/auth/dashboard-auth-layout/dashboard-auth-layout';
import {AuthDashboard} from './pages/auth/auth-dashboard/auth-dashboard';
import {UserList} from './pages/admin/tables/user-list/user-list';

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
        component: UserList
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
