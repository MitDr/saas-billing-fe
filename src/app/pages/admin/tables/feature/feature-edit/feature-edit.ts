import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Feature} from '../../../../../core/interface/entity/feature';
import {FEATURE_ROUTE_CONSTANT} from '../../../../../core/constant/feature/feature-list-constant';
import {FeatureService} from '../../../../../core/service/feature-service';
import {TenantService} from '../../../../../core/service/tenant-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PlanService} from '../../../../../core/service/plan-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {Plan} from '../../../../../core/interface/entity/plan';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {
  EntitlementReuseForm
} from '../../../../../shell/components/form/admin/entitlement-reuse-form/entitlement-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FeatureRequest} from '../../../../../core/interface/request/feature-request';

@Component({
  selector: 'app-feature-edit',
  imports: [
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    FeatureReuseForm,
    NzModalModule
  ],
  templateUrl: './feature-edit.html',
  styleUrl: './feature-edit.css',
})
export class FeatureEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePlans = signal<Plan[]>([]);
  routing = FEATURE_ROUTE_CONSTANT;
  featureService = inject(FeatureService);
  tenantService = inject(TenantService);
  planService = inject(PlanService);
  message = inject(NzMessageService);
  initTenant = signal<Tenant | null>(null);
  initPlans = signal<Plan[]>([]);
  feature = signal<Feature | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  featureForm = this.fb.group({
    status: ['', [Validators.required, Validators.pattern('ACTIVE|INACTIVE')]],
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    description: [''],
    tenantId: [null as number | null, [Validators.required]],
    plans: [[] as number[], []],
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadFeature(+id);
      }
    });
    effect(() => {
      const currentFeature = this.feature();
      if (currentFeature) {
        this.featureForm.patchValue({
          status: currentFeature.status,
          name: currentFeature.name,
          code: currentFeature.code,
          description: currentFeature.description,
          tenantId: currentFeature.tenant?.id
        });
        if (currentFeature.plans?.length > 0) {
          this.featureForm.patchValue({
            plans: currentFeature.plans.map(u => u.id)
          })
        }
        this.getTenant(currentFeature?.tenant.id!);
        this.getPlans(currentFeature?.plans.map(u => u.id))
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllPlans();
  }

  loadFeature(id: number) {
    this.loading.set(true);
    this.featureService.getFeature(id).subscribe({
      next: (response) => {
        this.feature.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
      }
    });
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

  getTenant(id: number) {
    return this.tenantService.getTenant(id).subscribe({
      next: (response) => {
        this.initTenant.set(response);
      }
    });
  }

  getPlans(ids: number[]): void {
    this.planService.getAllPlans().subscribe({
      next: (plans) => {
        const idSet = new Set(ids);
        const filteredPlans = plans.content.filter(plan => idSet.has(plan.id));
        this.initPlans.set(filteredPlans);
      }
    });
  }

  onSubmitted() {
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
      this.featureService.update(payload, this.feature()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update feature thành công');
          this.featureForm.reset();
          this.router.navigate(['/admin/tables/features']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update feature failed:', err);
          this.message.error('update feature thất bại');
        }
      })
    }
  }
}
