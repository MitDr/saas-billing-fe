import {Component, effect, inject, signal} from '@angular/core';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router } from "@angular/router";
import {TenantReuseForm} from '../../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {UserReuseForm} from '../../../../../shell/components/form/admin/user-reuse-form/user-reuse-form';
import {USER_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-create-constant';
import {TENANT_ROUTE_CONSTANT} from '../../../../../core/constant/tenant/tenant-list-constant';

@Component({
  selector: 'app-tenant-edit',
  imports: [
    TenantReuseForm,
    NzButtonComponent,
    Breadcrumb,
    UserReuseForm
  ],
  templateUrl: './tenant-edit.html',
  styleUrl: './tenant-edit.css',
})
export class TenantEdit {
  private fb = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isSubmitting = signal(false);

  tenantForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    creatorId: [0, Validators.required],           // number, default 0
    users: [[] as number[]],                       // mảng number[]
    currentAmount: [0, Validators.min(0)],
    pendingAmount: [0, Validators.min(0)],
    apiKey: [{ value: '', disabled: true }],       // readonly
  });

  constructor() {
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadTenant(+id);   // truyền number vào hàm
      }
    });
  }

  loadTenant(id: number) {
    // Giả lập API call (thay bằng service thật)
    // this.tenantService.getById(id).subscribe(tenant => {
    const tenant: Tenant = {  // demo data
      id: id,
      name: "Long3's tenant",
      email: "ttlong13013@gmail.com",
      apiKey: "sk_kNSGegEeecXFE9Isa_ICBG2NRKFwicRLX9e5P4pQnK8",
      currentAmount: 6771,
      pendingAmount: 68246,
      stripeAccountId: "acct_1SFboHCAm3bQ8cZJ",
      createdDate: "07-10-2025 21:24:12",
      modifiedDate: "08-01-2026 20:52:07",
      creator: {
        id: 4,
        username: "Lonnng3",
        email: "ttlong13013@gmail.com",
        role: "USER",
        createdDate: "07-10-2025 21:16:43",
        modifiedDate: "07-10-2025 21:24:15"
      },
      users: [
        { id: 4, username: "Lonnng3", email: "ttlong13013@gmail.com", role: "USER", createdDate: '07-10-2025 21:16:43', modifiedDate: '07-10-2025 21:24:15'},
        { id: 5, username: "Lonnng4", email: "ttlong13014@gmail.com", role: "USER", createdDate: '07-10-2025 21:16:43', modifiedDate: '07-10-2025 21:24:15'}
      ],
      softDelete: false
    };

    // Patch value với dữ liệu đúng type
    this.tenantForm.patchValue({
      name: tenant.name,
      email: tenant.email,
      creatorId: tenant.creator.id,                // number
      users: tenant.users.map(u => u.id),          // map User[] → number[] (chỉ ID)
      currentAmount: tenant.currentAmount,
      pendingAmount: tenant.pendingAmount,
      apiKey: tenant.apiKey || '',
    });
    // });
  }

  onSubmitted() {
    if (this.tenantForm.valid) {
      this.isSubmitting.set(true);
      const payload = this.tenantForm.getRawValue();

      console.log('Update tenant payload:', payload);

      // Gọi API update
      // this.tenantService.update(this.route.snapshot.paramMap.get('id'), payload).subscribe({
      //   next: () => {
      //     this.isSubmitting.set(false);
      //     this.router.navigate(['/tenants']);
      //   },
      //   error: () => this.isSubmitting.set(false)
      // });

      // Demo
      setTimeout(() => {
        this.isSubmitting.set(false);
        alert('Tenant updated successfully!');
      }, 1500);
    }
  }

  // Hàm copy & refresh (copy từ create nếu cần)
  copyApiKey(key: string) {

  }
  refreshApiKey() { /* ... */ }

  protected readonly TENANT_ROUTE_CONSTANT = TENANT_ROUTE_CONSTANT;
}
