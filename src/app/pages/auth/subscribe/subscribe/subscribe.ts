import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {SubscribeService} from '../../../../core/service/auth/subscribe-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthSubscriberService} from '../../../../core/service/auth/auth-subscriber-service';
import {AuthPrice} from '../../../../core/interface/entity/auth/auth-price';
import {AuthSubscriber} from '../../../../core/interface/entity/auth/auth-subscriber';
import {AuthPriceService} from '../../../../core/service/auth/auth-price-service';
import {Breadcrumb} from '../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  SubscriptionReuseForm
} from '../../../../shell/components/form/admin/subscription-reuse-form/subscription-reuse-form';
import {SubscribeReuseForm} from '../../../../shell/components/form/auth/subscribe-reuse-form/subscribe-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzTabComponent, NzTabsComponent, NzTabsModule} from 'ng-zorro-antd/tabs';
import {AuthSubscriptionService} from '../../../../core/service/auth/auth-subscription-service';
import {AuthSubscription} from '../../../../core/interface/entity/auth/auth-subscription';
import {
  CancelSubscriptionReuseForm
} from '../../../../shell/components/form/auth/cancel-subscription-reuse-form/cancel-subscription-reuse-form';
import {
  RenewSubscriptionReuseForm
} from '../../../../shell/components/form/auth/renew-subscription-reuse-form/renew-subscription-reuse-form';
import {
  ReactivateSubscriptionReuseForm
} from '../../../../shell/components/form/auth/reactivate-subscription-reuse-form/reactivate-subscription-reuse-form';
import {CancelRequest} from '../../../../core/interface/request/auth/cancel-request';
import {SubscribeRequest} from '../../../../core/interface/request/auth/subscribe-request';
import {RenewRequest} from '../../../../core/interface/request/auth/renew-request';
import {ReactivateRequest} from '../../../../core/interface/request/auth/reactivate-request';

