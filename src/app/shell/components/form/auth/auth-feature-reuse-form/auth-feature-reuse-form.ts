import {Component, effect, inject, input, output, signal} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzTagComponent} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-auth-feature-reuse-form',
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
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzTagComponent,
    ReactiveFormsModule
  ],
  templateUrl: './auth-feature-reuse-form.html',
  styleUrl: './auth-feature-reuse-form.css',
})
export class AuthFeatureReuseForm {
  options: OptionInterface[] = [
    {value: 'ACTIVE', label: 'Active'},
    {value: 'INACTIVE', label: 'Inactive'},
  ];

  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Feature');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();

  availablePlans = input<AuthPlan[]>([]);
  selectedPlans = signal<AuthPlan[]>([]);
  initPlan = input<AuthPlan[] | null>();

  isPlansModalOpen = signal(false);
  private message = inject(NzMessageService);


  constructor() {
    effect(() => {
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

  openPlansModal() {
    this.isPlansModalOpen.set(true);
  }

  isPlansSelected(planId: number): boolean {
    return this.selectedPlans().some(u => u.id === planId);
  }

  togglePlan(plan: AuthPlan) {
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
