import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent, NzCardMetaComponent} from 'ng-zorro-antd/card';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-auth-subscriber-reuse-form',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzCardMetaComponent,
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
    ReactiveFormsModule
  ],
  templateUrl: './auth-subscriber-reuse-form.html',
  styleUrl: './auth-subscriber-reuse-form.css',
})
export class AuthSubscriberReuseForm {
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create Feature');
  isLoading = input<boolean>(false);
  isEditMode = input<boolean>(false);
  submitted = output<void>();
  private message = inject(NzMessageService);

  // constructor() {
  //   effect(() => {
  //     this.selectedTenant.set(this.initTenant() || null);
  //   });
  // }

  get name(){
    return this.formGroup()?.get('name')
  }
  get email(){
    return this.formGroup()?.get('email')
  }
  get customerId(){
    return this.formGroup()?.get('customerId')
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
