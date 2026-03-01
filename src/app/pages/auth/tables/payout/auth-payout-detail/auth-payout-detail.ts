import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPayout} from '../../../../../core/interface/entity/auth/auth-payout';
import {AuthPayoutService} from '../../../../../core/service/auth/auth-payout-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PayoutCard} from '../../../../../shell/components/card/payout/payout-card/payout-card';
import {AuthPayoutCard} from '../../../../../shell/components/card/auth/auth-payout-card/auth-payout-card';

@Component({
  selector: 'app-auth-payout-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PayoutCard,
    RouterLink,
    AuthPayoutCard
  ],
  templateUrl: './auth-payout-detail.html',
  styleUrl: './auth-payout-detail.css',
})
export class AuthPayoutDetail {
  loading = signal(false);
  payout = signal<AuthPayout | null>(null);
  payoutService = inject(AuthPayoutService);
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
        this.router.navigate(['/app/tables/payouts'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
