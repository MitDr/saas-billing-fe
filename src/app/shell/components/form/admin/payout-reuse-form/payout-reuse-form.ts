import {Component, effect, inject, input, output, signal} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-payout-reuse-form',
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
    NzOptionComponent,
    NzSelectComponent,
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './payout-reuse-form.html',
  styleUrl: './payout-reuse-form.css',
})
export class PayoutReuseForm {
  statusOption: OptionInterface[] = [
    {label: 'Success', value: 'SUCCESS'},
    {label: 'Requested', value: 'REQUESTED'},
    {label: 'Processing', value: 'PROCESSING'},
    {label: 'Failed', value: 'FAILED'}
  ]

  currencyOption: OptionInterface[] = [
    {label: 'USD', value: 'USD'},
  ];

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Payout');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();

  isTenantModalOpen = signal(false);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
    });
  }

  get amount() {
    return this.formGroup()?.get('amount')
  }

  get currency() {
    return this.formGroup()?.get('currency')
  }

  get status() {
    return this.formGroup()?.get('status')
  }

  get stripeTransferId() {
    return this.formGroup()?.get('stripeTransferId')
  }

  get stripePayoutId() {
    return this.formGroup()?.get('stripePayoutId')
  }

  get stripeBalanceTransactionId() {
    return this.formGroup()?.get('stripeBalanceTransactionId')
  }

  get tenantId() {
    return this.formGroup()?.get('tenantId')
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
}
