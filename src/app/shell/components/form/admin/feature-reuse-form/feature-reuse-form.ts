import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-feature-reuse-form',
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
    NzModalContentDirective,
    NzTagComponent,
    NzCheckboxComponent
  ],
  templateUrl: './feature-reuse-form.html',
  styleUrl: './feature-reuse-form.css',
})
export class FeatureReuseForm {
  options: OptionInterface[] = [
    {value: 'ACTIVE', label: 'Active'},
    {value: 'INACTIVE', label: 'Inactive'},
  ];

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Feature');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();
  availablePlans = input<Plan[]>([]);
  selectedPlans = signal<Plan[]>([]);
  initPlan = input<Plan[] | null>();

  isTenantModalOpen = signal(false);
  isEntitlementModalOpen = signal(false);
  isPlansModalOpen = signal(false);
  private message = inject(NzMessageService);


  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedPlans.set(this.initPlan() || []);
    });
  }

  get code() {
    return this.formGroup()?.get('code');
  }

  get name() {
    return this.formGroup().get('name');
  }

  get status() {
    return this.formGroup().get('status');
  }

  get description() {
    return this.formGroup().get('description');
  }

  get plans() {
    return this.formGroup().get('plans');
  }

  get tenantId() {
    return this.formGroup().get('tenantId');
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

  openPlansModal() {
    this.isPlansModalOpen.set(true);
  }

  isPlansSelected(planId: number): boolean {
    return this.selectedPlans().some(u => u.id === planId);
  }

  togglePlan(plan: Plan) {
    const current = this.selectedPlans();
    if (current.some(p => p.id === plan.id)) {
      this.selectedPlans.set(current.filter(p => p.id !== plan.id));
    } else {
      this.selectedPlans.set([...current, plan]);
    }
    // Sync IDs vào form control
    this.plans?.setValue(this.selectedPlans().map(p => p.id));
  }

  removeSelectedPlan(planID: number) {
    this.selectedPlans.set(this.selectedPlans().filter(p => p.id !== planID));
    this.plans?.setValue(this.selectedPlans().map(p => p.id));
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
