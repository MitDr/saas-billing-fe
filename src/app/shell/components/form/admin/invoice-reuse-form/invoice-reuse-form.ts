import {Component, effect, inject, input, output, signal} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Subscription} from '../../../../../core/interface/entity/subscription';
import {Subscriber} from '../../../../../core/interface/entity/subscriber';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-invoice-reuse-form',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzDatePickerComponent,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzInputDirective,
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzModalComponent,
    NzModalContentDirective,
    NgForOf
  ],
  templateUrl: './invoice-reuse-form.html',
  styleUrl: './invoice-reuse-form.css',
})
export class InvoiceReuseForm {
  currencyOption: OptionInterface[] = [
    {label: 'USD', value: 'USD'},
    {label: 'VND', value: 'VND'},
  ];

  statusOption: OptionInterface[] = [
    {label: 'Paid', value: 'PAID'},
    {label: 'Draft', value: 'DRAFT'},
    {label: 'Unpaid', value: 'UNPAID'},
    {label: 'Void', value: 'VOID'}
  ]

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Entitlement');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();

  availableSubscription = input<Subscription[]>([]);
  selectedSubscription = signal<Subscription | null>(null);
  initSubscription = input<Subscription | null>();

  availableSubscriber = input<Subscriber[]>([]);
  selectedSubscriber = signal<Subscriber | null>(null);
  initSubscriber = input<Subscriber | null>();

  isTenantModalOpen = signal(false);
  isSubscriptionModalOpen = signal(false);
  isSubscriberModalOpen = signal(false);
  private message = inject(NzMessageService);


  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedSubscriber.set(this.initSubscriber() || null);
      this.selectedSubscription.set(this.initSubscription() || null);
    });
  }

  get currency() {
    return this.formGroup()?.get('currency');
  }

  get amount() {
    return this.formGroup()?.get('amount');
  }

  get status() {
    return this.formGroup()?.get('status');
  }

  get paidDate() {
    return this.formGroup()?.get('paidDate');
  }

  get billingPeriodStart() {
    return this.formGroup()?.get('billingPeriodStart');
  }

  get billingPeriodEnd() {
    return this.formGroup()?.get('billingPeriodEnd');
  }

  get amountUsd() {
    return this.formGroup()?.get('amountUsd');
  }

  get exchangeRate() {
    return this.formGroup()?.get('exchangeRate');
  }

  get subscriberId() {
    return this.formGroup()?.get('subscriberId');
  }

  get tenantId() {
    return this.formGroup()?.get('tenantId');
  }

  get subscriptionId() {
    return this.formGroup()?.get('subscriptionId');
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

  openTenantModal() {
    this.isTenantModalOpen.set(true);
  }

  selectTenant(tenant: Tenant) {
    this.selectedTenant.set(tenant);
    this.tenantId?.setValue(tenant.id);
    this.isTenantModalOpen.set(false);
  }

  clearTenant() {
    this.selectedTenant.set(null);
    this.tenantId?.setValue(null);
  }

  openSubscriptionModal() {
    this.isSubscriptionModalOpen.set(true);
  }

  selectSubscription(subscription: Subscription) {
    this.selectedSubscription.set(subscription);
    this.subscriptionId?.setValue(subscription.id);
    this.isSubscriptionModalOpen.set(false);
  }

  clearSubscription() {
    this.selectedSubscription.set(null);
    this.subscriptionId?.setValue(null);
  }

  openSubscriberModal() {
    this.isSubscriberModalOpen.set(true);
  }

  selectSubscriber(subscriber: Subscriber) {
    this.selectedSubscriber.set(subscriber);
    this.subscriberId?.setValue(subscriber.id);
    this.isSubscriberModalOpen.set(false);
  }

  clearSubscriber() {
    this.selectedSubscriber.set(null);
    this.subscriberId?.setValue(null);
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

  getSubscriptionDescription(sub: Subscription): string {
    return `
    ${sub.status} • Trial: ${sub.trial}
    Start Date: ${sub.startDate}
    End Date: ${sub.endDate}
    Subscriber: ${sub.subscriber?.name}
    Tenant: ${sub.tenant?.name}
  `;
  }

  getSubscriberDescription(sub: Subscriber): string {
    return `
    ${sub.name} • Email: ${sub.email}
    Tenant: ${sub.tenant?.name}
  `;
  }
}
