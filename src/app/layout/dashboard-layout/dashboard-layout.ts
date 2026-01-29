import {Component, input} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Dashboard} from '../../pages/dashboard/dashboard';
import {Sidebar} from '../../shell/components/sidebar/sidebar';
import {DashboardHeader} from '../../shell/components/dashboard-header/dashboard-header';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    Dashboard,
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
}