@Component({
  selector: 'app-subscribe',
  imports: [
    Breadcrumb,
    SubscriptionReuseForm,
    SubscribeReuseForm,
    NzModalModule,
    NzTabsComponent,
    NzTabComponent,
    NzTabsModule,
    CancelSubscriptionReuseForm,
    RenewSubscriptionReuseForm,
    ReactivateSubscriptionReuseForm
  ],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe implements OnInit {
  router = inject(Router);
  isSubmitting = false;
  subscribeService = inject(SubscribeService);
  message = inject(NzMessageService);
  availablePrice = signal<AuthPrice[]>([]);
  availableSubscriber = signal<AuthSubscriber[]>([]);
  availableSubscription = signal<AuthSubscription[]>([]);
  subscriberService = inject(AuthSubscriberService);
  priceService = inject(AuthPriceService);
  subscriptionService = inject(AuthSubscriptionService);
  private fb = inject(NonNullableFormBuilder)
  subscribeForm = this.fb.group({
    quantity: [null, [Validators.required]],
    numberOfCycle: [null, [Validators.required]],
    isTrial: [false],
    subscriberId: [null, Validators.required],
    priceId: [null, Validators.required],
    cancelAtPeriodEnd: [false],
    metadata: this.fb.array([])
  });
  cancelForm = this.fb.group({
    subscriberId: [null, Validators.required],
    subscriptionId: [null, Validators.required]
  });
  renewForm = this.fb.group({
    subscriberId: [null, Validators.required],
    subscriptionId: [null, Validators.required],
    quantity: [null, [Validators.required]]
  });
  reactivateForm = this.fb.group({
    subscriberId: [null, Validators.required],
    subscriptionId: [null, Validators.required],
    quantity: [null]
  });

  ngOnInit(): void {
    this.loadAllSubscriber();
    this.loadAllPrice();
    this.loadAllSubscription();
  }

  loadAllSubscriber() {
    this.subscriberService.getAllSubscribers().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscriber = response.content || []; // ListData<User> có content[]
        this.availableSubscriber.set(subscriber);
      },
      error: (err) => {
        console.error('Load subscriber failed:', err);
        this.message.error('Không tải được danh sách subscriber');
      }
    });
  }

  loadAllPrice() {
    this.priceService.getAllPrices().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const price = response.content || []; // ListData<User> có content[]
        this.availablePrice.set(price);
      },
      error: (err) => {
        console.error('Load price failed:', err);
        this.message.error('Không tải được danh sách price');
      }
    });
  }

  loadAllSubscription() {
    this.subscriptionService.getAllSubscriptions().subscribe({
      next: (response) => {
        const subscriptions = response.content || [];
        this.availableSubscription.set(subscriptions);
      },
      error: (err) => {
        console.error('Load subscription failed:', err);
        this.message.error('Không tải được danh sách subscription');
      }
    });
  }

  onCancelSubmitted() {
    console.log(this.cancelForm.value);
    if (this.cancelForm.valid) {
      this.isSubmitting = true;
      const payload: CancelRequest = {
        subscriberId: this.cancelForm.value.subscriberId!,
        subscriptionId: this.cancelForm.value.subscriptionId!
      }

      console.log(payload);
      this.subscribeService.cancel(payload).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.message.success('Cancel Successfully')
          this.cancelForm.reset();
        },
        error: err => {
          this.isSubmitting = false;
          console.error('Cancel Failed', err);
          this.message.error('Cancel Failed');
        }
      })
    }
  }

  onSubscribeSubmitted() {
    console.log(this.subscribeForm.value);
    if (this.subscribeForm.valid) {
      this.isSubmitting = true;

      const raw = this.subscribeForm.value;

      // Convert metadata array -> object
      const metadataObject: any = {};

      if (raw.metadata && raw.metadata.length > 0) {
        raw.metadata.forEach((item: any) => {
          if (item.key) {
            metadataObject[item.key] = item.value;
          }
        });
      }

      const payload: SubscribeRequest = {
        quantity: this.subscribeForm.value.quantity!,
        numberOfCycle: this.subscribeForm.value.numberOfCycle!,
        subscriberId: this.subscribeForm.value.subscriberId!,
        priceId: this.subscribeForm.value.priceId!,
        cancelAtPeriodEnd: this.subscribeForm.value.cancelAtPeriodEnd!,
        isTrial: this.subscribeForm.value.isTrial!
      }
      if (Object.keys(metadataObject).length === 0) {
        delete payload.metadata;
      }

      console.log(payload)

      this.subscribeService.subscribe(payload).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.message.success('Subscribe Successfully')
          this.subscribeForm.reset();
          console.log(value);
          //Redirect to payment gateway
        },
        error: err => {
          this.isSubmitting = false;
          console.error('Subscribe Failed', err);
          this.message.error('Subscribe Failed');
        }
      })
    }
  }

  onRenewSubmitted() {
    console.log(this.renewForm.value);
    if (this.renewForm.valid) {
      this.isSubmitting = true;

      const payload: RenewRequest = {
        subscriberId: this.renewForm.value.subscriberId!,
        subscriptionId: this.renewForm.value.subscriptionId!,
        quantity: this.renewForm.value.quantity!
      }

      console.log(payload)

      this.subscribeService.renew(payload).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.message.success('Renew Successfully')
          this.subscribeForm.reset();
        },
        error: err => {
          this.isSubmitting = false;
          console.error('Renew Failed', err);
          this.message.error('Renew Failed');
        }
      })
    }
  }

  onReactivateSubmitted() {
    console.log(this.reactivateForm.value);
    if (this.reactivateForm.valid) {
      this.isSubmitting = true;
      const payload: ReactivateRequest = {
        subscriberId: this.reactivateForm.value.subscriberId!,
        subscriptionId: this.reactivateForm.value.subscriptionId!,
      }
      if (this.reactivateForm.value.quantity) {
        const quantity = this.reactivateForm.value.quantity as number;
        Object.assign(payload, quantity);
      }

      console.log(payload);

      this.subscribeService.reactivate(payload).subscribe({
        next: value => {
          this.isSubmitting = false;
          this.message.success('Reactivate Successfully')
          this.subscribeForm.reset();
        },
        error: err => {
          this.isSubmitting = false;
          console.error('Reactivate Failed', err);
          this.message.error('Reactivate Failed');
        }
      })
    }
  }

}
