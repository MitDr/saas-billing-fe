import {Component, inject, input, output} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthTenantService} from '../../../../../core/service/auth/auth-tenant-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-auth-tenant-reuse-form',
  imports: [
    FormsModule,
    NzFormDirective,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    NzButtonComponent
  ],
  templateUrl: './auth-tenant-reuse-form.html',
  styleUrl: './auth-tenant-reuse-form.css',
})
export class AuthTenantReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Tenant');
  isLoading = input<boolean>(false);
  submitted = output<void>();
  tenantService = inject(AuthTenantService);
  private message = inject(NzMessageService);

  get name() {
    return this.formGroup()?.get('name');
  }

  get email() {
    return this.formGroup()?.get('email');
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
      this.message.warning('Please double-check the information!');
    }
  }
}
