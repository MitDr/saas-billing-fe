import {Component, input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Dashboard} from '../../../pages/admin/dashboard/dashboard';
import {Sidebar} from '../../../shell/components/layout/sidebar/sidebar';
import {DashboardHeader} from '../../../shell/components/layout/dashboard-header/dashboard-header';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {ADMIN_SIDEBAR_MENU} from '../../../core/constant/dashboard.sidebar.menu';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    Sidebar,
    DashboardHeader,
    NzLayoutComponent,
    NzContentComponent
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  protected readonly ADMIN_SIDEBAR_MENU = ADMIN_SIDEBAR_MENU;
}
