import {Component, effect, inject, signal} from '@angular/core';
import {UserService} from '../../../../../core/service/user.service';
import {USER_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-create-constant';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {UserReuseForm} from '../../../../../shell/components/form/admin/user-reuse-form/user-reuse-form';
import {User} from '../../../../../core/interface/entity/user';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {UserCard} from '../../../../../shell/components/card/user/user-card/user-card';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {UserRequest} from '../../../../../core/interface/request/user-request';

@Component({
  selector: 'app-user-edit',
  imports: [
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    UserCard,
    Breadcrumb,
    UserReuseForm
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit {
  userService = inject(UserService);
  user = signal<User | null>(null);
  routing = USER_CREATE_ROUTE_CONSTANT;
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    checkPassword: ['', [Validators.required, UserReuseForm.confirmationValidator]],
    role: ['', [Validators.required, Validators.pattern('ADMIN|USER')]],
  });

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadUser(+id);
      }
    });

    // Theo dõi user thay đổi để patch form (tự động khi data load xong)
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.userForm.patchValue({
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
        });

        // Xóa validator cho password ở edit mode
        this.userForm.get('password')?.clearValidators();
        this.userForm.get('checkPassword')?.clearValidators();
        this.userForm.updateValueAndValidity();
      }
    });
  }

  loadUser(id: number) {
    this.loading.set(true);
    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onSubmitted() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      console.log('Submit create user:', this.userForm.getRawValue());
      const formValue = this.userForm.getRawValue();

      const request: UserRequest = {
        username: formValue.username,
        email: formValue.email,
        // password: formValue.password,
        role: formValue.role as 'ADMIN' | 'USER',
      };
      if (formValue.password) {
        request.password = formValue.password;
      }
      this.userService.update(request, this.user()?.id!).subscribe({
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
