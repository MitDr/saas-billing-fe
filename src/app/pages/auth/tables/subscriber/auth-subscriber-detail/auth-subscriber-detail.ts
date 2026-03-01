import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {AuthSubscriberService} from '../../../../../core/service/auth/auth-subscriber-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {SubscriberCard} from '../../../../../shell/components/card/subscriber/subscriber-card/subscriber-card';
import {AuthSubscriberCard} from '../../../../../shell/components/card/auth/auth-subscriber-card/auth-subscriber-card';

@Component({
  selector: 'app-auth-subscriber-detail',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    SubscriberCard,
    AuthSubscriberCard
  ],
  templateUrl: './auth-subscriber-detail.html',
  styleUrl: './auth-subscriber-detail.css',
})
export class AuthSubscriberDetail {
  loading = signal(false);
  subscriber = signal<AuthSubscriber | null>(null);
  subscriberService = inject(AuthSubscriberService);
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
        this.router.navigate(['/app/tables/subscribers'])
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    })
  }
}
