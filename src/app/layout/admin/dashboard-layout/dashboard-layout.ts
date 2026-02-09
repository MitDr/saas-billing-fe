import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../../../shell/components/layout/sidebar/sidebar';
import {DashboardHeader} from '../../../shell/components/layout/dashboard-header/dashboard-header';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {ADMIN_SIDEBAR_MENU} from '../../../core/constant/dashboard.sidebar.menu';
import {AuthService} from '../../../core/service/auth-service';

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
  auth = inject(AuthService);

  isCollapsed = false;
  protected readonly ADMIN_SIDEBAR_MENU = ADMIN_SIDEBAR_MENU;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        // không cần làm gì thêm
      }
    });
  }
}
