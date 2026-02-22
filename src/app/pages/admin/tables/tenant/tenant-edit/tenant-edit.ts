import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {TenantReuseForm} from '../../../../../shell/components/form/admin/tenant-reuse-form/tenant-reuse-form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {UserReuseForm} from '../../../../../shell/components/form/admin/user-reuse-form/user-reuse-form';
import {UserService} from '../../../../../core/service/user.service';
import {USER_CREATE_ROUTE_CONSTANT} from '../../../../../core/constant/user/user-create-constant';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {User} from '../../../../../core/interface/entity/user';
import {TenantRequest} from '../../../../../core/interface/request/tenant-request';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tenant-edit',
  imports: [
    TenantReuseForm,
    NzButtonComponent,
    Breadcrumb,
    UserReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink
  ],
  templateUrl: './tenant-edit.html',
  styleUrl: './tenant-edit.css',
})
export class TenantEdit implements OnInit {
  availableUsers = signal<User[]>([]);
  userService = inject(UserService);
  message = inject(NzMessageService);
  tenant = signal<Tenant | null>(null);
  routing = USER_CREATE_ROUTE_CONSTANT;
  loading = signal(false);
  isSubmitting = false;
  tenantService = inject(TenantService);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  tenantForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    creatorId: [null as number | null, Validators.required],       // bắt buộc chọn creator
    users: [[] as number[], []],                                  // mảng ID, mặc định rỗng
    currentAmount: [0, Validators.min(0)],
    pendingAmount: [0, Validators.min(0)],
  });

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadTenant(+id);
      }
    });

    // Theo dõi user thay đổi để patch form (tự động khi data load xong)
    effect(() => {
      const currentTenant = this.tenant();
      if (currentTenant) {
        this.tenantForm.patchValue({
          name: currentTenant.name,
          email: currentTenant.email,
          creatorId: currentTenant.creator?.id || null,           // chỉ lấy id của creator
          users: currentTenant.users?.map(u => u.id) || [],
          currentAmount: currentTenant.currentAmount,
          pendingAmount: currentTenant.pendingAmount
        });
      }
    });
  }

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
        // this.message.error('Không tải được danh sách user');
      }
    });
  }

  loadTenant(id: number) {
    this.loading.set(true);
    this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.tenant.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
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


      // console.log(payload)
      this.tenantService.updateTenant(payload, this.tenant()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update tenant thành công');
          this.tenantForm.reset();
          this.loadTenant(this.tenant()?.id!);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create tenant failed:', err);
          // this.message.error('Tạo tenant thất bại');
        }
      })
    }
  }

  onRefreshAPI() {
    this.tenantService.refreshAPIKey(this.tenant()?.id!).subscribe({
      next: (response) => {
        this.loadTenant(this.tenant()?.id!);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
