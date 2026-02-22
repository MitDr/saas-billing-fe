import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {SubscriptionService} from '../../../../../core/service/subscription-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {SubscriptionCard} from '../../../../../shell/components/card/subscription/subscription-card/subscription-card';

@Component({
  selector: 'app-subscription-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    SubscriptionCard
  ],
  templateUrl: './subscription-detail.html',
  styleUrl: './subscription-detail.css',
})
export class SubscriptionDetail {
  loading = signal(false);
  subscription = signal<Subscription | null>(null);
  subscriptionService = inject(SubscriptionService);
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
        this.router.navigate(['/admin/tables/subscriptions'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
