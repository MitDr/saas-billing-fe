import {Component, effect, inject, OnInit, signal, ViewChild} from '@angular/core';
import {AuthPrice} from '../../../../../core/interface/entity/auth/auth-price';
import {AuthPlanGroup} from '../../../../../core/interface/entity/auth/auth-plan-group';
import {AuthFeature} from '../../../../../core/interface/entity/auth/auth-feature';
import {AuthPlanReuseForm} from '../../../../../shell/components/form/auth/auth-plan-reuse-form/auth-plan-reuse-form';
import {AUTH_PLAN_ROUTE_CONSTANT} from '../../../../../core/constant/plan/plan-list-constant';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthPriceService} from '../../../../../core/service/auth/auth-price-service';
import {AuthPlanGroupService} from '../../../../../core/service/auth/auth-plan-group-service';
import {AuthFeatureService} from '../../../../../core/service/auth/auth-feature-service';
import {AuthPlanService} from '../../../../../core/service/auth/auth-plan-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {AuthPlan} from '../../../../../core/interface/entity/auth/auth-plan';
import {Breadcrumb} from '../../../../../shell/components/generic/breadcrumb/breadcrumb';
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {NzPageHeaderComponent} from 'ng-zorro-antd/page-header';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {PlanReuseForm} from '../../../../../shell/components/form/admin/plan-reuse-form/plan-reuse-form';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {AuthPlanRequest} from '../../../../../core/interface/request/auth/auth-plan-request';

@Component({
  selector: 'app-auth-plan-edit',
  imports: [
    Breadcrumb,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzPageHeaderComponent,
    NzSpinComponent,
    PlanReuseForm,
    RouterLink,
    AuthPlanReuseForm,
    NzModalModule,
  ],
  templateUrl: './auth-plan-edit.html',
  styleUrl: './auth-plan-edit.css',
})
export class AuthPlanEdit implements OnInit {
  availablePrices = signal<AuthPrice[]>([]);
  availablePlanGroup = signal<AuthPlanGroup[]>([]);
  availableFeature = signal<AuthFeature[]>([])
  @ViewChild(AuthPlanReuseForm) planFormComponent!: AuthPlanReuseForm;
  routing = AUTH_PLAN_ROUTE_CONSTANT;
  router = inject(Router);
  isSubmitting = false;
  priceService = inject(AuthPriceService);
  planGroupService = inject(AuthPlanGroupService);
  featureService = inject(AuthFeatureService);
  planService = inject(AuthPlanService)
  message = inject(NzMessageService);
  initPlanGroup = signal<AuthPlanGroup | null>(null);
  initFeature = signal<AuthFeature[]>([]);
  initPrice = signal<AuthPrice[]>([]);
  plan = signal<AuthPlan | null>(null);
  loading = signal(false);
  initialImageUrl = signal<string | null>(null);
  private fb = inject(NonNullableFormBuilder)
  planForm = this.fb.group({
    name: ['', [Validators.required]],
    status: ['', [Validators.required, Validators.pattern('ACTIVE|DEACTIVATED|CANCEL')]],
    planGroupId: [null as number | null],
    prices: [[] as number[]],
    features: [[] as number[]]
  })
  private route = inject(ActivatedRoute);

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
          status: currentPlan.status,
          planGroupId: currentPlan.planGroup?.id || null,
          features: currentPlan.features?.map(u => u.id) || [],
          prices: currentPlan.prices?.map(u => u.id) || [],
        });

        if (currentPlan.planGroup) {
          this.getPlanGroup(currentPlan?.planGroup?.id);
        }
        this.getFeature(currentPlan?.features.map(u => u.id))
        this.getPrice(currentPlan?.prices.map(u => u.id))
      }
    });
  }

  ngOnInit(): void {
    this.loadAllPlanGroup();
    this.loadAllPrice();
    this.loadAllFeature();
  }

  loadPlan(id: number) {
    this.loading.set(true);
    this.planService.getPlan(id).subscribe({
      next: (response) => {
        this.plan.set(response);
        this.initialImageUrl.set(response.image);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
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

  loadAllPlanGroup() {
    this.planGroupService.getAllPlanGroups().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const planGroups = response.content || []; // ListData<User> có content[]
        this.availablePlanGroup.set(planGroups);
      },
      error: (err) => {
        console.error('Load plan groups failed:', err);
        this.message.error('Cannot load plan groups');
      }
    });
  }

  loadAllFeature() {
    this.featureService.getAllFeatures().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const features = response.content || []; // ListData<User> có content[]
        this.availableFeature.set(features);
      },
      error: (err) => {
        console.error('Load features failed:', err);
        this.message.error('Cannot load features');
      }
    });
  }

  loadAllPrice() {
    this.priceService.getAllPrices().subscribe({  // size=1000 để an toàn lấy hết
      next: (response) => {
        const prices = response.content || []; // ListData<User> có content[]
        this.availablePrices.set(prices);
      },
      error: (err) => {
        console.error('Load prices failed:', err);
        this.message.error('Cannot load price');
      }
    });
  }

  onSubmitted() {
    console.log(this.planForm.value)
    if (this.planForm.valid) {
      this.isSubmitting = true;
      const payload: AuthPlanRequest = {
        name: this.planForm.value.name!,
        status: this.planForm.value.status! as 'ACTIVE' | 'DEACTIVATED' | 'CANCEL',
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

      const imageFile = this.planFormComponent.imageFile;  // ← lấy từ getter
      this.planService.updatePlan(this.plan()!.id, payload, imageFile).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.message.success('Create plan successfully');
          this.planForm.reset();
          this.planFormComponent.imageFileList.set([]);  // reset file list
          this.planFormComponent.imagePreview.set(null);
          this.router.navigate(['/app/tables/plans']);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Create plan failed:', err);
          this.message.error('Create plan failed');
        }
      });
    }
  }
}
