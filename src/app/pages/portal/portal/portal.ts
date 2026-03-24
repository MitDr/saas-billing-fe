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
import {NzAvatarComponent} from 'ng-zorro-antd/avatar';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzDescriptionsComponent, NzDescriptionsItemComponent} from 'ng-zorro-antd/descriptions';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {
  AuthFeatureReuseForm
} from '../../../shell/components/form/auth/auth-feature-reuse-form/auth-feature-reuse-form';
import {
  PortalSubscriberReuseForm
} from '../../../shell/components/form/portal/portal-subscriber-reuse-form/portal-subscriber-reuse-form';
import {NzImageModule} from 'ng-zorro-antd/image';

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
    NzAvatarComponent,
    NzCardComponent,
    NzDescriptionsComponent,
    NzDescriptionsItemComponent,
    NzEmptyComponent,
    NzButtonComponent,
    NzIconDirective,
    NzCardMetaComponent,
    NzTagComponent,
    PortalSubscriberCard,
    NzModalModule,
    AuthFeatureReuseForm,
    PortalSubscriberReuseForm,
    NzImageModule,
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
  isSubmitting = false;
  private fb = inject(NonNullableFormBuilder)
  subscriberForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  })
  private route = inject(ActivatedRoute);

  constructor() {
    this.loadSubscriptions();
    this.loadSubscriber();

    effect(() => {
      const currentSubscriber = this.subscriber();
      if (currentSubscriber) {
        this.subscriberForm.patchValue({
          name: currentSubscriber.name,
          email: currentSubscriber.email
        })
      }
    });
  }

  loadSubscriptions() {
    this.loading.set(true);
    this.portalService.getSubscription().subscribe({
      next: (response) => {
        this.subscriptions.set(response);
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

  onChangePaymentMethod($event: number) {
    this.loading.set(true);
    this.portalService.changePaymentMethod($event).subscribe({
      next: (response) => {
        this.loading.set(false);
        window.location.href = response;
      },
      error: (error) => {
        this.loading.set(false);
        console.error(error);
      }
    })
  }

  onEdit() {
    if (this.subscriberForm.valid) {
      this.loading.set(true);
      this.isSubmitting = true;
      const payload: PortalSubscriberRequest = {
        name: this.subscriberForm.value.name!,
        email: this.subscriberForm.value.email!
      }

      this.portalService.updateSubscriber(payload).subscribe({
        next: (response) => {
          this.isSubmitting = true;
          this.loading.set(false);
          this.subscriber.set(response);
          this.patchValue()
        },
        error: (err) => {
          this.loading.set(false);
          console.error(err);
        }
      });
    }
  }

  private patchValue() {
    const currentSubscriber = this.subscriber();
    if (currentSubscriber) {
      this.subscriberForm.patchValue({
        name: currentSubscriber.name,
        email: currentSubscriber.email
      })
    }
  }
}
