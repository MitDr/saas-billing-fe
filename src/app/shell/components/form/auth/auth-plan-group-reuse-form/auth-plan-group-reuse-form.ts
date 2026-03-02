import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PlanService} from '../../../../../core/service/plan-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';

@Component({
  selector: 'app-auth-plan-group-reuse-form',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzCheckboxComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    NzInputDirective,
    NzModalComponent,
    NzModalContentDirective,
    NzRowDirective,
    NzTagComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth-plan-group-reuse-form.html',
  styleUrl: './auth-plan-group-reuse-form.css',
})
export class AuthPlanGroupReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Plan Group');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();

  availablePlans = input<AuthPlan[]>([]);
  selectedPlans = signal<AuthPlan[]>([]);
  initPlans = input<AuthPlan[]>([]);

  planService = inject(PlanService);

  isPlanModalOpen = signal(false);
  private message = inject(NzMessageService);

  constructor() {
    effect(() => {
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

  openPlanModal() {
    this.isPlanModalOpen.set(true);
  }

  isPlanSelected(planId: number): boolean {
    return this.selectedPlans().some(u => u.id === planId);
  }

  togglePlan(plan: AuthPlan) {
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

  getPlanDescription(plan: AuthPlan): string {
    return `
    ${plan.id}
    Status: ${plan.status}
  `;
  }
}
