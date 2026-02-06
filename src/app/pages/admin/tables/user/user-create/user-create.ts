import { Component, inject } from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import { USER_CREATE_ROUTE_CONSTANT } from "../../../../../core/constant/user/user-create-constant";
import {UserReuseForm} from '../../../../../shell/components/form/admin/user-reuse-form/user-reuse-form';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';

@Component({
  selector: 'app-user-create',
  imports: [
    Breadcrumb,
    UserReuseForm
  ],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private fb = inject(NonNullableFormBuilder);

  route = USER_CREATE_ROUTE_CONSTANT;
  isSubmitting = false;

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    checkPassword: ['', [Validators.required, UserReuseForm.confirmationValidator]],
    role: ['', [Validators.required, Validators.pattern('ADMIN|USER')]],
  });

  onSubmitted() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      console.log('Submit create user:', this.userForm.getRawValue());
      // Gọi API create user ở đây
      // Ví dụ: this.userService.create(this.userForm.value).subscribe(...);
      // Sau thành công: reset form hoặc navigate
      setTimeout(() => { this.isSubmitting = false; }, 2000); // demo loading
    }
  }
}
