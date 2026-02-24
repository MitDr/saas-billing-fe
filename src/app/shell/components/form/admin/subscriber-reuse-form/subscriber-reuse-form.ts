import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-subscriber-reuse-form',
  imports: [
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
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './subscriber-reuse-form.html',
  styleUrl: './subscriber-reuse-form.css',
})
export class SubscriberReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Feature');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();

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

  get name(){
    return this.formGroup()?.get('name')
  }
  get email(){
    return this.formGroup()?.get('email')
  }
  get customerId(){
    return this.formGroup()?.get('customerId')
  }
  get tenantId(){
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
