import {Component, effect, inject, input, output, signal} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {
  FormArray,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Invoice} from '../../../../../core/interface/entity/invoice';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NgForOf} from '@angular/common';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-payment-reuse-form',
  imports: [
    FormsModule,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzDatePickerComponent,
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NgForOf,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './payment-reuse-form.html',
  styleUrl: './payment-reuse-form.css',
})
export class PaymentReuseForm {
  currencyOption: OptionInterface[] = [
    {label: 'USD', value: 'USD'},
    {label: 'VND', value: 'VND'},
  ];

  statusOption: OptionInterface[] = [
    {label: 'Pending', value: 'PENDING'},
    {label: 'Available', value: 'AVAILABLE'},
    {label: 'Refunded', value: 'REFUNDED'},
  ];

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Entitlement');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();

  availableInvoice = input<Invoice[]>([]);
  selectedInvoice = signal<Invoice | null>(null);
  initInvoice = input<Invoice | null>();

  isTenantModalOpen = signal(false);
  isInvoiceModalOpen = signal(false);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedInvoice.set(this.initInvoice() || null);
    });
  }

  get amount() {
    return this.formGroup()?.get('amount');
  }

  get currency() {
    return this.formGroup()?.get('currency');
  }

  get status() {
    return this.formGroup()?.get('status');
  }

  get paymentIntentId() {
    return this.formGroup()?.get('paymentIntentId');
  }

  get chargeId() {
    return this.formGroup()?.get('chargeId');
  }

  get balanceTransactionId() {
    return this.formGroup()?.get('balanceTransactionId');
  }

  get paymentMethod() {
    return this.formGroup()?.get('paymentMethod');
  }

  get available_on() {
    return this.formGroup()?.get('available_on');
  }

  get invoiceId() {
    return this.formGroup()?.get('invoiceId');
  }

  get tenantId() {
    return this.formGroup()?.get('tenantId');
  }

  get metaData() {
    return this.formGroup()?.get('metaData');
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

  selectInvoice(invoice: Invoice) {
    this.selectedInvoice.set(invoice);
    this.invoiceId?.setValue(invoice.id);
    this.isInvoiceModalOpen.set(false);
  }

  clearInvoice() {
    this.selectedInvoice.set(null);
    this.invoiceId?.setValue(null);
  }

  openInvoiceModal() {
    this.isInvoiceModalOpen.set(true);
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

  getInvoiceDescription(inv: Invoice): string {
    return `
    ${inv.invoiceNumber}
    Subscription: ${inv.subscription?.id}
    Subscriber: ${inv.subscriber?.name} - ${inv.subscriber?.email}
    Tenant: ${inv.tenant?.name}
  `;
  }
}
