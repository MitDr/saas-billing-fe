import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {Tenant} from '../../../../../core/interface/entity/tenant';
import {Price} from '../../../../../core/interface/entity/price';
import {PlanGroup} from '../../../../../core/interface/entity/plan-group';
import {Feature} from '../../../../../core/interface/entity/feature';
import {PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {TenantService} from '../../../../../core/service/tenant-service';
import {PriceService} from '../../../../../core/service/price-service';
import {PlanGroupService} from '../../../../../core/service/plan-group-service';
import {FeatureService} from '../../../../../core/service/feature-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {Plan} from '../../../../../core/interface/entity/plan';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {PlanService} from '../../../../../core/service/plan-service';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {FeatureReuseForm} from '../../../../../shell/components/form/admin/feature-reuse-form/feature-reuse-form';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';
import {PlanRequest} from '../../../../../core/interface/request/plan-request';

@Component({
  selector: 'app-plan-edit',
  imports: [
    NzModalModule,
    Breadcrumb,
    FeatureReuseForm,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    RouterLink,
    PlanReuseForm
  ],
  templateUrl: './plan-edit.html',
  styleUrl: './plan-edit.css',
})
export class PlanEdit implements OnInit {
  availableTenant = signal<Tenant[]>([]);
  availablePrices = signal<Price[]>([]);
  availablePlanGroup = signal<PlanGroup[]>([]);
  availableFeature = signal<Feature[]>([])
  routing = PLAN_ROUTE_CONSTANT;
  tenantService = inject(TenantService);
  planService = inject(PlanService);
  priceService = inject(PriceService);
  planGroupService = inject(PlanGroupService);
  featureService = inject(FeatureService);
  message = inject(NzMessageService);

  initPlanGroup = signal<PlanGroup | null>(null);
  initTenant = signal<Tenant | null>(null);
  initFeature = signal<Feature[]>([]);
  initPrice = signal<Price[]>([]);

  plan = signal<Plan | null>(null);
  loading = signal(false);
  isSubmitting = false;
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(NonNullableFormBuilder);
  planForm = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DEACTIVATED|CANCEL')]],
    tenantId: [null as number | null, [Validators.required]],
    planGroupId: [null as number | null],
    prices: [[] as number[]],
    features: [[] as number[]]
  })

  constructor() {
    // Load user khi có id từ route
    effect(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadPlan(+id);
      }
    });
    effect(() => {
      const currentPlan = this.plan();
      if (currentPlan) {
        this.planForm.patchValue({
          name: currentPlan.name,
          image: currentPlan.image,
          status: currentPlan.status,
          tenantId: currentPlan.tenant.id,
          planGroupId: currentPlan.planGroup?.id || null,
          features: currentPlan.features?.map(u => u.id) || [],
          prices: currentPlan.prices?.map(u => u.id) || [],
        });

        this.getTenant(currentPlan?.tenant.id!);
        if (currentPlan.planGroup) {
          this.getPlanGroup(currentPlan?.planGroup?.id);
        }
        this.getFeature(currentPlan?.features.map(u => u.id))
        this.getPrice(currentPlan?.prices.map(u => u.id))
      }
    });
  }

  loadPlan(id: number) {
    this.loading.set(true);
    this.planService.getPlan(id).subscribe({
      next: (response) => {
        this.plan.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
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

  getPlanGroup(id: number) {
    return this.planGroupService.getPlanGroup(id).subscribe({
      next: (response) => {
        this.initPlanGroup.set(response);
      }
    });
  }

  getFeature(ids: number[]): void {
    this.featureService.getAllFeatures().subscribe({
      next: (features) => {
        const idSet = new Set(ids);
        const filterFeature = features.content.filter(feat => idSet.has(feat.id));
        this.initFeature.set(filterFeature);
      }
    });
  }

  getPrice(ids: number[]): void {
    this.priceService.getAllPrices().subscribe({
      next: (prices) => {
        const idSet = new Set(ids);
        const filterPrice = prices.content.filter(pr => idSet.has(pr.id));
        this.initPrice.set(filterPrice);
      }
    });
  }

  ngOnInit(): void {
    this.loadAllTenant();
    this.loadAllPlanGroup();
    this.loadAllPrice();
    this.loadAllFeature();
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

      this.planService.update(payload, this.plan()?.id!).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Update plan thành công');
          this.planForm.reset();
          this.router.navigate(['/admin/tables/plans']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Update plan failed:', err);
          this.message.error('Update plan thất bại');
        }
      })
    }
  }
}
