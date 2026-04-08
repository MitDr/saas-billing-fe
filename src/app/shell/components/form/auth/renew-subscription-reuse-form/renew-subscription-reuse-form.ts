import {Component, inject, input, output, signal} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {AuthSubscription} from '../../../../../core/interface/entity/auth/auth-subscription';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {AuthSubscriptionService} from '../../../../../core/service/auth/auth-subscription-service';

@Component({
  selector: 'app-renew-subscription-reuse-form',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzButtonComponent,
    NzIconDirective,
    NzModalComponent,
    NzInputDirective,
    NzRowDirective,
    NzModalContentDirective
  ],
  templateUrl: './renew-subscription-reuse-form.html',
  styleUrl: './renew-subscription-reuse-form.css',
})
export class RenewSubscriptionReuseForm {
  formGroup = input.required<FormGroup>();
  isLoading = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);
  availableSubscriber = input<AuthSubscriber[]>([]);
  selectedSubscriber = signal<AuthSubscriber | null>(null);
  availableSubscription = signal<AuthSubscription[]>([]);
  selectedSubscription = signal<AuthSubscription | null>(null);
  isSubscriptionModalOpen = signal(false);
  isSubscriberModalOpen = signal(false);
  subscriptionService = inject(AuthSubscriptionService);
  private message = inject(NzMessageService);

  get subscriberId() {
    return this.formGroup()?.get('subscriberId');
  }

  get subscriptionId() {
    return this.formGroup()?.get('subscriptionId');
  }

  get quantity() {
    return this.formGroup()?.get('quantity');
  }

  onSubmit(): void {
    const form = this.formGroup();
    if (form?.valid) {
      this.submitted.emit();
    } else {
      Object.values(form?.controls || {}).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      this.message.warning('Please double-check the information!');
    }
  }

  openSubscriberModal() {
    this.isSubscriberModalOpen.set(true);
  }

  selectSubscriber(subscriber: AuthSubscriber) {
    this.selectedSubscriber.set(subscriber);
    this.subscriberId?.setValue(subscriber.id);
    this.isSubscriberModalOpen.set(false);

    // Reset subscription cũ
    this.selectedSubscription.set(null);
    this.subscriptionId?.setValue(null);
    this.availableSubscription.set([]);

    // Call API lấy subscription cancelable của subscriber
    this.loadRenewableSubscriptions(subscriber.id);
  }

  loadRenewableSubscriptions(subscriberId: number) {
    this.subscriptionService.getAllRenewableSubscription(subscriberId).subscribe({
      next: (response) => {
        const subscriptions = response.content || []
        this.availableSubscription.set(subscriptions);
        if (subscriptions.length === 0) {
          this.message.info('This subscriber does not have any subscriptions renew');
        }
      },
      error: (err) => {
        console.error('Load renewable subscriptions failed:', err);
        this.message.error('Cannot load subscription');
      }
    });
  }

  clearSubscriber() {
    this.selectedSubscriber.set(null);
    this.subscriberId?.setValue(null);
    this.availableSubscription.set([]);
    this.selectedSubscription.set(null);
    this.subscriptionId?.setValue(null);
  }

  openSubscriptionModal() {
    this.isSubscriptionModalOpen.set(true);
  }

  selectSubscription(subscription: AuthSubscription) {
    this.selectedSubscription.set(subscription);
    this.subscriptionId?.setValue(subscription.id);
    this.isSubscriptionModalOpen.set(false);
  }

  clearSubscription() {
    this.selectedSubscription.set(null);
    this.subscriptionId?.setValue(null);
  }

  getSubscriptionDescription(sub: AuthSubscription): string {
    return `
    ${sub.status} • Trial: ${sub.trial}
    Start Date: ${sub.startDate}
    End Date: ${sub.endDate}
    Subscriber: ${sub.subscriber?.name}
    PriceId: ${sub.price.id}
  `;
  }
}
