import {Component, effect, inject, signal} from '@angular/core';
import {AuthSubscriptionService} from '../../../core/service/auth/auth-subscription-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscription} from '../../../core/interface/entity/auth/auth-subscription';
import {AuthSubscriptionCard} from '../../../shell/components/card/auth/auth-subscription-card/auth-subscription-card';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {
  PortalSubscriptionCard
} from '../../../shell/components/card/portal/portal-subscription-card/portal-subscription-card';
import {NzTabComponent, NzTabsComponent} from 'ng-zorro-antd/tabs';

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
    NzTabsComponent
  ],
  templateUrl: './portal.html',
  styleUrl: './portal.css',
})
export class Portal {
  loading = signal(false);
  subscription = signal<AuthSubscription[] | []>([]);

  // portalService = inject(PortalService);
  router = inject(Router);
  message = inject(NzMessageService)
  private route = inject(ActivatedRoute);

  // constructor() {
  //   effect(() => {
  //     this.loadSubscriptions()
  //   }
  // }
  loadSubscriptions() {
    // this.loading.set(true);
    // this.subscriptionService.getSubscription(id).subscribe({
    //   next: (response) => {
    //     this.subscription.set(response);
    //     this.loading.set(false);
    //   },
    //   error: (err) => {
    //     this.loading.set(false);
    //     console.error(err);
    //   }
    // });
  }
}
