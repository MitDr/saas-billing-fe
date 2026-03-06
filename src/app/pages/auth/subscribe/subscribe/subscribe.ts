import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {SubscribeService} from '../../../../core/service/auth/subscribe-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Price} from '../../../../core/interface/entity/price';
import {Subscriber} from '../../../../core/interface/entity/subscriber';
import {AuthSubscriberService} from '../../../../core/service/auth/auth-subscriber-service';
import {AuthPrice} from '../../../../core/interface/entity/auth/auth-price';
import {AuthSubscriber} from '../../../../core/interface/entity/auth/auth-subscriber';
import {AuthPriceService} from '../../../../core/service/auth/auth-price-service';
import {Breadcrumb} from '../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  SubscriptionReuseForm
} from '../../../../shell/components/form/admin/subscription-reuse-form/subscription-reuse-form';
import {SUBSCRIPTION_ROUTE_CONSTANT} from '../../../../core/constant/subscription/subscription-list-constant';
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
export class Subscribe implements OnInit{
  router = inject(Router);
  isSubmitting = false;
  subscribeService = inject(SubscribeService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  availablePrice = signal<AuthPrice[]>([]);
  availableSubscriber = signal<AuthSubscriber[]>([]);
  availableSubscription = signal<AuthSubscription[]>([]);
  subscriberService = inject(AuthSubscriberService);
  priceService = inject(AuthPriceService);
  subscriptionService = inject(AuthSubscriptionService);

  subscribeForm = this.fb.group({
    quantity: [null, [Validators.required]],
    numberOfCycle: [null, [Validators.required]],
    isTrial: [false],
    subscriberId: [null,Validators.required],
    priceId: [null,Validators.required],
    cancelAtPeriodEnd: [false],
    metadata: this.fb.array([])
  });
  cancelForm = this.fb.group({
    subscriberId: [null,Validators.required],
    subscriptionId: [null, Validators.required]
  });
  renewForm = this.fb.group({
    subscriberId: [null,Validators.required],
    subscriptionId: [null, Validators.required],
    quantity: [null, [Validators.required]]
  });
  reactivateForm = this.fb.group({
    subscriberId: [null,Validators.required],
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
    this.subscriptionService.getAllSubscriptions().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const subscriptions = response.content || []; // ListData<User> có content[]
        this.availableSubscription.set(subscriptions);
      },
      error: (err) => {
        console.error('Load subscription failed:', err);
        this.message.error('Không tải được danh sách subscription');
      }
    });
  }
  onSubmitted() {

  }

}
