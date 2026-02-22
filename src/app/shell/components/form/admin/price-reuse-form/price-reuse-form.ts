import {Component, effect, inject, input, output, signal} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {FormGroup, NonNullableFormBuilder} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-price-reuse-form',
  imports: [],
  templateUrl: './price-reuse-form.html',
  styleUrl: './price-reuse-form.css',
})
export class PriceReuseForm {

  currencyOption: OptionInterface[] = [
    {label: 'USD', value: 'USD'},
    {label: 'VND', value: 'VND'},
  ];

  schemeOption: OptionInterface[] = [
    {label: 'Flat-rate', value: 'FLAT_RATE'},
    {label: 'Per-unit', value: 'PER_UNIT'},
  ];

  statusOption: OptionInterface[] = [
    {label: 'Active', value: 'ACTIVE'},
    {label: 'Deactivated', value: 'DEACTIVATED'},
    {label: 'Cancel', value: 'CANCEL'}
  ]
  
  cycleOption: OptionInterface[] = [
    {label: 'Month', value: 'MONTH'},
    {label: 'Day', value: 'DAY'},
    {label: 'Week', value: 'WEEK'},
    {label: 'Year', value: 'YEAR'}
  ]

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Price');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  fb = inject(NonNullableFormBuilder);

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();

  availablePlans = input<Plan[]>([]);
  selectedPlans = signal<Plan | null>(null);
  initPlan = input<Plan | null>();

  isTenantModalOpen = signal(false);
  isPlansModalOpen = signal(false);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedPlans.set(this.initPlan() || null);
    });
  }

  get price() {
    return this.formGroup().get('price')
  }

  get currency() {
    return this.formGroup().get('currency')
  }

  get scheme() {
    return this.formGroup().get('scheme')
  }

  get cycle() {
    return this.formGroup().get('cycle')
  }

  get status() {
    return this.formGroup().get('status')
  }

  get cycleCount() {
    return this.formGroup().get('cycleCount')
  }

  get maxUnit() {
    return this.formGroup().get('maxUnit')
  }

  get trialPeriod() {
    return this.formGroup().get('trialPeriod')
  }

  get trialCycle() {
    return this.formGroup().get('trialCycle')
  }

  get dueDelay() {
    return this.formGroup().get('dueDelay')
  }

  get planId() {
    return this.formGroup().get('planId')
  }

  get tenantId() {
    return this.formGroup().get('tenantId')
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

  openPlanModal() {
    this.isPlansModalOpen.set(true);
  }

  selectPlan(plan: Plan) {
    this.selectedPlans.set(plan);
    this.planId?.setValue(plan.id);
    this.isPlansModalOpen.set(false);
  }

  clearPlan() {
    this.selectedPlans.set(null);
    this.planId?.setValue(null);
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
