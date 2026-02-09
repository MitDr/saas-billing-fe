import {Component, inject} from '@angular/core';
import {DashboardHeader} from '../../../shell/components/layout/dashboard-header/dashboard-header';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {RouterModule, RouterOutlet} from '@angular/router';
import {Sidebar} from '../../../shell/components/layout/sidebar/sidebar';
import {APP_MENU} from '../../../core/constant/dashboard.sidebar.menu';
import {AuthService} from '../../../core/service/auth-service';

@Component({
  selector: 'app-dashboard-auth-layout',
  imports: [
    RouterModule,
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
  auth = inject(AuthService);
  protected readonly APP_MENU = APP_MENU;

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
