import {Component, effect, inject, signal} from '@angular/core';
import {AuthTenantService} from '../../../../core/service/auth/auth-tenant-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthTenant} from '../../../../core/interface/entity/auth/auth-tenant';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {TenantCard} from '../../../../shell/components/card/tenant/tenant-card/tenant-card';
import {AuthTenantCard} from '../../../../shell/components/card/auth/auth-tenant-card/auth-tenant-card';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-tenant-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    TenantCard,
    AuthTenantCard,
    NzModalModule
  ],
  templateUrl: './auth-tenant-detail.html',
  styleUrl: './auth-tenant-detail.css',
})
export class AuthTenantDetail {
  loading = signal(false);
  tenant = signal<AuthTenant | null>(null);
  tenantService = inject(AuthTenantService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.loadTenant()
    });
  }

  loadTenant() {
    this.loading.set(true);
    this.tenantService.getTenant().subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onRefreshToken() {
    this.loading.set(true);
    this.tenantService.refreshAPIKey().subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.message.success('New API Key is appointed');
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}
