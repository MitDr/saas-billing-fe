import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscriptionCard} from '../../../shell/components/card/auth/auth-subscription-card/auth-subscription-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  PortalSubscriptionCard
} from '../../../shell/components/card/portal/portal-subscription-card/portal-subscription-card';
import {NzTabComponent, NzTabsComponent} from 'ng-zorro-antd/tabs';
import {PortalSubscription} from '../../../core/interface/portal/portal-subscription';
import {PortalSubscriber} from '../../../core/interface/portal/portal-subscriber';
import {
  PortalSubscriberCard
} from '../../../shell/components/card/portal/portal-subscriber-card/portal-subscriber-card';
import {PortalService} from '../../../core/service/portal/portal-service';
import {PortalSubscriberRequest} from '../../../core/interface/request/portal/portal-subscriber-request';
import {NzModalModule} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-portal',
  imports: [
    AuthSubscriptionCard,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PortalSubscriptionCard,
    NzTabComponent,
    NzTabsComponent,
    PortalSubscriberCard,
    NzModalModule
  ],
  templateUrl: './portal.html',
  styleUrl: './portal.css',
})
export class Portal {
  loading = signal(false);
  subscriptions = signal<PortalSubscription[] | []>([]);
  subscriber = signal<PortalSubscriber | null>(null)
  portalService = inject(PortalService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      this.loadSubscriptions();
      this.loadSubscriber();
    });
  }

  loadSubscriptions() {
    this.loading.set(true);
    this.portalService.getSubscription().subscribe({
      next: (response) => {
        this.subscriptions.set(response.content || []);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  loadSubscriber() {
    this.loading.set(true);
    this.portalService.getSubscriber().subscribe({
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

  onEdit(request: PortalSubscriberRequest) {
    this.loading.set(true);
    this.portalService.updateSubscriber(request).subscribe({
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
}
