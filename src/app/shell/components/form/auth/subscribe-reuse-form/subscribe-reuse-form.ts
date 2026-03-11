import {Component, inject, input, output, signal} from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {AuthSubscriber} from '../../../../../core/interface/entity/auth/auth-subscriber';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NgForOf} from '@angular/common';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';

@Component({
  selector: 'app-subscribe-reuse-form',
  imports: [
    FormsModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    NzCheckboxComponent,
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NgForOf,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './subscribe-reuse-form.html',
  styleUrl: './subscribe-reuse-form.css',
})
export class SubscribeReuseForm {
  formGroup = input.required<FormGroup>();
  isLoading = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);
  priceService = inject(AuthPriceService);
  availableSubscriber = input<AuthSubscriber[]>([]);
  selectedSubscriber = signal<AuthSubscriber | null>(null);
  availablePrice = signal<AuthPrice[]>([]);
  selectedPrice = signal<AuthPrice | null>(null);
  isPriceModalOpen = signal(false);
  isSubscriberModalOpen = signal(false);
  private message = inject(NzMessageService);

  get quantity() {
    return this.formGroup()?.get('quantity');
  }

  get numberOfCycle() {
    return this.formGroup()?.get('numberOfCycle');
  }

  get subscriberId() {
    return this.formGroup()?.get('subscriberId');
  }

  get priceId() {
    return this.formGroup()?.get('priceId');
  }

  get cancelAtPeriodEnd() {
    return this.formGroup()?.get('cancelAtPeriodEnd');
  }

  get isTrial() {
    return this.formGroup()?.get('isTrial');
  }

  get metadataList(): FormArray {
    return this.formGroup()?.get('metadata') as FormArray;
  }

  addMetadata() {
    const group = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.metadataList.push(group);
  }

  removeMetadata(index: number) {
    this.metadataList.removeAt(index);
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

    // Reset subscription cũ
    this.selectedPrice.set(null);
    this.priceId?.setValue(null);
    this.availablePrice.set([]);

    // Call API lấy subscription cancelable của subscriber
    this.loadNotSubscribedPrice(subscriber.id);
  }

  clearSubscriber() {
    this.selectedSubscriber.set(null);
    this.subscriberId?.setValue(null);
    this.availablePrice.set([]);
    this.selectedPrice.set(null);
    this.priceId?.setValue(null);
  }

  openPriceModal() {
    this.isPriceModalOpen.set(true);
  }

  selectPrice(price: AuthPrice) {
    this.selectedPrice.set(price);
    this.priceId?.setValue(price.id);
    this.isPriceModalOpen.set(false);
  }

  clearPrice() {
    this.selectedPrice.set(null);
    this.priceId?.setValue(null);
  }

  loadNotSubscribedPrice(subscriberId: number) {
    this.priceService.getNotSubscribed(subscriberId).subscribe({
      next: (response) => {
        const prices = response.content || []
        this.availablePrice.set(prices);
        if (prices.length === 0) {
          this.message.info('Subscriber này không có Price nào có thể subscribe');
        }
      },
      error: (err) => {
        console.error('Load Price failed:', err);
        this.message.error('Không tải được danh sách price');
      }
    })
  }

  getPriceDescription(pr: AuthPrice): string {
    return `
    ${pr.id}
    ${pr.price} ${pr.currency}
    Status: ${pr.status}
    Cycle: ${pr.cycle} - Count: ${pr.cycleCount}
    TrialCycle: ${pr.trialCycle} - Period: ${pr.trialPeriod}
  `;
  }
}
