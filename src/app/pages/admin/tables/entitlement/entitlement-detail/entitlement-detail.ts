import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EntitlementService} from '../../../../../core/service/entitlement-service';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {TenantCard} from '../../../../../shell/components/card/tenant/tenant-card/tenant-card';
import {EntitlementCard} from '../../../../../shell/components/card/entitlement/entitlement-card/entitlement-card';

@Component({
  selector: 'app-entitlement-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    TenantCard,
    EntitlementCard
  ],
  templateUrl: './entitlement-detail.html',
  styleUrl: './entitlement-detail.css',
})
export class EntitlementDetail {
  loading = signal(false);
  entitlement = signal<Entitlement | null>(null);
  entitlementService = inject(EntitlementService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadEntitlement(+id)
      }
    });
  }

  loadEntitlement(id: number) {
    this.loading.set(true);
    this.entitlementService.getEntitlement(id).subscribe({
      next: (response) => {
        this.entitlement.set(response);
        this.loading.set(false);

      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }


  onDelete(id: number) {
    // console.log(id);
    this.loading.set(true);
    this.entitlementService.deleteEntitlement(id).subscribe({
      next: (response) => {
        this.message.success('entitlement deleted successfully');
        this.router.navigate(['/admin/tables/entitlements'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
