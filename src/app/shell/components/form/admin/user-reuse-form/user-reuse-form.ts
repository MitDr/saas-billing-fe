import {Component, input, output} from '@angular/core';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {AbstractControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors} from '@angular/forms';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';

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
  ],
  templateUrl: './user-reuse-form.html',
  styleUrl: './user-reuse-form.css',
})
export class UserReuseForm {
  // @Input() formGroup!: FormGroup;
  formGroup=input.required<FormGroup>();
  submitLabel=input<string>('Create');
  isLoading = input<boolean>(false)
  submitted = output<void>();

  options: OptionInterface[] = [
    { value: 'USER', label: 'User' },
    { value: 'ADMIN', label: 'Admin' },
  ];

  get username() { return this.formGroup()?.get('username'); }
  get email() { return this.formGroup()?.get('email'); }
  get password() { return this.formGroup()?.get('password'); }
  get checkPassword() { return this.formGroup()?.get('checkPassword'); }
  get role() { return this.formGroup()?.get('role'); }

  onSubmit(): void {
    if (this.formGroup()?.valid) {
      this.submitted.emit();
    } else {
      Object.values(this.formGroup()?.controls || {}).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  static confirmationValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    }
    const parent = control.parent;
    if (!parent) return null;
    return control.value !== parent.get('password')?.value ? { confirm: true, error: true } : null;
  };
}


