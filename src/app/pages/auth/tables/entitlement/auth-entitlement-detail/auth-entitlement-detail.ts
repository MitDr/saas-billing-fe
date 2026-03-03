import {Component, effect, inject, signal} from '@angular/core';
import {Entitlement} from '../../../../../core/interface/entity/entitlement';
import {EntitlementService} from '../../../../../core/service/entitlement-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthEntitlement} from '../../../../../core/interface/entity/auth/auth-entitlement';
import {AuthEntitlementService} from '../../../../../core/service/auth/auth-entitlement-service';
import {EntitlementCard} from '../../../../../shell/components/card/entitlement/entitlement-card/entitlement-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  AuthEntitlementCard
} from '../../../../../shell/components/card/auth/auth-entitlement-card/auth-entitlement-card';

@Component({
  selector: 'app-auth-entitlement-detail',
  imports: [
    EntitlementCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    AuthEntitlementCard
  ],
  templateUrl: './auth-entitlement-detail.html',
  styleUrl: './auth-entitlement-detail.css',
})
export class AuthEntitlementDetail {
  loading = signal(false);
  entitlement = signal<AuthEntitlement | null>(null);
  entitlementService = inject(AuthEntitlementService);
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
        this.router.navigate(['/app/tables/entitlements'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
