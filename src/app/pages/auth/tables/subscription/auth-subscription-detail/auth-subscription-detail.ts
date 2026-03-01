import {Component, effect, inject, signal} from '@angular/core';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SubscriptionCard} from '../../../../../shell/components/card/subscription/subscription-card/subscription-card';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscription} from '../../../../../core/interface/entity/auth/auth-subscription';
import {AuthSubscriptionService} from '../../../../../core/service/auth/auth-subscription-service';
import {
  AuthSubscriptionCard
} from '../../../../../shell/components/card/auth/auth-subscription-card/auth-subscription-card';

@Component({
  selector: 'app-auth-subscription-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    SubscriptionCard,
    AuthSubscriptionCard
  ],
  templateUrl: './auth-subscription-detail.html',
  styleUrl: './auth-subscription-detail.css',
})
export class AuthSubscriptionDetail {
  loading = signal(false);
  subscription = signal<AuthSubscription | null>(null);
  subscriptionService = inject(AuthSubscriptionService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadSubscription(+id)
      }
    });
  }

  loadSubscription(id: number) {
    this.loading.set(true);
    this.subscriptionService.getSubscription(id).subscribe({
      next: (response) => {
        this.subscription.set(response);
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
    this.subscriptionService.deleteSubscription(id).subscribe({
      next: (response) => {
        this.message.success('subscription deleted successfully');
        this.router.navigate(['/app/tables/subscriptions'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
