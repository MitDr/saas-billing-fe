import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {TenantCard} from '../../../../../shell/components/card/tenant/tenant-card/tenant-card';
import {TenantService} from '../../../../../core/service/tenant-service';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';

@Component({
  selector: 'app-tenant-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    TenantCard,
    FeatureCard
  ],
  templateUrl: './tenant-detail.html',
  styleUrl: './tenant-detail.css',
})
export class TenantDetail {
  loading = signal(false);
  tenant = signal<Tenant | null>(null);
  tenantService = inject(TenantService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadTenant(+id)
      }
    });
  }

  loadTenant(id: number) {
    this.loading.set(true);
    this.tenantService.getTenant(id).subscribe({
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

  onRefreshToken(id: number) {
    this.loading.set(true);
    this.tenantService.refreshAPIKey(id).subscribe({
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

  onDelete(id: number) {
    this.loading.set(true);
    this.tenantService.deleteTenant(id).subscribe({
      next: (response) => {
        this.message.success('User deleted successfully');
        this.router.navigate(['/admin/tables/tenants'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
