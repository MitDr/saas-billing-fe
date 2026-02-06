import {Component, inject} from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {UserReuseForm} from '../../../../../shell/components/form/admin/user-reuse-form/user-reuse-form';
import {USER_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-create-constant';
import {TENANT_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-create-constant';
import {TenantReuseForm} from '../../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';

@Component({
  selector: 'app-tenant-create',
  imports: [
    Breadcrumb,
    TenantReuseForm,
  ],
  templateUrl: './tenant-create.html',
  styleUrl: './tenant-create.css',
})
export class TenantCreate {
  private fb = inject(NonNullableFormBuilder);

  route = TENANT_CREATE_ROUTE_CONSTANT;
  isSubmitting = false;

  tenantForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    creatorId: [null, Validators.required],       // bắt buộc chọn creator
    users: [[]],                                  // mảng ID, mặc định rỗng
    currentAmount: [0, Validators.min(0)],
    pendingAmount: [0, Validators.min(0)],
  });

  onSubmitted() {
    if (this.tenantForm.valid) {
      this.isSubmitting = true;
      const payload = {
        ...this.tenantForm.value,
        users: this.tenantForm.value.users || [],  // đảm bảo là mảng
      };
      console.log('Payload gửi API:', payload);

      // Gọi API
      // this.tenantService.createTenant(payload).subscribe(...);
    }
  }
}
