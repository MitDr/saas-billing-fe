import {Component, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Price} from '../../../../../core/interface/entity/price';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {Feature} from '../../../../../core/interface/entity/feature';
import {Router} from '@angular/router';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PriceService} from '../../../../../core/service/price-service';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {PlanRequest} from '../../../../../core/interface/request/plan-request';
import {PlanService} from '../../../../../core/service/plan-service';

@Component({
  selector: 'app-plan-create',
  imports: [
    NzModalModule,
    Breadcrumb,
    PlanReuseForm
  ],
  templateUrl: './plan-create.html',
  styleUrl: './plan-create.css',
})
export class PlanCreate implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePrices = signal<Price[]>([]);
  availablePlanGroup = signal<PlanGroup[]>([]);
  availableFeature = signal<Feature[]>([])
  route = PLAN_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  tenantService = inject(TenantService);
  priceService = inject(PriceService);
  planGroupService = inject(PlanGroupService);
  featureService = inject(FeatureService);
  planService = inject(PlanService)

  message = inject(NzMessageService);
  private fb = inject(NonNullableFormBuilder)

  planForm = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DEACTIVATED|CANCEL')]],
    tenantId: [null, [Validators.required]],
    planGroupId: [null],
    prices: [[]],
    features: [[]]
  })

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllPlanGroup();
    this.loadAllFeature();
    this.loadAllPrice();
  }

  loadAllTenant() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.tenantService.getAllTenants().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const tenants = response.content || []; // ListData<User> có content[]
        this.availableTenant.set(tenants);
      },
      error: (err) => {
        console.error('Load tenants failed:', err);
        this.message.error('Không tải được danh sách tenant');
      }
    });
  }

  loadAllPlanGroup() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.planGroupService.getAllPlanGroups().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const planGroups = response.content || []; // ListData<User> có content[]
        this.availablePlanGroup.set(planGroups);
      },
      error: (err) => {
        console.error('Load plan groups failed:', err);
        this.message.error('Không tải được danh sách plan groups');
      }
    });
  }

  loadAllFeature() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.featureService.getAllFeatures().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const features = response.content || []; // ListData<User> có content[]
        this.availableFeature.set(features);
      },
      error: (err) => {
        console.error('Load features failed:', err);
        this.message.error('Không tải được danh sách features');
      }
    });
  }

  loadAllPrice() {
    // Gọi API với size lớn để lấy hết (hoặc dùng all=true nếu backend hỗ trợ)
    this.priceService.getAllPrices().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const prices = response.content || []; // ListData<User> có content[]
        this.availablePrices.set(prices);
      },
      error: (err) => {
        console.error('Load prices failed:', err);
        this.message.error('Không tải được danh sách price');
      }
    });
  }

  onSubmitted() {
    console.log(this.planForm.value)
    if (this.planForm.valid) {
      this.isSubmitting = true;
      const payload: PlanRequest = {
        name: this.planForm.value.name!,
        image: this.planForm.value.image!,
        status: this.planForm.value.status! as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
        tenantId: this.planForm.value.tenantId!
      }

      const planGroupId = this.planForm.value.planGroupId! as number;
      if (planGroupId) {
        Object.assign(payload, {planGroupId});
      }
      const features = this.planForm.value.features! as number[];
      if (features?.length) {
        Object.assign(payload, {features});
      }
      const prices = this.planForm.value.prices! as number[];
      if (prices?.length) {
        Object.assign(payload, {prices});
      }

      console.log(payload)

      this.planService.createPlan(payload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Tạo plan thành công');
          this.planForm.reset();
          this.router.navigate(['/admin/tables/plans']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create plan failed:', err);
          this.message.error('Tạo plan thất bại');
        }
      })
    }
  }
}
