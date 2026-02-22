import {Component, inject, OnInit, signal} from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {TENANT_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-create-constant';
import {TenantReuseForm} from '../../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {UserService} from '../../../../../core/service/user.service';
import {User} from '../../../../../core/interface/entity/user';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TenantRequest} from '../../../../../core/interface/request/tenant-request';
import {TenantService} from '../../../../../core/service/tenant-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tenant-create',
  imports: [
    Breadcrumb,
    TenantReuseForm,
    NzModalModule
  ],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.css',
})
export class TenantCreate implements OnInit {
  availableUsers = signal<User[]>([]);
  route = TENANT_CREATE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  userService = inject(UserService);
  tenantService = inject(TenantService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder);
  tenantForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    creatorId: [null, Validators.required],       // bắt buộc chọn creator
    users: [[]],                                  // mảng ID, mặc định rỗng
    currentAmount: [0, Validators.min(0)],
    pendingAmount: [0, Validators.min(0)],
  });

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.userService.getAllUsers().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const users = response.content || []; // ListData<User> có content[]
        this.availableUsers.set(users);
        console.log('Loaded users for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load users failed:', err);
        this.message.error('Không tải được danh sách user');
      }
    });
  }

  onSubmitted() {
    if (this.tenantForm.valid) {
      this.isSubmitting = true;
      const payload: TenantRequest = {
        name: this.tenantForm.value.name!,
        email: this.tenantForm.value.email!,
        creatorId: this.tenantForm.value.creatorId!,
        currentAmount: this.tenantForm.value.currentAmount!,
        pendingAmount: this.tenantForm.value.pendingAmount!,
      };

      const users = this.tenantForm.value.users! as number[];
      if (users?.length) {
        Object.assign(payload, {users});
      }


      console.log(payload)
      this.tenantService.createTenant(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo tenant thành công');
          this.tenantForm.reset();
          this.router.navigate(['/admin/tables/tenants']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create tenant failed:', err);
          this.message.error('Tạo tenant thất bại');
        }
      })
    }
  }

}
