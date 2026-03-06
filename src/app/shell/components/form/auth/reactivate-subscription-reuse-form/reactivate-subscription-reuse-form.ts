import {Component, inject, input, output, signal} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {AuthSubscription} from '../../../../../core/interface/entity/auth/auth-subscription';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-reactivate-subscription-reuse-form',
  imports: [
    NzFormItemComponent,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    NzCardComponent,
    NzCardMetaComponent,
    NzButtonComponent,
    NzIconDirective,
    NzInputDirective,
    NzRowDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzFormDirective
  ],
  templateUrl: './reactivate-subscription-reuse-form.html',
  styleUrl: './reactivate-subscription-reuse-form.css',
})
export class ReactivateSubscriptionReuseForm {
  formGroup = input.required<FormGroup>();
  isLoading = input<boolean>(false);
  submitted = output<void>();
  private message = inject(NzMessageService);
  fb = inject(NonNullableFormBuilder);

  availableSubscriber = input<AuthSubscriber[]>([]);
  selectedSubscriber = signal<AuthSubscriber | null>(null);

  availableSubscription = input<AuthSubscription[]>([]);
  selectedSubscription = signal<AuthSubscription | null>(null);

  isSubscriptionModalOpen = signal(false);
  isSubscriberModalOpen = signal(false);

  get subscriberId(){
    return this.formGroup()?.get('subscriberId');
  }

  get subscriptionId(){
    return this.formGroup()?.get('subscriptionId');
  }
  get quantity(){
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
      this.message.warning('Vui lòng kiểm tra lại thông tin!');
    }
  }

  openSubscriberModal() {
    this.isSubscriberModalOpen.set(true);
  }

  selectSubscriber(subscriber: AuthSubscriber) {
    this.selectedSubscriber.set(subscriber);
    this.subscriberId?.setValue(subscriber.id);
    this.isSubscriberModalOpen.set(false);
  }

  clearSubscriber() {
    this.selectedSubscriber.set(null);
    this.subscriberId?.setValue(null);
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
