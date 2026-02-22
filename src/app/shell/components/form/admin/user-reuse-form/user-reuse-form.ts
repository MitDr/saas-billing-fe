import {Component, inject, input, output} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {AbstractControl, FormGroup, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzTagComponent} from 'ng-zorro-antd/tag';
import {JsonPipe} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';
import {User} from '../../../../../core/interface/entity/user';

@Component({
  selector: 'app-user-reuse-form',
  imports: [
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzInputDirective,
    NzColDirective,
    NzOptionComponent,
    NzRowDirective,
    NzButtonComponent,
    NzFormDirective,
    NzModalModule,
    NzTagComponent,
    JsonPipe
  ],
  templateUrl: './user-reuse-form.html',
  styleUrl: './user-reuse-form.css',
})
export class UserReuseForm {
  // @Input() formGroup!: FormGroup;
  formGroup = input.required<FormGroup>();
  submitLabel = input<string>('Create');
  isLoading = input<boolean>(false)
  submitted = output<any>();
  modalService = inject(NzModalService);
  user = input<User>();

  isEditMode = input<boolean>(false);
  initialData = input<any>(null);

  messageService = inject(NzMessageService);   // Optional

  options: OptionInterface[] = [
    {value: 'USER', label: 'User'},
    {value: 'ADMIN', label: 'Admin'},
  ];

  get id() {
    return this.formGroup()?.get('id');
  }

  // Trong class

  get username() {
    return this.formGroup()?.get('username');
  }

  get email() {
    return this.formGroup()?.get('email');
  }

  get password() {
    return this.formGroup()?.get('password');
  }

  get checkPassword() {
    return this.formGroup()?.get('checkPassword');
  }

  get role() {
    return this.formGroup()?.get('role');
  }

  static confirmationValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return {required: true};
    }
    const parent = control.parent;
    if (!parent) return null;
    return control.value !== parent.get('password')?.value ? {confirm: true, error: true} : null;
  };


  onSubmit(): void {
    const form = this.formGroup();
    if (!form) return;

    if (form.valid) {
      // Lấy giá trị form
      const payload: any = {
        username: form.value.username,
        email: form.value.email,
        role: form.value.role,
      };

      // Chỉ thêm password nếu có giá trị (edit mode có thể bỏ qua)
      if (form.value.password) {
        payload.password = form.value.password;
      }

      // Nếu edit, thêm id (nếu có)
      if (this.isEditMode() && form.value.id) {
        payload.id = form.value.id;
      }

      this.submitted.emit(payload);
    } else {
      // Mark all as touched để show error
      Object.values(form.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      });
    }
  }
}


