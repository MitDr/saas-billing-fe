import { Routes } from '@angular/router';
import {HOME_ROUTES} from './pages/home/home.route';
import {PublicLayout} from './layout/public-layout/public-layout';
import {Home} from './pages/home/home';
import {Dashboard} from './pages/dashboard/dashboard';
import {DashboardLayout} from './layout/dashboard-layout/dashboard-layout';

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
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: Dashboard
      }
    ]
  },
];
