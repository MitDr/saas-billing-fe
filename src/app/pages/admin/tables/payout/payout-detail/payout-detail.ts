import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Payout} from '../../../../../core/interface/entity/payout';
import {PayoutService} from '../../../../../core/service/payout-service';
import {EntitlementCard} from '../../../../../shell/components/card/entitlement/entitlement-card/entitlement-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PayoutCard} from '../../../../../shell/components/card/payout/payout-card/payout-card';

@Component({
  selector: 'app-payout-detail',
  imports: [
    EntitlementCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PayoutCard
  ],
  templateUrl: './payout-detail.html',
  styleUrl: './payout-detail.css',
})
export class PayoutDetail {
  loading = signal(false);
  payout = signal<Payout | null>(null);
  payoutService = inject(PayoutService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPayout(+id)
      }
    });
  }

  loadPayout(id: number) {
    this.loading.set(true);
    this.payoutService.getPayout(id).subscribe({
      next: (response) => {
        this.payout.set(response);
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
    this.payoutService.deletePayout(id).subscribe({
      next: (response) => {
        this.message.success('entitlement deleted successfully');
        this.router.navigate(['/admin/tables/payouts'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
