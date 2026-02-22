import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {SubscriberService} from '../../../../../core/service/subscriber-service';
import {FeatureCard} from '../../../../../shell/components/card/feature/feature-card/feature-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {SubscriberCard} from '../../../../../shell/components/card/subscriber/subscriber-card/subscriber-card';

@Component({
  selector: 'app-subscriber-detail',
  imports: [
    FeatureCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    SubscriberCard
  ],
  templateUrl: './subscriber-detail.html',
  styleUrl: './subscriber-detail.css',
})
export class SubscriberDetail {
  loading = signal(false);
  subscriber = signal<Subscriber | null>(null);
  subscriberService = inject(SubscriberService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadSubscriber(+id)
      }
    });
  }

  loadSubscriber(id: number) {
    this.loading.set(true);
    this.subscriberService.getSubscriber(id).subscribe({
      next: (response) => {
        this.subscriber.set(response);
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
    this.subscriberService.deleteSubscriber(id).subscribe({
      next: (response) => {
        this.message.success('feature deleted successfully');
        this.router.navigate(['/admin/tables/subscribers'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
