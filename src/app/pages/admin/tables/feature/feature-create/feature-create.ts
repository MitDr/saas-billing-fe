import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {PlanService} from '../../../../../core/service/plan-service';
import {FeatureService} from '../../../../../core/service/feature-service';
import {Plan} from '../../../../../core/interface/entity/plan';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FeatureRequest} from '../../../../../core/interface/request/feature-request';

@Component({
  selector: 'app-feature-create',
  imports: [
    Breadcrumb,
    EntitlementReuseForm,
    FeatureReuseForm,
    NzModalModule,
  ],
  templateUrl: './feature-create.html',
  styleUrl: './feature-create.css',
})
export class FeatureCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePlans = signal<Plan[]>([]);
  route = FEATURE_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  planService = inject(PlanService);
  featureService = inject(FeatureService);
  tenantService = inject(TenantService);
  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)
  featureForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|INACTIVE')]],
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    description: [''],
    tenantId: [null, [Validators.required]],
    plans: [[]],
  })

  ngOnInit(): void {
    this.loadAllPlans();
    this.loadAllTenant()
  }

  loadAllTenant() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  loadAllPlans() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.planService.getAllPlans().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const plans = response.content || []; // ListData<User> có content[]
        this.availablePlans.set(plans);
        // console.log('Loaded tenant for modal:', users.length, users);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  onSubmitted() {
    console.log(this.featureForm.value)

    if (this.featureForm.valid) {
      this.isSubmitting = true;
      const payload: FeatureRequest = {
        code: this.featureForm.value.code!,
        name: this.featureForm.value.name!,
        status: this.featureForm.value.status as 'ACTIVE' | 'INACTIVE',
        tenantId: this.featureForm.value.tenantId!
      }

      if (this.featureForm.value.description) {
        const description = this.featureForm.value.description as string;
        Object.assign(payload, {description})
      }
      const plans = this.featureForm.value.plans! as number[];
      if (plans?.length) {
        Object.assign(payload, {plans});
      }
      console.log(payload)
      this.featureService.createFeature(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo tenant thành công');
          this.featureForm.reset();
          this.router.navigate(['/admin/tables/features']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create feature failed:', err);
          this.message.error('Tạo feature thất bại');
        }
      })
    }
  }
}
