import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Plan} from '../../../../../core/interface/entity/plan';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PlanService} from '../../../../../core/service/plan-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-plan-group-reuse-form',
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
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzIconDirective,
    NzTagComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzCheckboxComponent
  ],
  templateUrl: './plan-group-reuse-form.html',
  styleUrl: './plan-group-reuse-form.css',
})
export class PlanGroupReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Entitlement');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();

  availableTenants = input<Tenant[]>([]);
  selectedTenant = signal<Tenant | null>(null);
  initTenant = input<Tenant | null>();

  availablePlans = input<Plan[]>([]);
  selectedPlans = signal<Plan[]>([]);
  initPlans = input<Plan[]>([]);

  tenantService = inject(TenantService);
  planService = inject(PlanService);

  isTenantModalOpen = signal(false);
  isPlanModalOpen = signal(false);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
      this.selectedTenant.set(this.initTenant() || null);
      this.selectedPlans.set(this.initPlans() || []);
    });
  }

  get name() {
    return this.formGroup().get('name')
  }

  get description() {
    return this.formGroup().get('description')
  }

  get plans() {
    return this.formGroup().get('plans')
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
    this.isPlanModalOpen.set(true);
  }

  isPlanSelected(planId: number): boolean {
    return this.selectedPlans().some(u => u.id === planId);
  }

  togglePlan(plan: Plan) {
    const current = this.selectedPlans();
    if (current.some(u => u.id === plan.id)) {
      this.selectedPlans.set(current.filter(u => u.id !== plan.id));
    } else {
      this.selectedPlans.set([...current, plan]);
    }
    this.plans?.setValue(this.selectedPlans().map(u => u.id));
  }

  removeSelectedPlan(planId: number) {
    this.selectedPlans.set(this.selectedPlans().filter(u => u.id !== planId));
    this.plans?.setValue(this.selectedPlans().map(u => u.id));
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

  getPlanDescription(plan: Plan): string {
    return `
    ${plan.id}
    Status: ${plan.status}
    Tenant: ${plan.tenant?.name}
  `;
  }
}
