import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {User} from '../../../../../core/interface/user';
import {FAKE_USERS} from '../../user/user-list/user-list';
import {FAKE_TENANTS} from '../tenant-list/tenant-list';
import {Tenant} from '../../../../../core/interface/tenant';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {UserCard} from '../../../../../shell/components/card/user/user-card/user-card';
import {TenantCard} from '../../../../../shell/components/card/tenant/tenant-card/tenant-card';

@Component({
  selector: 'app-tenant-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    UserCard,
    TenantCard
  ],
  templateUrl: './tenant-detail.html',
  styleUrl: './tenant-detail.css',
})
export class TenantDetail {
  private route = inject(ActivatedRoute);

  tenant = signal<Tenant | null>(null);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        const found = FAKE_TENANTS.find(u => u.id === +id);
        this.tenant.set(found || null);
      }
    });
  }
}
