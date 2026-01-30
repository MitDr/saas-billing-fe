import { Component } from '@angular/core';
import {DashboardHeader} from '../../../shell/components/dashboard-header/dashboard-header';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../../../shell/components/sidebar/sidebar';
import {ADMIN_SIDEBAR_MENU, APP_MENU} from '../../../core/constant/dashboard.sidebar.menu';

@Component({
  selector: 'app-dashboard-auth-layout',
  imports: [
    DashboardHeader,
    NzContentComponent,
    NzLayoutComponent,
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './dashboard-auth-layout.html',
  styleUrl: './dashboard-auth-layout.css',
})
export class DashboardAuthLayout {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  protected readonly ADMIN_SIDEBAR_MENU = ADMIN_SIDEBAR_MENU;
  protected readonly APP_MENU = APP_MENU;
}
