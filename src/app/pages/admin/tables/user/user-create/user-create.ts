import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {USER_CREATE_ROUTE_CONSTANT} from "../../../../../core/constant/user/user-create-constant";
import {UserReuseForm} from '../../../../../shell/components/form/admin/user-reuse-form/user-reuse-form';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {UserService} from '../../../../../core/service/user.service';
import {UserRequest} from '../../../../../core/interface/request/user-request';
import {Router} from '@angular/router';

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
  userService = inject(UserService);
  route = USER_CREATE_ROUTE_CONSTANT;
  isSubmitting = false;
  router = inject(Router);
  private fb = inject(NonNullableFormBuilder);
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
      const formValue = this.userForm.getRawValue();

      const request: UserRequest = {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role as 'ADMIN' | 'USER',
      };
      this.userService.addUser(request).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/admin/tables/users']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
