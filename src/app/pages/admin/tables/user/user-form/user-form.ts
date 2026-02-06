import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import {
  AbstractControl, FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Subject, takeUntil} from 'rxjs';
import {OptionInterface} from '../../../../../core/interface/option-interface';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {USER_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-create-constant';

@Component({
  selector: 'app-user-form',
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    ReactiveFormsModule,
    NzColDirective,
    NzInputDirective,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzRowDirective,
    NzButtonComponent,
    FormsModule,
    Breadcrumb,
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit, OnDestroy {
  private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();

  route = USER_CREATE_ROUTE_CONSTANT;

  options: OptionInterface[] = [
    {
      value: 'USER',
      label: 'User'
    },
    {
      value: 'ADMIN',
      label: 'Admin'
    }
  ];

  validateForm = this.fb.group({
    username: this.fb.control('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    email: this.fb.control('', [Validators.email, Validators.required]),
    password: this.fb.control('', [Validators.required]),
    checkPassword: this.fb.control('', [Validators.required, this.confirmationValidator]),
    role: this.fb.control('', [Validators.required, Validators.pattern('ADMIN|USER')])
  });

  ngOnInit(): void {
    this.validateForm.controls.password.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.validateForm.controls.checkPassword.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== control.parent!.value.password) {
      return { confirm: true, error: true };
    }
    return {};
  }
}
